// ============================================
// 模拟日语词书数据
// ============================================

import type { WordBook } from '@/types/book';

export const mockWordBooks: WordBook[] = [
  {
    id: 'n5-basic',
    name: 'N5 基础词汇',
    level: 'N5',
    description: '日语能力考试N5级别必备基础词汇，适合入门学习者',
    totalWords: 200,
    color: '#4ECDC4',
    icon: '🌸',
  },
  {
    id: 'n4-intermediate',
    name: 'N4 进阶词汇',
    level: 'N4',
    description: '日语能力考试N4级别词汇，日常生活高频用词',
    totalWords: 300,
    color: '#FF6B9D',
    icon: '📚',
  },
  {
    id: 'n3-advanced',
    name: 'N3 高级词汇',
    level: 'N3',
    description: '日语能力考试N3级别词汇，商务与学术场景',
    totalWords: 400,
    color: '#6C5CE7',
    icon: '🎌',
  },
];
