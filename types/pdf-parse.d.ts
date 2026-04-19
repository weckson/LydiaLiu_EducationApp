// pdf-parse 模块类型声明
// 该库没有官方 @types 包，手动声明最小接口

declare module "pdf-parse" {
  interface PDFData {
    numpages: number;
    numrender: number;
    info: any;
    metadata: any;
    text: string;
    version: string;
  }

  function pdfParse(
    buffer: Buffer | Uint8Array,
    options?: any
  ): Promise<PDFData>;

  export default pdfParse;
}
