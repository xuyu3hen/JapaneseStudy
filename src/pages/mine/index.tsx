import React, { useEffect } from 'react';
import { View, Text, Button, ScrollView } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { useStudyStore } from '@/store/useStudyStore';
import { storage, StorageKeys } from '@/utils/storage';
import styles from './index.module.scss';

const MinePage: React.FC = () => {
  const { init, config, setConfig, streakDays, totalLearned, getProgressByStatus } = useStudyStore();

  useEffect(() => {
    init();
  }, []);

  useDidShow(() => {
    init();
  });

  const progress = getProgressByStatus();

  const handleDailyGoalChange = (delta: number) => {
    const newVal = Math.max(5, Math.min(30, config.dailyNewWords + delta));
    setConfig({ dailyNewWords: newVal });
  };

  const handleReviewGoalChange = (delta: number) => {
    const newVal = Math.max(5, Math.min(50, config.dailyReviewWords + delta));
    setConfig({ dailyReviewWords: newVal });
  };

  const handleToggleRomaji = () => {
    setConfig({ showRomaji: !config.showRomaji });
  };

  const handleToggleTTS = () => {
    setConfig({ enableTTS: !config.enableTTS });
  };

  const handleClearData = () => {
    Taro.showModal({
      title: '确认清除',
      content: '确定要清除所有学习数据吗？此操作不可恢复！',
      confirmColor: '#FF6B9D',
      success: (res) => {
        if (res.confirm) {
          storage.remove(StorageKeys.WORD_PROGRESS);
          storage.remove(StorageKeys.CHECKIN_DATES);
          storage.remove(StorageKeys.STREAK_DAYS);
          Taro.showToast({ title: '数据已清除', icon: 'success' });
          setTimeout(() => {
            init();
          }, 1000);
        }
      },
    });
  };

  return (
    <View className={styles.page}>
      {/* 用户头部 */}
      <View className={styles.header}>
        <View className={styles.avatar}>
          <Text className={styles.avatarEmoji}>🎌</Text>
        </View>
        <View className={styles.userInfo}>
          <Text className={styles.username}>日语学习者</Text>
          <Text className={styles.userDesc}>坚持学习，每一天都在进步！</Text>
        </View>
      </View>

      {/* 学习成就 */}
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>🏆 学习成就</Text>
        <View className={styles.achievementCard}>
          <View className={styles.achievementItem}>
            <Text className={styles.achievementIcon}>🔥</Text>
            <Text className={styles.achievementNumber}>{streakDays}</Text>
            <Text className={styles.achievementLabel}>连续天数</Text>
          </View>
          <View className={styles.achievementItem}>
            <Text className={styles.achievementIcon}>📚</Text>
            <Text className={styles.achievementNumber}>{totalLearned}</Text>
            <Text className={styles.achievementLabel}>已学单词</Text>
          </View>
          <View className={styles.achievementItem}>
            <Text className={styles.achievementIcon}>⭐</Text>
            <Text className={styles.achievementNumber}>{progress.mastered}</Text>
            <Text className={styles.achievementLabel}>已掌握</Text>
          </View>
        </View>
      </View>

      {/* 学习设置 */}
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>⚙️ 学习设置</Text>
        <View className={styles.settingCard}>
          {/* 每日新学目标 */}
          <View className={styles.settingItem}>
            <Text className={styles.settingLabel}>每日新学目标</Text>
            <View className={styles.settingControl}>
              <View 
                className={styles.controlBtn}
                onClick={() => handleDailyGoalChange(-5)}
              >
                <Text className={styles.controlBtnText}>-</Text>
              </View>
              <Text className={styles.controlValue}>{config.dailyNewWords}</Text>
              <View 
                className={styles.controlBtn}
                onClick={() => handleDailyGoalChange(5)}
              >
                <Text className={styles.controlBtnText}>+</Text>
              </View>
            </View>
          </View>

          {/* 每日复习目标 */}
          <View className={styles.settingItem}>
            <Text className={styles.settingLabel}>每日复习目标</Text>
            <View className={styles.settingControl}>
              <View 
                className={styles.controlBtn}
                onClick={() => handleReviewGoalChange(-5)}
              >
                <Text className={styles.controlBtnText}>-</Text>
              </View>
              <Text className={styles.controlValue}>{config.dailyReviewWords}</Text>
              <View 
                className={styles.controlBtn}
                onClick={() => handleReviewGoalChange(5)}
              >
                <Text className={styles.controlBtnText}>+</Text>
              </View>
            </View>
          </View>

          {/* 显示罗马音 */}
          <View className={styles.settingItem}>
            <Text className={styles.settingLabel}>显示罗马音</Text>
            <View 
              className={[styles.toggleBtn, config.showRomaji && styles.toggleActive]}
              onClick={handleToggleRomaji}
            >
              <Text className={styles.toggleText}>
                {config.showRomaji ? '开' : '关'}
              </Text>
            </View>
          </View>

          {/* 自动发音 */}
          <View className={styles.settingItem}>
            <Text className={styles.settingLabel}>自动发音</Text>
            <View 
              className={[styles.toggleBtn, config.enableTTS && styles.toggleActive]}
              onClick={handleToggleTTS}
            >
              <Text className={styles.toggleText}>
                {config.enableTTS ? '开' : '关'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* 其他选项 */}
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>📋 其他</Text>
        <View className={styles.menuCard}>
          <View className={styles.menuItem}>
            <Text className={styles.menuIcon}>💡</Text>
            <Text className={styles.menuLabel}>学习技巧</Text>
            <Text className={styles.menuArrow}>›</Text>
          </View>
          <View className={styles.menuItem}>
            <Text className={styles.menuIcon}>📝</Text>
            <Text className={styles.menuLabel}>意见反馈</Text>
            <Text className={styles.menuArrow}>›</Text>
          </View>
          <View className={styles.menuItem}>
            <Text className={styles.menuIcon}>ℹ️</Text>
            <Text className={styles.menuLabel}>关于我们</Text>
            <Text className={styles.menuArrow}>›</Text>
          </View>
        </View>
      </View>

      {/* 危险操作 */}
      <View className={styles.section}>
        <View className={styles.dangerCard}>
          <Text className={styles.dangerTitle}>⚠️ 数据管理</Text>
          <Button 
            className={styles.dangerBtn}
            onClick={handleClearData}
          >
            <Text className={styles.dangerBtnText}>清除所有学习数据</Text>
          </Button>
        </View>
      </View>

      {/* 版本信息 */}
      <View className={styles.versionInfo}>
        <Text className={styles.versionText}>日语学习 v1.0.0</Text>
        <Text className={styles.versionSub}>让日语学习更轻松 🌸</Text>
      </View>
    </View>
  );
};

export default MinePage;
