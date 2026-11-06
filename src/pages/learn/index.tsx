import { useDidShow } from '@tarojs/taro';
import { View, Text, ScrollView, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect } from 'react';
import classnames from 'classnames';
import { useStudyStore } from '@/store/useStudyStore';
import ProgressRing from '@/components/ProgressRing';
import styles from './index.module.scss';

const LearnPage: React.FC = () => {
  const { 
    config, 
    init, 
    currentWords, 
    progressMap, 
    getNewWords, 
    getReviewWords,
    totalLearned,
    streakDays,
    getProgressByStatus,
  } = useStudyStore();

  useEffect(() => {
    init();
  }, []);

  useDidShow(() => {
    init();
  });

  const progress = getProgressByStatus();
  const reviewWords = getReviewWords(config.dailyReviewWords);
  const newWords = getNewWords(config.dailyNewWords);
  const currentProgress = currentWords.length > 0 
    ? Math.round((totalLearned / currentWords.length) * 100) 
    : 0;

  const startLearn = () => {
    if (newWords.length === 0 && reviewWords.length === 0) {
      Taro.showToast({ title: '今日任务已完成！', icon: 'success' });
      return;
    }
    Taro.navigateTo({ url: '/pages/study/index' });
  };

  const startReview = () => {
    if (reviewWords.length === 0) {
      Taro.showToast({ title: '暂无可复习单词', icon: 'none' });
      return;
    }
    Taro.navigateTo({ url: '/pages/review/index' });
  };

  return (
    <View className={styles.page}>
      {/* 顶部欢迎区域 */}
      <View className={styles.heroSection}>
        <View className={styles.heroBg} />
        <View className={styles.heroContent}>
          <View className={styles.greeting}>
            <Text className={styles.greetingEmoji}>🌸</Text>
            <View>
              <Text className={styles.greetingText}>おはよう！</Text>
              <Text className={styles.greetingSub}>今天也要加油哦</Text>
            </View>
          </View>
          
          {/* 连续学习天数 */}
          <View className={styles.streakCard}>
            <Text className={styles.streakIcon}>🔥</Text>
            <View className={styles.streakInfo}>
              <Text className={styles.streakNumber}>{streakDays}</Text>
              <Text className={styles.streakLabel}>连续学习天数</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 学习进度卡片 */}
      <View className={styles.progressCard}>
        <View className={styles.progressLeft}>
          <ProgressRing
            progress={currentProgress}
            size={160}
            label="词书进度"
            color="#FF6B9D"
          />
        </View>
        <View className={styles.progressRight}>
          <Text className={styles.progressStatsTitle}>学习概况</Text>
          <View className={styles.statsRow}>
            <View className={styles.statItem}>
              <Text className={classnames(styles.statNumber, styles.newColor)}>
                {progress.new}
              </Text>
              <Text className={styles.statLabel}>待学习</Text>
            </View>
            <View className={styles.statItem}>
              <Text className={classnames(styles.statNumber, styles.learningColor)}>
                {progress.learning}
              </Text>
              <Text className={styles.statLabel}>学习中</Text>
            </View>
            <View className={styles.statItem}>
              <Text className={classnames(styles.statNumber, styles.masteredColor)}>
                {progress.mastered}
              </Text>
              <Text className={styles.statLabel}>已掌握</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 五十音图入门 */}
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>🎌 从这里开始</Text>
        <View 
          className={styles.gojuonBanner}
          onClick={() => Taro.navigateTo({ url: '/pages/gojuon/index' })}
        >
          <View className={styles.gojuonContent}>
            <Text className={styles.gojuonTitle}>五十音图</Text>
            <Text className={styles.gojuonDesc}>平假名 · 片假名 · 浊音 · 半浊音</Text>
            <Text className={styles.gojuonAction}>立即开始 →</Text>
          </View>
          <View className={styles.gojuonPreview}>
            <Text className={styles.gojuonChar}>あ</Text>
            <Text className={styles.gojuonChar}>い</Text>
            <Text className={styles.gojuonChar}>う</Text>
            <Text className={styles.gojuonChar}>え</Text>
            <Text className={styles.gojuonChar}>お</Text>
          </View>
        </View>
      </View>

      {/* 今日任务 */}
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>📅 今日任务</Text>
        
        <View className={styles.taskCard}>
          {/* 新单词学习任务 */}
          <View 
            className={classnames(styles.taskItem, newWords.length === 0 && styles.taskDone)}
            onClick={startLearn}
          >
            <View className={styles.taskIcon} style={{ backgroundColor: '#74B9FF20' }}>
              <Text className={styles.taskEmoji}>📖</Text>
            </View>
            <View className={styles.taskInfo}>
              <Text className={styles.taskTitle}>学习新单词</Text>
              <Text className={styles.taskDesc}>
                {newWords.length > 0 
                  ? `还有 ${newWords.length} 个新词待学习` 
                  : '所有新词已学习完成'}
              </Text>
            </View>
            <View className={styles.taskAction}>
              {newWords.length > 0 ? (
                <Text className={styles.taskArrow}>→</Text>
              ) : (
                <Text className={styles.taskCheck}>✓</Text>
              )}
            </View>
          </View>

          {/* 复习任务 */}
          <View 
            className={classnames(styles.taskItem, reviewWords.length === 0 && styles.taskDone)}
            onClick={startReview}
          >
            <View className={styles.taskIcon} style={{ backgroundColor: '#4ECDC420' }}>
              <Text className={styles.taskEmoji}>🔄</Text>
            </View>
            <View className={styles.taskInfo}>
              <Text className={styles.taskTitle}>复习</Text>
              <Text className={styles.taskDesc}>
                {reviewWords.length > 0 
                  ? `有 ${reviewWords.length} 个单词需要复习` 
                  : '今日复习完成'}
              </Text>
            </View>
            <View className={styles.taskAction}>
              {reviewWords.length > 0 ? (
                <Text className={styles.taskArrow}>→</Text>
              ) : (
                <Text className={styles.taskCheck}>✓</Text>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* 快捷入口 */}
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>⚡ 快捷入口</Text>
        <View className={styles.quickGrid}>
          <View className={styles.quickItem} onClick={() => Taro.switchTab({ url: '/pages/books/index' })}>
            <Text className={styles.quickEmoji}>📚</Text>
            <Text className={styles.quickLabel}>词书</Text>
          </View>
          <View className={styles.quickItem} onClick={() => Taro.switchTab({ url: '/pages/stats/index' })}>
            <Text className={styles.quickEmoji}>📊</Text>
            <Text className={styles.quickLabel}>统计</Text>
          </View>
          <View className={styles.quickItem} onClick={() => Taro.switchTab({ url: '/pages/mine/index' })}>
            <Text className={styles.quickEmoji}>⚙️</Text>
            <Text className={styles.quickLabel}>设置</Text>
          </View>
          <View className={styles.quickItem}>
            <Text className={styles.quickEmoji}>🎯</Text>
            <Text className={styles.quickLabel}>目标</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LearnPage;
