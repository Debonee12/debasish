import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const ALLOWED_TYPES: Record<string, string> = {
  "image/webp": "webp",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/avif": "avif",
};

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB per image
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "events");

async function uploadToVercelBlob(fileName: string, buffer: Buffer, contentType: string): Promise<string> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("Missing BLOB_READ_WRITE_TOKEN");

  const res = await fetch(`https://blob.vercel-storage.com/events/${fileName}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": contentType,
      "x-content-type": contentType,
      "x-add-random-suffix": "1",
    },
    body: new Uint8Array(buffer),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Blob upload failed (${res.status}): ${text}`);
  }

  const data = (await res.json()) as { url: string };
  return data.url;
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll("files").filter((item): item is File => item instanceof File);

    if (files.length === 0) {
      return NextResponse.json({ error: "No image files provided." }, { status: 400 });
    }

    const uploaded: Array<{ url: string; sizeBytes: number; originalName: string }> = [];

    for (const file of files) {
      const ext = ALLOWED_TYPES[file.type.toLowerCase()];
      if (!ext) {
        return NextResponse.json(
          { error: `Unsupported file type "${file.type}". Please upload WebP, JPEG, PNG, or AVIF images.` },
          { status: 400 }
        );
      }
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds the 10 MB limit.` },
          { status: 400 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uniqueName = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;

      if (process.env.BLOB_READ_WRITE_TOKEN) {
        const blobUrl = await uploadToVercelBlob(uniqueName, buffer, file.type);
        uploaded.push({
          url: blobUrl,
          sizeBytes: buffer.byteLength,
          originalName: file.name,
        });
      } else {
        await fs.mkdir(UPLOAD_DIR, { recursive: true });
        const targetPath = path.join(UPLOAD_DIR, uniqueName);
        await fs.writeFile(targetPath, buffer);
        uploaded.push({
          url: `/uploads/events/${uniqueName}`,
          sizeBytes: buffer.byteLength,
          originalName: file.name,
        });
      }
    }

    return NextResponse.json({ files: uploaded }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
