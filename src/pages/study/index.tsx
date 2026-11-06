import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useStudyStore } from '@/store/useStudyStore';
import { speak, speakWord, stopSpeak } from '@/utils/tts';
import type { Word } from '@/types/word';
import classnames from 'classnames';
import styles from './index.module.scss';

type StudyPhase = 'show' | 'test' | 'done';

const StudyPage: React.FC = () => {
  const { 
    init, 
    config, 
    getNewWords, 
    handleLearnResult, 
    handleReviewResult,
    progressMap,
    checkin,
  } = useStudyStore();

  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<StudyPhase>('show'); // show=展示/回忆 test=测试 done=完成
  const [showAnswer, setShowAnswer] = useState(false);
  const [round, setRound] = useState(1);
  const [correctCount, setCorrectCount] = useState(0);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const hasSpoken = useRef(false);

  useEffect(() => {
    init();
    // 判断是新学还是复习
    const pages = Taro.getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const fromReview = currentPage?.options?.mode === 'review';
    setIsReviewMode(fromReview);

    if (fromReview) {
      const reviewWords = useStudyStore.getState().getReviewWords(20);
      setWords(reviewWords);
    } else {
      const newWords = useStudyStore.getState().getNewWords(config.dailyNewWords);
      setWords(newWords);
    }
  }, []);

  const currentWord = words[currentIndex];

  // 自动发音
  useEffect(() => {
    if (currentWord && config.enableTTS && !hasSpoken.current) {
      const timer = setTimeout(() => {
        speak(currentWord.kana);
        hasSpoken.current = true;
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentWord, config.enableTTS]);

  const handleKnow = () => {
    if (!currentWord) return;
    
    if (isReviewMode) {
      handleReviewResult(currentWord.id, true);
    } else {
      handleLearnResult(currentWord.id, true);
    }
    
    setCorrectCount(c => c + 1);
    nextWord();
  };

  const handleDontKnow = () => {
    if (!currentWord) return;
    
    if (isReviewMode) {
      handleReviewResult(currentWord.id, false);
    } else {
      handleLearnResult(currentWord.id, false);
    }
    
    nextWord();
  };

  const nextWord = () => {
    stopSpeak();
    hasSpoken.current = false;

    if (currentIndex < words.length - 1) {
      setCurrentIndex(i => i + 1);
      setShowAnswer(false);
      if (phase === 'show') setPhase('test');
    } else {
      // 学习完成
      setPhase('done');
      checkin();
    }
  };

  const speakCurrentWord = () => {
    if (currentWord) {
      speakWord(currentWord.kana, currentWord.example);
    }
  };

  const goBack = () => {
    Taro.navigateBack();
  };

  // 无单词可学
  if (words.length === 0) {
    return (
      <View className={styles.emptyPage}>
        <Text className={styles.emptyEmoji}>🎉</Text>
        <Text className={styles.emptyTitle}>
          {isReviewMode ? '没有需要复习的单词' : '今日新词已全部学完'}
        </Text>
        <Text className={styles.emptyDesc}>
          {isReviewMode ? '休息一下，明天再来吧！' : '可以去复习已学过的单词'}
        </Text>
        <Button className={styles.backBtn} onClick={goBack}>
          <Text className={styles.backBtnText}>返回首页</Text>
        </Button>
      </View>
    );
  }

  // 学习完成
  if (phase === 'done') {
    const accuracy = words.length > 0 
      ? Math.round((correctCount / words.length) * 100) 
      : 0;
    return (
      <View className={styles.donePage}>
        <Text className={styles.doneEmoji}>✨</Text>
        <Text className={styles.doneTitle}>
          {isReviewMode ? '复习完成！' : '学习完成！'}
        </Text>
        <View className={styles.doneStats}>
          <View className={styles.doneStat}>
            <Text className={styles.doneStatNumber}>{words.length}</Text>
            <Text className={styles.doneStatLabel}>总数量</Text>
          </View>
          <View className={styles.doneStat}>
            <Text className={styles.doneStatNumber}>{correctCount}</Text>
            <Text className={styles.doneStatLabel}>正确</Text>
          </View>
          <View className={styles.doneStat}>
            <Text className={styles.doneStatNumber}>{accuracy}%</Text>
            <Text className={styles.doneStatLabel}>正确率</Text>
          </View>
        </View>
        <Button className={styles.backBtn} onClick={goBack}>
          <Text className={styles.backBtnText}>返回首页</Text>
        </Button>
      </View>
    );
  }

  return (
    <View className={styles.page}>
      {/* 进度条 */}
      <View className={styles.progressBar}>
        <View 
          className={styles.progressFill}
          style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
        />
      </View>
      <Text className={styles.progressText}>
        {currentIndex + 1} / {words.length}
      </Text>

      {/* 学习卡片 */}
      {currentWord && (
        <View className={styles.studyArea}>
          {/* 阶段标签 */}
          <View className={styles.phaseTag}>
            <Text className={styles.phaseText}>
              {isReviewMode ? '🔄 复习' : `📖 第${round}轮学习`}
            </Text>
          </View>

          {/* 单词展示 */}
          <View className={styles.wordCard}>
            {/* 汉字（大字展示） */}
            {currentWord.kanji && (
              <Text className={styles.kanjiBig}>{currentWord.kanji}</Text>
            )}
            
            {/* 假名（初始隐藏，点击显示） */}
            <View 
              className={classnames(styles.kanaSection, showAnswer && styles.showKana)}
              onClick={() => {
                setShowAnswer(true);
                speak(currentWord.kana);
              }}
            >
              <Text className={styles.kana}>{currentWord.kana}</Text>
              {config.showRomaji && (
                <Text className={styles.romaji}>{currentWord.romaji}</Text>
              )}
              {!showAnswer && (
                <Text className={styles.kanaHint}>点击显示读音</Text>
              )}
            </View>

            {/* 释义（点击显示） */}
            <View className={styles.meaningSection}>
              {showAnswer ? (
                <>
                  <Text className={styles.meaning}>{currentWord.meaning}</Text>
                  <View className={styles.exampleBox}>
                    <Text className={styles.example}>{currentWord.example}</Text>
                    <Text className={styles.exampleMeaning}>{currentWord.exampleMeaning}</Text>
                  </View>
                </>
              ) : (
                <Text 
                  className={styles.showBtn}
                  onClick={() => setShowAnswer(true)}
                >
                  点击查看释义
                </Text>
              )}
            </View>

            {/* 发音按钮 */}
            {showAnswer && (
              <View className={styles.speakBtn} onClick={speakCurrentWord}>
                <Text className={styles.speakIcon}>🔊</Text>
                <Text className={styles.speakText}>播放发音</Text>
              </View>
            )}
          </View>

          {/* 操作按钮 */}
          {showAnswer && (
            <View className={styles.actionArea}>
              <View 
                className={[styles.actionBtn, styles.forgetBtn]}
                onClick={handleDontKnow}
              >
                <Text className={styles.actionEmoji}>❌</Text>
                <Text className={styles.actionText}>不认识</Text>
              </View>
              <View 
                className={[styles.actionBtn, styles.knowBtn]}
                onClick={handleKnow}
              >
                <Text className={styles.actionEmoji}>✅</Text>
                <Text className={styles.actionText}>认识</Text>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default StudyPage;
