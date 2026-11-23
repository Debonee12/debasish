import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { site } from "./site";

export type SocialSettings = {
  facebookUrl: string;
  instagramUrl: string;
  updatedAt?: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

let memorySettings: SocialSettings | null = null;

function isValidHttpUrl(value: string): boolean {
  if (!value) return true;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export async function getSocialSettings(): Promise<SocialSettings> {
  if (memorySettings) return memorySettings;
  try {
    const raw = await fs.readFile(SETTINGS_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<SocialSettings>;
    return {
      facebookUrl: parsed.facebookUrl?.trim() || site.social.facebook,
      instagramUrl: parsed.instagramUrl?.trim() || site.social.instagram,
      updatedAt: parsed.updatedAt,
    };
  } catch {
    return {
      facebookUrl: site.social.facebook,
      instagramUrl: site.social.instagram,
    };
  }
}

export async function updateSocialSettings(input: {
  facebookUrl?: string;
  instagramUrl?: string;
}): Promise<SocialSettings> {
  const current = await getSocialSettings();
  const facebookUrl = (input.facebookUrl ?? current.facebookUrl).trim();
  const instagramUrl = (input.instagramUrl ?? current.instagramUrl).trim();

  if (!isValidHttpUrl(facebookUrl) || !isValidHttpUrl(instagramUrl)) {
    throw new Error("Social media URLs must start with http:// or https://");
  }

  const next: SocialSettings = {
    facebookUrl,
    instagramUrl,
    updatedAt: new Date().toISOString(),
  };

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const tmpFile = `${SETTINGS_FILE}.${crypto.randomBytes(4).toString("hex")}.tmp`;
    await fs.writeFile(tmpFile, `${JSON.stringify(next, null, 2)}\n`, "utf8");
    await fs.rename(tmpFile, SETTINGS_FILE);
    memorySettings = null;
  } catch {
    memorySettings = next;
  }

  return next;
}
