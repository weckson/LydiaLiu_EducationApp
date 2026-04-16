// PDF / DOCX / TXT 文本提取工具

/**
 * 从上传的文件 Buffer 中提取纯文本
 */
export async function extractText(
  buffer: Buffer,
  filename: string
): Promise<string> {
  const ext = filename.toLowerCase().split(".").pop();

  switch (ext) {
    case "pdf":
      return extractPdf(buffer);
    case "docx":
      return extractDocx(buffer);
    case "txt":
    case "md":
      return buffer.toString("utf-8");
    default:
      throw new Error(`不支持的文件格式: .${ext}（支持 .pdf / .docx / .txt）`);
  }
}

async function extractPdf(buffer: Buffer): Promise<string> {
  try {
    const pdfParse = (await import("pdf-parse")).default;
    const data = await pdfParse(buffer);
    return data.text;
  } catch (e: any) {
    throw new Error(`PDF 解析失败: ${e?.message}`);
  }
}

async function extractDocx(buffer: Buffer): Promise<string> {
  try {
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (e: any) {
    throw new Error(`DOCX 解析失败: ${e?.message}`);
  }
}
