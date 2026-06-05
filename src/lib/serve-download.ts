import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const DOWNLOADS_DIR = path.join(process.cwd(), "public", "downloads");

export async function serveDownload(opts: {
  filename: string;
  contentType: string;
}): Promise<Response> {
  const filePath = path.join(DOWNLOADS_DIR, opts.filename);

  try {
    const [buffer, fileStat] = await Promise.all([
      readFile(filePath),
      stat(filePath),
    ]);

    const etag = `"${fileStat.size}-${fileStat.mtimeMs}"`;

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": opts.contentType,
        "Content-Disposition": `attachment; filename="${opts.filename}"`,
        "Content-Length": String(buffer.length),
        "Last-Modified": fileStat.mtime.toUTCString(),
        ETag: etag,
        "Cache-Control": "no-cache, must-revalidate",
      },
    });
  } catch {
    return Response.json(
      {
        error: `File not found. Place ${opts.filename} in public/downloads/`,
      },
      { status: 404 },
    );
  }
}
