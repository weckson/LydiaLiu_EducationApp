// 种子数据共享类型

export type SeedEntry = {
  title: string;
  contentMd: string;
  category: string;
  tags: string[];
  sourceUrl?: string;
  visibility?: "PRIVATE" | "STUDENT_VISIBLE";
};
