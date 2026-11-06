import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import { useStudyStore } from '@/store/useStudyStore';
import ProgressRing from '@/components/ProgressRing';
import dayjs from 'dayjs';
import styles from './index.module.scss';

const StatsPage: React.FC = () => {
  const { init, streakDays, getCheckinDates, totalLearned, currentWords, getProgressByStatus } = useStudyStore();
  const [checkinDates, setCheckinDates] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  useEffect(() => {
    init();
    const dates = getCheckinDates();
    setCheckinDates(dates);
  }, []);

  const progress = getProgressByStatus();
  const masteredCount = progress.mastered;
  const learningCount = progress.learning;
  const totalProgress = currentWords.length > 0 
    ? Math.round((masteredCount / currentWords.length) * 100) 
    : 0;

  // 生成日历数据
  const generateCalendarDays = () => {
    const startOfMonth = currentMonth.startOf('month');
    const endOfMonth = currentMonth.endOf('month');
    const daysInMonth = endOfMonth.date();
    const startDayOfWeek = startOfMonth.day();
    
    const days: Array<{ date: string; day: number; isChecked: boolean; isToday: boolean; isFuture: boolean }> = [];
    
    // 填充前导空白
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push({ date: '', day: 0, isChecked: false, isToday: false, isFuture: false });
    }
    
    const today = dayjs();
    
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = currentMonth.date(i).format('YYYY-MM-DD');
      days.push({
        date: dateStr,
        day: i,
        isChecked: checkinDates.includes(dateStr),
        isToday: today.format('YYYY-MM-DD') === dateStr,
        isFuture: dayjs(dateStr).isAfter(today),
      });
    }
    
    return days;
  };

  const prevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <View className={styles.page}>
      {/* 顶部统计卡片 */}
      <View className={styles.topSection}>
        <View className={styles.statsHeader}>
          <Text className={styles.statsTitle}>📊 学习统计</Text>
        </View>

        <View className={styles.mainStats}>
          {/* 连续天数 */}
          <View className={styles.mainStatItem}>
            <View className={styles.mainStatIcon}>🔥</View>
            <Text className={styles.mainStatNumber}>{streakDays}</Text>
            <Text className={styles.mainStatLabel}>连续天数</Text>
          </View>

          {/* 分割线 */}
          <View className={styles.mainStatDivider} />

          {/* 累计学习 */}
          <View className={styles.mainStatItem}>
            <View className={styles.mainStatIcon}>📖</View>
            <Text className={styles.mainStatNumber}>{totalLearned}</Text>
            <Text className={styles.mainStatLabel}>累计学习</Text>
          </View>

          {/* 分割线 */}
          <View className={styles.mainStatDivider} />

          {/* 已掌握 */}
          <View className={styles.mainStatItem}>
            <View className={styles.mainStatIcon}>⭐</View>
            <Text className={styles.mainStatNumber}>{masteredCount}</Text>
            <Text className={styles.mainStatLabel}>已掌握</Text>
          </View>
        </View>
      </View>

      {/* 总体进度 */}
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>🎯 总体进度</Text>
        <View className={styles.progressCard}>
          <ProgressRing
            progress={totalProgress}
            size={200}
            label="完成度"
            color="#6C5CE7"
          />
          <View className={styles.progressDetail}>
            <View className={styles.progressItem}>
              <View className={[styles.progressDot, { backgroundColor: '#00B894' }]} />
              <Text className={styles.progressLabel}>已掌握</Text>
              <Text className={styles.progressValue}>{masteredCount}</Text>
            </View>
            <View className={styles.progressItem}>
              <View className={[styles.progressDot, { backgroundColor: '#FDCB6E' }]} />
              <Text className={styles.progressLabel}>学习中</Text>
              <Text className={styles.progressValue}>{learningCount}</Text>
            </View>
            <View className={styles.progressItem}>
              <View className={[styles.progressDot, { backgroundColor: '#74B9FF' }]} />
              <Text className={styles.progressLabel}>未学习</Text>
              <Text className={styles.progressValue}>
                {currentWords.length - masteredCount - learningCount}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* 打卡日历 */}
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>📅 打卡日历</Text>
        
        <View className={styles.calendarCard}>
          {/* 月份切换 */}
          <View className={styles.calendarHeader}>
            <Text className={styles.monthNav} onClick={prevMonth}>‹</Text>
            <Text className={styles.monthTitle}>
              {currentMonth.format('YYYY年 MM月')}
            </Text>
            <Text className={styles.monthNav} onClick={nextMonth}>›</Text>
          </View>

          {/* 星期标题 */}
          <View className={styles.weekDayRow}>
            {weekDays.map((day, idx) => (
              <Text 
                key={day} 
                className={[
                  styles.weekDay,
                  idx === 0 && styles.weekDaySun,
                  idx === 6 && styles.weekDaySat,
                ]}
              >
                {day}
              </Text>
            ))}
          </View>

          {/* 日期网格 */}
          <View className={styles.calendarGrid}>
            {calendarDays.map((day, idx) => (
              <View 
                key={idx}
                className={[
                  styles.calendarDay,
                  day.isChecked && styles.dayChecked,
                  day.isToday && styles.dayToday,
                  day.isFuture && styles.dayFuture,
                ].filter(Boolean).join(' ')}
              >
                {day.day > 0 && (
                  <>
                    <Text className={styles.dayNumber}>{day.day}</Text>
                    {day.isChecked && <Text className={styles.dayCheck}>✓</Text>}
                  </>
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default StatsPage;
