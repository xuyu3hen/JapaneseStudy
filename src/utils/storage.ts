// ============================================
// 本地存储工具（基于 Taro Storage）
// ============================================

import Taro from '@tarojs/taro';

const PREFIX = 'jp_learn_';

export const storage = {
  set<T>(key: string, value: T): void {
    try {
      Taro.setStorageSync(PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.error(`[Storage] set error for key ${key}:`, e);
    }
  },

  get<T>(key: string, defaultValue: T): T {
    try {
      const raw = Taro.getStorageSync(PREFIX + key);
      if (raw === '') return defaultValue;
      return JSON.parse(raw) as T;
    } catch (e) {
      console.error(`[Storage] get error for key ${key}:`, e);
      return defaultValue;
    }
  },

  remove(key: string): void {
    try {
      Taro.removeStorageSync(PREFIX + key);
    } catch (e) {
      console.error(`[Storage] remove error for key ${key}:`, e);
    }
  },

  clear(): void {
    try {
      Taro.clearStorageSync();
    } catch (e) {
      console.error('[Storage] clear error:', e);
    }
  },
};

// 存储键名常量
export const StorageKeys = {
  WORD_PROGRESS: 'word_progress',       // 单词学习进度
  STUDY_SESSIONS: 'study_sessions',     // 学习会话记录
  CHECKIN_DATES: 'checkin_dates',       // 打卡日期列表
  CONFIG: 'config',                     // 学习配置
  CURRENT_BOOK: 'current_book',         // 当前词书
  LAST_STUDY_DATE: 'last_study_date',   // 上次学习日期
  STREAK_DAYS: 'streak_days',           // 连续学习天数
};
