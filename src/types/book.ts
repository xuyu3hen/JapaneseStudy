// ============================================
// 词书类型定义
// ============================================

export interface WordBook {
  id: string;
  name: string;              // 词书名称
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  description: string;       // 词书描述
  totalWords: number;        // 总单词数
  color: string;             // 主题色
  icon: string;              // 图标 emoji
}
