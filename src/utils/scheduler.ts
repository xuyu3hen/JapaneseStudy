// ============================================
// 艾宾浩斯复习调度算法
// ============================================

import type { WordProgress } from '@/types/word';

// 复习间隔（天）- 艾宾浩斯遗忘曲线
const REVIEW_INTERVALS = [1, 2, 4, 7, 15, 30];

/**
 * 计算下次复习时间戳
 */
export function calculateNextReview(intervalIndex: number): number {
  const days = REVIEW_INTERVALS[Math.min(intervalIndex, REVIEW_INTERVALS.length - 1)];
  return Date.now() + days * 24 * 60 * 60 * 1000;
}

/**
 * 初始学习进度
 */
export function createInitialProgress(wordId: string): WordProgress {
  return {
    wordId,
    status: 'new',
    reviewCount: 0,
    correctCount: 0,
    wrongCount: 0,
    lastReviewAt: 0,
    nextReviewAt: 0,
    interval: 0,
    round: 1,
    round3Correct: 0,
  };
}

/**
 * 处理学习结果（三轮学习机制）
 * 
 * 第一轮（round=1）：展示单词 → 点击认识 → 进入第二轮
 * 第二轮（round=2）：回忆测试 → 正确进入第三轮，错误回到第一轮
 * 第三轮（round=3）：累计3次正确后，状态变为 learning 并设置首次复习（1天后）
 */
export function processLearnResult(
  progress: WordProgress,
  isCorrect: boolean
): WordProgress {
  const now = Date.now();

  if (progress.round < 3) {
    // 第一轮和第二轮
    if (isCorrect) {
      return {
        ...progress,
        round: progress.round + 1,
        lastReviewAt: now,
      };
    } else {
      // 错误回到第一轮
      return {
        ...progress,
        round: 1,
        lastReviewAt: now,
        wrongCount: progress.wrongCount + 1,
      };
    }
  } else {
    // 第三轮：累计3次正确后进入复习
    const newRound3Correct = isCorrect
      ? progress.round3Correct + 1
      : 0;

    if (isCorrect && newRound3Correct >= 3) {
      // 完成三轮学习，进入复习阶段
      return {
        ...progress,
        status: 'learning',
        round: 1,
        round3Correct: 0,
        reviewCount: 1,
        correctCount: progress.correctCount + 1,
        lastReviewAt: now,
        nextReviewAt: calculateNextReview(0),
        interval: 1,
      };
    }

    return {
      ...progress,
      round3Correct: newRound3Correct,
      correctCount: isCorrect ? progress.correctCount + 1 : progress.correctCount,
      wrongCount: isCorrect ? progress.wrongCount : progress.wrongCount + 1,
      lastReviewAt: now,
    };
  }
}

/**
 * 处理复习结果
 * 
 * 正确：推进间隔，下次复习时间延后
 * 错误：回到间隔1（1天后复习），状态改为 learning
 */
export function processReviewResult(
  progress: WordProgress,
  isCorrect: boolean
): WordProgress {
  const now = Date.now();

  if (isCorrect) {
    const newIntervalIndex = Math.min(progress.reviewCount, REVIEW_INTERVALS.length - 1);
    const newReviewCount = progress.reviewCount + 1;

    // 复习5次正确以上，标记为已掌握
    const status = newReviewCount >= 6 ? 'mastered' : 'learning';

    return {
      ...progress,
      status,
      reviewCount: newReviewCount,
      correctCount: progress.correctCount + 1,
      lastReviewAt: now,
      nextReviewAt: calculateNextReview(newIntervalIndex),
      interval: REVIEW_INTERVALS[Math.min(newIntervalIndex, REVIEW_INTERVALS.length - 1)],
    };
  } else {
    // 错误：降低间隔到1天，重学
    return {
      ...progress,
      status: 'learning',
      reviewCount: 1,
      round: 1,
      round3Correct: 0,
      wrongCount: progress.wrongCount + 1,
      lastReviewAt: now,
      nextReviewAt: calculateNextReview(0),
      interval: 1,
    };
  }
}

/**
 * 检查是否到期需要复习
 */
export function isReviewDue(progress: WordProgress): boolean {
  if (progress.status !== 'learning') return false;
  return progress.nextReviewAt <= Date.now();
}
