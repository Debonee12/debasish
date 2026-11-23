"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  eventCategoryLabels,
  formatEventDate,
  isUpcomingEvent,
  type CivicEvent,
  type EventCategory,
  type EventImage,
} from "@/lib/events-types";

type Props = {
  initialAuthenticated: boolean;
  usingDefaultPassword: boolean;
};

type FormState = {
  id: string | null;
  title: string;
  description: string;
  date: string;
  endDate: string;
  location: string;
  category: EventCategory;
  status: "published" | "draft";
  images: EventImage[];
};

const emptyForm = (): FormState => ({
  id: null,
  title: "",
  description: "",
  date: new Date().toISOString().slice(0, 10),
  endDate: "",
  location: "Ward 4, Baranagar Municipality",
  category: "community-camp",
  status: "published",
  images: [],
});

/**
 * Automatically optimizes an image in the browser before upload:
 * - Resizes to max 1600px on longest side
 * - Encodes to WebP (quality 0.82) for fast LCP & low bandwidth
 */
async function optimizeImageFile(file: File): Promise<{
  file: File;
  width: number;
  height: number;
  originalBytes: number;
  optimizedBytes: number;
}> {
  const originalBytes = file.size;
  const bitmap = await createImageBitmap(file);
  const maxDim = 1600;
  let width = bitmap.width;
  let height = bitmap.height;

  if (width > maxDim || height > maxDim) {
    if (width >= height) {
      height = Math.round((height * maxDim) / width);
      width = maxDim;
    } else {
      width = Math.round((width * maxDim) / height);
      height = maxDim;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return { file, width, height, originalBytes, optimizedBytes: originalBytes };
  }

  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/webp", 0.82)
  );

  if (!blob) {
    return { file, width, height, originalBytes, optimizedBytes: originalBytes };
  }

  const baseName = file.name.replace(/\.[^.]+$/, "") || "event-photo";
  const optimizedFile = new File([blob], `${baseName}.webp`, { type: "image/webp" });

  return {
    file: optimizedFile,
    width,
    height,
    originalBytes,
    optimizedBytes: optimizedFile.size,
  };
}

function formatBytes(bytes?: number): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function AdminEventsClient({
  initialAuthenticated,
  usingDefaultPassword,
}: Props) {
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [tab, setTab] = useState<"editor" | "list" | "social">("editor");
  const [events, setEvents] = useState<CivicEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);

  const [form, setForm] = useState<FormState>(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [savingSocial, setSavingSocial] = useState(false);

  const replaceInputRef = useRef<HTMLInputElement>(null);
  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);

  const loadDashboardData = useCallback(async (showSpinner = true) => {
    if (showSpinner) setLoadingEvents(true);
    try {
      const [evRes, setRes] = await Promise.all([
        fetch("/api/admin/events"),
        fetch("/api/admin/settings"),
      ]);
      if (evRes.status === 401) {
        setAuthenticated(false);
        return;
      }
      if (evRes.ok) {
        const data = (await evRes.json()) as { events: CivicEvent[] };
        setEvents(data.events);
      }
      if (setRes.ok) {
        const sData = (await setRes.json()) as {
          settings: { facebookUrl: string; instagramUrl: string };
        };
        setFacebookUrl(sData.settings.facebookUrl || "");
        setInstagramUrl(sData.settings.instagramUrl || "");
      }
    } finally {
      setLoadingEvents(false);
    }
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    let active = true;
    Promise.all([fetch("/api/admin/events"), fetch("/api/admin/settings")])
      .then(async ([evRes, setRes]) => {
        if (!active) return;
        if (evRes.status === 401) {
          setAuthenticated(false);
          return;
        }
        if (evRes.ok) {
          const data = (await evRes.json()) as { events: CivicEvent[] };
          if (active) setEvents(data.events);
        }
        if (setRes.ok) {
          const sData = (await setRes.json()) as {
            settings: { facebookUrl: string; instagramUrl: string };
          };
          if (active) {
            setFacebookUrl(sData.settings.facebookUrl || "");
            setInstagramUrl(sData.settings.instagramUrl || "");
          }
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [authenticated]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const err = (await res.json()) as { error?: string };
        setAuthError(err.error || "Invalid password.");
        return;
      }
      setPassword("");
      setAuthenticated(true);
    } catch {
      setAuthError("Network error while signing in.");
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
  }

  async function handleUploadFiles(fileList: FileList | null, targetReplaceIdx: number | null = null) {
    if (!fileList || fileList.length === 0) return;
    setUploading(true);
    setStatusMsg(null);

    try {
      const files = Array.from(fileList);
      const optimizedList = await Promise.all(files.map(optimizeImageFile));

      const body = new FormData();
      for (const item of optimizedList) {
        body.append("files", item.file);
      }

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });

      if (!res.ok) {
        const err = (await res.json()) as { error?: string };
        throw new Error(err.error || "Image upload failed.");
      }

      const data = (await res.json()) as {
        files: Array<{ url: string; sizeBytes: number; originalName: string }>;
      };

      const newImages: EventImage[] = data.files.map((uploaded, idx) => ({
        id: crypto.randomUUID(),
        url: uploaded.url,
        alt: form.title
          ? `${form.title} — photograph ${form.images.length + idx + 1}`
          : uploaded.originalName.replace(/\.[^.]+$/, ""),
        caption: "",
        width: optimizedList[idx]?.width,
        height: optimizedList[idx]?.height,
        sizeBytes: uploaded.sizeBytes,
        order: form.images.length + idx,
      }));

      setForm((prev) => {
        if (targetReplaceIdx !== null && newImages[0]) {
          const updated = [...prev.images];
          const existing = updated[targetReplaceIdx];
          updated[targetReplaceIdx] = {
            ...newImages[0],
            alt: existing?.alt || newImages[0].alt,
            caption: existing?.caption || "",
            order: targetReplaceIdx,
          };
          return { ...prev, images: updated };
        }
        return {
          ...prev,
          images: [...prev.images, ...newImages].map((img, i) => ({ ...img, order: i })),
        };
      });

      const savedPct = optimizedList.reduce(
        (acc, cur) => acc + Math.max(0, cur.originalBytes - cur.optimizedBytes),
        0
      );
      setStatusMsg({
        type: "ok",
        text: `Uploaded ${newImages.length} optimized WebP image${newImages.length > 1 ? "s" : ""}${
          savedPct > 0 ? ` (saved ${formatBytes(savedPct)} via auto-optimization)` : ""
        }.`,
      });
    } catch (err) {
      setStatusMsg({
        type: "err",
        text: err instanceof Error ? err.message : "Upload failed.",
      });
    } finally {
      setUploading(false);
      setReplaceIndex(null);
    }
  }

  function moveImage(index: number, delta: -1 | 1) {
    setForm((prev) => {
      const next = [...prev.images];
      const target = index + delta;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return {
        ...prev,
        images: next.map((img, i) => ({ ...img, order: i })),
      };
    });
  }

  function removeImage(index: number) {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index).map((img, i) => ({ ...img, order: i })),
    }));
  }

  async function handleSaveEvent(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    try {
      const payload = {
        title: form.title,
        description: form.description,
        date: form.date,
        endDate: form.endDate || undefined,
        location: form.location,
        category: form.category,
        status: form.status,
        images: form.images,
      };

      const isEdit = Boolean(form.id);
      const res = await fetch(isEdit ? `/api/admin/events/${form.id}` : "/api/admin/events", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = (await res.json()) as { error?: string };
        throw new Error(err.error || "Failed to save event.");
      }

      const { event } = (await res.json()) as { event: CivicEvent };
      await loadDashboardData();
      setForm(emptyForm());
      setStatusMsg({
        type: "ok",
        text: `Event "${event.title}" ${isEdit ? "updated" : "created"} (${event.status}).`,
      });
      setTab("list");
    } catch (err) {
      setStatusMsg({
        type: "err",
        text: err instanceof Error ? err.message : "Failed to save event.",
      });
    } finally {
      setSaving(false);
    }
  }

  function startEdit(ev: CivicEvent) {
    setForm({
      id: ev.id,
      title: ev.title,
      description: ev.description,
      date: ev.date,
      endDate: ev.endDate || "",
      location: ev.location,
      category: ev.category,
      status: ev.status,
      images: ev.images,
    });
    setStatusMsg(null);
    setTab("editor");
  }

  async function handleDeleteEvent(ev: CivicEvent) {
    if (!window.confirm(`Delete "${ev.title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/events/${ev.id}`, { method: "DELETE" });
    if (res.ok) {
      await loadDashboardData();
      setStatusMsg({ type: "ok", text: `Deleted "${ev.title}".` });
    }
  }

  async function handleSaveSocial(e: React.FormEvent) {
    e.preventDefault();
    setSavingSocial(true);
    setStatusMsg(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facebookUrl, instagramUrl }),
      });
      if (!res.ok) {
        const err = (await res.json()) as { error?: string };
        throw new Error(err.error || "Failed to update social links.");
      }
      setStatusMsg({ type: "ok", text: "Official social media profile links updated." });
    } catch (err) {
      setStatusMsg({
        type: "err",
        text: err instanceof Error ? err.message : "Failed to update social links.",
      });
    } finally {
      setSavingSocial(false);
    }
  }

  if (!authenticated) {
    return (
      <div className="form-card" style={{ maxWidth: 480, margin: "0 auto" }}>
        <h2>Administrator Sign In</h2>
        <p style={{ color: "var(--ink-soft)", fontSize: "0.95rem" }}>
          Sign in to create events, upload and organize event photographs, and manage official social links.
        </p>
        {usingDefaultPassword && (
          <div className="note note-saffron" style={{ marginBottom: "1.25rem" }}>
            <p style={{ margin: 0, fontSize: "0.88rem" }}>
              <strong>Setup note:</strong> Set <code>ADMIN_PASSWORD</code> in your environment variables before
              deploying to production.
            </p>
          </div>
        )}
        <form onSubmit={handleLogin} className="stack">
          <div className="field">
            <label htmlFor="admin-password">
              Password <span className="req">*</span>
            </label>
            <input
              id="admin-password"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {authError && <p className="field-error">{authError}</p>}
          <button type="submit" className="btn btn-green" disabled={authLoading}>
            {authLoading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <div className="admin-toolbar">
        <div className="admin-tabs" role="tablist" aria-label="Admin sections">
          <button
            type="button"
            className={`btn btn-sm ${tab === "editor" ? "btn-green" : "btn-outline"}`}
            onClick={() => setTab("editor")}
          >
            {form.id ? "Edit Event" : "+ New Event"}
          </button>
          <button
            type="button"
            className={`btn btn-sm ${tab === "list" ? "btn-green" : "btn-outline"}`}
            onClick={() => setTab("list")}
          >
            Manage Events ({events.length})
          </button>
          <button
            type="button"
            className={`btn btn-sm ${tab === "social" ? "btn-green" : "btn-outline"}`}
            onClick={() => setTab("social")}
          >
            Social Media Links
          </button>
        </div>

        <div style={{ display: "flex", gap: "0.65rem", alignItems: "center" }}>
          <Link href="/events" className="btn btn-outline btn-sm">
            View Public Events
          </Link>
          <button type="button" className="btn btn-outline btn-sm" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className={`note ${statusMsg.type === "ok" ? "note-green" : "note-crimson"}`}>
          <p style={{ margin: 0 }}>{statusMsg.text}</p>
        </div>
      )}

      {/* Hidden input for replacing a single image */}
      <input
        ref={replaceInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="sr-only"
        onChange={(e) => {
          if (replaceIndex !== null) {
            handleUploadFiles(e.target.files, replaceIndex);
          }
          e.target.value = "";
        }}
      />

      {tab === "editor" && (
        <form onSubmit={handleSaveEvent} className="form-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
            <h2 style={{ margin: 0 }}>{form.id ? "Edit Event" : "Create New Event"}</h2>
            {form.id && (
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => setForm(emptyForm())}
              >
                Cancel Edit / New Event
              </button>
            )}
          </div>

          <div className="form-grid">
            <div className="field full">
              <label htmlFor="ev-title">
                Event Title <span className="req">*</span>
              </label>
              <input
                id="ev-title"
                type="text"
                className="input"
                placeholder="e.g., Ward 4 Free Health & Blood-Donation Camp"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="ev-date">
                Event Date <span className="req">*</span>
              </label>
              <input
                id="ev-date"
                type="date"
                className="input"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="ev-end-date">End Date (optional)</label>
              <input
                id="ev-end-date"
                type="date"
                className="input"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </div>

            <div className="field">
              <label htmlFor="ev-location">
                Location <span className="req">*</span>
              </label>
              <input
                id="ev-location"
                type="text"
                className="input"
                placeholder="e.g., Ambedkar Colony, Ward 4, Baranagar"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="ev-category">Category</label>
              <select
                id="ev-category"
                className="select"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as EventCategory })}
              >
                {Object.entries(eventCategoryLabels).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="field full">
              <label htmlFor="ev-desc">
                Description <span className="req">*</span>
              </label>
              <textarea
                id="ev-desc"
                className="textarea"
                placeholder="Describe the event purpose, activities, timings, and community participation…"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="ev-status">Publish Status</label>
              <select
                id="ev-status"
                className="select"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as "published" | "draft" })}
              >
                <option value="published">Published (Visible on website)</option>
                <option value="draft">Draft (Hidden from public)</option>
              </select>
            </div>

            <div className="field full">
              <label htmlFor="ev-photos">Event Photographs (Multiple images, auto-optimized to WebP)</label>
              <input
                id="ev-photos"
                type="file"
                className="input"
                accept="image/jpeg,image/png,image/webp,image/avif"
                multiple
                disabled={uploading}
                onChange={(e) => {
                  handleUploadFiles(e.target.files, null);
                  e.target.value = "";
                }}
              />
              <p className="hint">
                {uploading
                  ? "Optimizing and uploading images…"
                  : "Images are automatically resized (max 1600px) and compressed to WebP before upload. You can preview, reorder, replace, or delete photos below."}
              </p>

              {form.images.length > 0 && (
                <div className="admin-image-grid">
                  {form.images.map((img, idx) => (
                    <div key={img.id || img.url} className="admin-image-card">
                      <div className="admin-image-thumb">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.url} alt={img.alt || `Preview ${idx + 1}`} />
                      </div>
                      <div className="admin-image-body">
                        <div style={{ fontSize: "0.78rem", color: "var(--ink-muted)" }}>
                          #{idx + 1} {idx === 0 ? "· Cover photo" : ""}{" "}
                          {img.sizeBytes ? `· ${formatBytes(img.sizeBytes)}` : ""}
                        </div>
                        <input
                          type="text"
                          className="input"
                          style={{ padding: "0.45rem 0.6rem", fontSize: "0.84rem" }}
                          placeholder="Alt text (for SEO & accessibility)"
                          value={img.alt}
                          onChange={(e) => {
                            const val = e.target.value;
                            setForm((prev) => ({
                              ...prev,
                              images: prev.images.map((item, i) =>
                                i === idx ? { ...item, alt: val } : item
                              ),
                            }));
                          }}
                        />
                        <input
                          type="text"
                          className="input"
                          style={{ padding: "0.45rem 0.6rem", fontSize: "0.84rem" }}
                          placeholder="Optional caption"
                          value={img.caption || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setForm((prev) => ({
                              ...prev,
                              images: prev.images.map((item, i) =>
                                i === idx ? { ...item, caption: val } : item
                              ),
                            }));
                          }}
                        />
                        <div className="admin-image-actions">
                          <button
                            type="button"
                            className="admin-mini-btn"
                            disabled={idx === 0}
                            onClick={() => moveImage(idx, -1)}
                            title="Move earlier"
                          >
                            ←
                          </button>
                          <button
                            type="button"
                            className="admin-mini-btn"
                            disabled={idx === form.images.length - 1}
                            onClick={() => moveImage(idx, 1)}
                            title="Move later"
                          >
                            →
                          </button>
                          <button
                            type="button"
                            className="admin-mini-btn"
                            onClick={() => {
                              setReplaceIndex(idx);
                              replaceInputRef.current?.click();
                            }}
                          >
                            Replace
                          </button>
                          <button
                            type="button"
                            className="admin-mini-btn danger"
                            onClick={() => removeImage(idx)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-green" disabled={saving || uploading}>
              {saving ? "Saving…" : form.id ? "Save Changes" : "Publish Event"}
            </button>
          </div>
        </form>
      )}

      {tab === "list" && (
        <div className="card">
          <h2>All Events</h2>
          {loadingEvents ? (
            <p>Loading events…</p>
          ) : events.length === 0 ? (
            <p style={{ color: "var(--ink-muted)" }}>
              No events created yet. Click <strong>+ New Event</strong> to add your first event.
            </p>
          ) : (
            <div className="table-wrap" style={{ marginTop: "1rem" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Timeline</th>
                    <th>Status</th>
                    <th>Photos</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((ev) => {
                    const upcoming = isUpcomingEvent(ev);
                    return (
                      <tr key={ev.id}>
                        <td>
                          <strong>{ev.title}</strong>
                          <div style={{ fontSize: "0.84rem", color: "var(--ink-muted)" }}>{ev.location}</div>
                        </td>
                        <td>{formatEventDate(ev.date)}</td>
                        <td>
                          <span className={`tag ${upcoming ? "tag-water" : "tag-saffron"}`}>
                            {upcoming ? "Upcoming" : "Past"}
                          </span>
                        </td>
                        <td>
                          <span className={`tag ${ev.status === "published" ? "" : "tag-unverified"}`}>
                            {ev.status}
                          </span>
                        </td>
                        <td>{ev.images.length}</td>
                        <td>
                          <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
                            <button
                              type="button"
                              className="admin-mini-btn"
                              onClick={() => startEdit(ev)}
                            >
                              Edit
                            </button>
                            {ev.status === "published" && (
                              <Link href={`/events/${ev.slug}`} className="admin-mini-btn" style={{ textDecoration: "none" }}>
                                View
                              </Link>
                            )}
                            <button
                              type="button"
                              className="admin-mini-btn danger"
                              onClick={() => handleDeleteEvent(ev)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === "social" && (
        <form onSubmit={handleSaveSocial} className="form-card" id="social-settings">
          <h2>Official Social Media Profiles</h2>
          <p style={{ color: "var(--ink-soft)", fontSize: "0.95rem" }}>
            Configure the official Facebook and Instagram profile URLs displayed in the website footer and
            Contact page. Leave blank until the official URLs are ready.
          </p>
          <div className="form-grid" style={{ marginTop: "1rem" }}>
            <div className="field full">
              <label htmlFor="social-fb">Facebook Profile / Page URL</label>
              <input
                id="social-fb"
                type="url"
                className="input"
                placeholder="https://www.facebook.com/..."
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
              />
            </div>
            <div className="field full">
              <label htmlFor="social-ig">Instagram Profile URL</label>
              <input
                id="social-ig"
                type="url"
                className="input"
                placeholder="https://www.instagram.com/..."
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-green" disabled={savingSocial}>
              {savingSocial ? "Saving…" : "Save Social Links"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
