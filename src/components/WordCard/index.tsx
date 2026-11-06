// ============================================
// 单词卡片组件
// ============================================

import React from 'react';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import type { Word } from '@/types/word';
import styles from './index.module.scss';

interface WordCardProps {
  word: Word;
  showExample?: boolean;
  showRomaji?: boolean;
  compact?: boolean;
  onSpeak?: () => void;
}

const WordCard: React.FC<WordCardProps> = ({
  word,
  showExample = true,
  showRomaji = true,
  compact = false,
}) => {
  return (
    <View className={classnames(styles.card, compact && styles.compact)}>
      {/* 汉字和假名 */}
      <View className={styles.mainRow}>
        {word.kanji && (
          <Text className={styles.kanji}>{word.kanji}</Text>
        )}
        <Text className={styles.kana}>{word.kana}</Text>
      </View>

      {/* 罗马音 */}
      {showRomaji && (
        <Text className={styles.romaji}>{word.romaji}</Text>
      )}

      {/* 释义 */}
      <Text className={styles.meaning}>{word.meaning}</Text>

      {/* 例句 */}
      {showExample && !compact && word.example && (
        <View className={styles.exampleSection}>
          <View className={styles.exampleDivider} />
          <Text className={styles.example}>{word.example}</Text>
          <Text className={styles.exampleMeaning}>{word.exampleMeaning}</Text>
        </View>
      )}
    </View>
  );
};

export default WordCard;
