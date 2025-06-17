import { NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

// Harus pakai "force-dynamic" agar API bisa handle FormData/file
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "File tidak valid" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${uuidv4()}.pdf`;
  const filePath = path.join(process.cwd(), "public", filename);
  await fs.writeFile(filePath, buffer);

  // Load PDF
  const loader = new PDFLoader(filePath);
  const docs = await loader.load();
  const allText = docs.map((doc) => doc.pageContent).join("\n");

  // Optional: Hapus file setelah dibaca (jika tidak ingin disimpan)
  await fs.unlink(filePath);

  return NextResponse.json({ doc: allText });
}
