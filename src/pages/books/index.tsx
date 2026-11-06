import React, { useEffect } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { useStudyStore } from '@/store/useStudyStore';
import { mockWordBooks } from '@/data/books';
import BookCard from '@/components/BookCard';
import styles from './index.module.scss';

const BooksPage: React.FC = () => {
  const { init, config, switchBook, progressMap } = useStudyStore();

  useEffect(() => {
    init();
  }, []);

  useDidShow(() => {
    init();
  });

  const handleSelectBook = (bookId: string) => {
    if (config.defaultBookId !== bookId) {
      Taro.showModal({
        title: '切换词书',
        content: '切换词书后，学习进度将基于新词书重新开始。确定要切换吗？',
        success: (res) => {
          if (res.confirm) {
            switchBook(bookId);
            Taro.showToast({ title: '已切换词书', icon: 'success' });
          }
        },
      });
    }
  };

  // 计算每个词书的已学数量
  const getLearnedCount = (bookId: string) => {
    const book = mockWordBooks.find(b => b.id === bookId);
    if (!book) return 0;
    
    // 实际应该根据词书中的单词进度来算
    // 这里简化处理，因为 mock 数据中 progressMap 只存了被学习过的
    return Object.values(progressMap).filter(
      p => p.status === 'learning' || p.status === 'mastered'
    ).length;
  };

  return (
    <View className={styles.page}>
      {/* 页面标题区域 */}
      <View className={styles.header}>
        <Text className={styles.title}>📚 选择词书</Text>
        <Text className={styles.subtitle}>根据你的目标级别选择合适的词书</Text>
      </View>

      {/* 词书列表 */}
      <View className={styles.bookList}>
        {mockWordBooks.map(book => (
          <BookCard
            key={book.id}
            book={book}
            learnedCount={getLearnedCount(book.id)}
            isSelected={config.defaultBookId === book.id}
            onClick={() => handleSelectBook(book.id)}
          />
        ))}
      </View>

      {/* 学习提示 */}
      <View className={styles.tipsCard}>
        <Text className={styles.tipsTitle}>💡 学习建议</Text>
        <View className={styles.tipsList}>
          <Text className={styles.tipsItem}>• 建议从 N5 基础词汇开始，循序渐进</Text>
          <Text className={styles.tipsItem}>• 每天坚持学习 10-20 个新词</Text>
          <Text className={styles.tipsItem}>• 定期复习已学单词，加深记忆</Text>
          <Text className={styles.tipsItem}>• 结合例句学习，理解单词用法</Text>
        </View>
      </View>
    </View>
  );
};

export default BooksPage;
