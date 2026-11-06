// ============================================
// 日语单词类型定义
// ============================================

export interface Word {
  id: string;
  kanji: string;           // 汉字（可能为空）
  kana: string;            // 假名注音
  romaji: string;           // 罗马音
  meaning: string;          // 中文释义
  example: string;          // 例句（日语）
  exampleMeaning: string;   // 例句释义
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  bookId: string;           // 所属词书
}

// 单词学习状态
export type WordStatus = 'new' | 'learning' | 'reviewing' | 'mastered';

// 学习记录
export interface WordProgress {
  wordId: string;
  status: WordStatus;
  reviewCount: number;      // 复习次数
  correctCount: number;     // 正确次数
  wrongCount: number;       // 错误次数
  lastReviewAt: number;     // 上次复习时间戳
  nextReviewAt: number;     // 下次复习时间戳
  interval: number;         // 当前间隔（天）
  round: number;            // 当前学习轮次（1-3，第3轮满后进入复习）
  round3Correct: number;    // 第三轮累计正确次数
}

// 学习会话记录
export interface StudySession {
  date: string;             // YYYY-MM-DD
  newWords: number;         // 新学单词数
  reviewWords: number;      // 复习单词数
  correctRate: number;      // 正确率
  duration: number;         // 学习时长（秒）
}
