// ============================================
// 学习状态管理（Zustand）
// ============================================

import { create } from 'zustand';
import type { Word, WordProgress, WordStatus } from '@/types/word';
import type { StudyConfig } from '@/types/study';
import { storage, StorageKeys } from '@/utils/storage';
import { mockWords } from '@/data/words';
import { createInitialProgress, processLearnResult, processReviewResult, isReviewDue } from '@/utils/scheduler';

interface StudyState {
  // 配置
  config: StudyConfig;
  
  // 当前词书单词列表
  currentWords: Word[];
  
  // 学习进度 Map
  progressMap: Record<string, WordProgress>;
  
  // 统计
  streakDays: number;
  todayStudyCount: number;
  totalLearned: number;
  
  // 操作方法
  init: () => void;
  setConfig: (config: Partial<StudyConfig>) => void;
  switchBook: (bookId: string) => void;
  
  // 获取待学习/待复习单词
  getNewWords: (count: number) => Word[];
  getReviewWords: (count: number) => Word[];
  
  // 处理学习/复习结果
  handleLearnResult: (wordId: string, isCorrect: boolean) => void;
  handleReviewResult: (wordId: string, isCorrect: boolean) => void;
  
  // 统计方法
  checkin: () => void;
  getCheckinDates: () => string[];
  getProgressByStatus: () => Record<WordStatus, number>;
}

const defaultConfig: StudyConfig = {
  dailyNewWords: 10,
  dailyReviewWords: 20,
  enableTTS: true,
  showRomaji: true,
  defaultBookId: 'n5-basic',
};

export const useStudyStore = create<StudyState>((set, get) => ({
  config: defaultConfig,
  currentWords: [],
  progressMap: {},
  streakDays: 0,
  todayStudyCount: 0,
  totalLearned: 0,

  init: () => {
    const savedConfig = storage.get<StudyConfig>(StorageKeys.CONFIG, defaultConfig);
    const savedProgress = storage.get<Record<string, WordProgress>>(StorageKeys.WORD_PROGRESS, {});
    const savedStreak = storage.get<number>(StorageKeys.STREAK_DAYS, 0);
    
    // 筛选当前词书单词
    const currentWords = mockWords.filter(w => w.bookId === savedConfig.defaultBookId);
    
    set({
      config: savedConfig,
      progressMap: savedProgress,
      currentWords,
      streakDays: savedStreak,
      totalLearned: Object.values(savedProgress).filter(p => 
        p.status === 'learning' || p.status === 'mastered'
      ).length,
    });
  },

  setConfig: (config) => {
    const newConfig = { ...get().config, ...config };
    storage.set(StorageKeys.CONFIG, newConfig);
    set({ config: newConfig });
  },

  switchBook: (bookId) => {
    const words = mockWords.filter(w => w.bookId === bookId);
    const newConfig = { ...get().config, defaultBookId: bookId };
    storage.set(StorageKeys.CONFIG, newConfig);
    set({ config: newConfig, currentWords: words });
  },

  getNewWords: (count: number) => {
    const { currentWords, progressMap } = get();
    const newWords = currentWords.filter(w => {
      const progress = progressMap[w.id];
      return !progress || progress.status === 'new';
    });
    return newWords.slice(0, count);
  },

  getReviewWords: (count: number) => {
    const { currentWords, progressMap } = get();
    const reviewWords = currentWords.filter(w => {
      const progress = progressMap[w.id];
      return progress && isReviewDue(progress);
    });
    return reviewWords.slice(0, count);
  },

  handleLearnResult: (wordId, isCorrect) => {
    const { progressMap } = get();
    const current = progressMap[wordId] || createInitialProgress(wordId);
    const updated = processLearnResult(current, isCorrect);
    
    const newProgressMap = { ...progressMap, [wordId]: updated };
    storage.set(StorageKeys.WORD_PROGRESS, newProgressMap);
    
    // 如果完成三轮学习，增加今日学习数
    if (current.round < 3 && updated.status === 'learning') {
      set(state => ({
        progressMap: newProgressMap,
        todayStudyCount: state.todayStudyCount + 1,
        totalLearned: state.totalLearned + 1,
      }));
    } else {
      set({ progressMap: newProgressMap });
    }
  },

  handleReviewResult: (wordId, isCorrect) => {
    const { progressMap } = get();
    const current = progressMap[wordId] || createInitialProgress(wordId);
    const updated = processReviewResult(current, isCorrect);
    
    const newProgressMap = { ...progressMap, [wordId]: updated };
    storage.set(StorageKeys.WORD_PROGRESS, newProgressMap);
    
    set({ progressMap: newProgressMap });
  },

  checkin: () => {
    const today = new Date().toISOString().split('T')[0];
    const dates = storage.get<string[]>(StorageKeys.CHECKIN_DATES, []);
    
    if (!dates.includes(today)) {
      dates.push(today);
      storage.set(StorageKeys.CHECKIN_DATES, dates);
      
      // 计算连续天数
      const sortedDates = [...dates].sort().reverse();
      let streak = 1;
      for (let i = 0; i < sortedDates.length - 1; i++) {
        const curr = new Date(sortedDates[i]);
        const next = new Date(sortedDates[i + 1]);
        const diffDays = Math.round((curr.getTime() - next.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          streak++;
        } else {
          break;
        }
      }
      storage.set(StorageKeys.STREAK_DAYS, streak);
      set({ streakDays: streak });
    }
  },

  getCheckinDates: () => {
    return storage.get<string[]>(StorageKeys.CHECKIN_DATES, []);
  },

  getProgressByStatus: () => {
    const { progressMap, currentWords } = get();
    const result: Record<WordStatus, number> = {
      new: 0,
      learning: 0,
      reviewing: 0,
      mastered: 0,
    };
    
    currentWords.forEach(w => {
      const progress = progressMap[w.id];
      if (progress) {
        result[progress.status]++;
      } else {
        result.new++;
      }
    });
    
    return result;
  },
}));
