// ============================================
// 学习相关类型定义
// ============================================

export interface StudyConfig {
  dailyNewWords: number;     // 每日新学单词数
  dailyReviewWords: number;  // 每日复习单词数
  enableTTS: boolean;        // 启用发音
  showRomaji: boolean;       // 显示罗马音
  defaultBookId: string;     // 默认词书
}

export interface DailyGoal {
  target: number;            // 每日学习目标
  completed: number;         // 已完成
}
