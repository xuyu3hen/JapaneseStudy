// ============================================
// 词书卡片组件
// ============================================

import React from 'react';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import type { WordBook } from '@/types/book';
import styles from './index.module.scss';

interface BookCardProps {
  book: WordBook;
  learnedCount?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  learnedCount = 0,
  isSelected = false,
  onClick,
}) => {
  const progress = book.totalWords > 0 
    ? Math.round((learnedCount / book.totalWords) * 100) 
    : 0;

  return (
    <View 
      className={classnames(styles.card, isSelected && styles.selected)}
      onClick={onClick}
    >
      {/* 背景装饰 */}
      <View className={styles.bgDeco} style={{ backgroundColor: book.color + '20' }} />
      
      {/* 图标和等级 */}
      <View className={styles.header}>
        <Text className={styles.icon}>{book.icon}</Text>
        <View className={styles.levelBadge} style={{ backgroundColor: book.color }}>
          <Text className={styles.levelText}>{book.level}</Text>
        </View>
      </View>

      {/* 名称和描述 */}
      <Text className={styles.name}>{book.name}</Text>
      <Text className={styles.desc}>{book.description}</Text>

      {/* 底部进度 */}
      <View className={styles.footer}>
        <View className={styles.progressBar}>
          <View 
            className={styles.progressFill}
            style={{ width: `${progress}%`, backgroundColor: book.color }}
          />
        </View>
        <Text className={styles.progressText}>
          {learnedCount}/{book.totalWords} 已学
        </Text>
      </View>

      {isSelected && (
        <View className={styles.selectedTag}>
          <Text className={styles.selectedText}>当前选择</Text>
        </View>
      )}
    </View>
  );
};

export default BookCard;
