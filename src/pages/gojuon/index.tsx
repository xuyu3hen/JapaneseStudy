import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { gojuonData, dakuonData, handakuonData, rowNames } from '@/data/gojuon';
import { speak } from '@/utils/tts';
import type { Kana } from '@/data/gojuon';
import styles from './index.module.scss';

type ViewMode = 'hiragana' | 'katakana' | 'both';
type TabType = 'gojuon' | 'dakuon' | 'handakuon' | 'practice';

const GojuonPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('gojuon');
  const [viewMode, setViewMode] = useState<ViewMode>('hiragana');
  const [selectedKana, setSelectedKana] = useState<Kana | null>(null);

  // 练习模式状态
  const [practiceMode, setPracticeMode] = useState<'kana-to-romaji' | 'romaji-to-kana'>('kana-to-romaji');
  const [practiceQuestion, setPracticeQuestion] = useState<Kana | null>(null);
  const [practiceOptions, setPracticeOptions] = useState<string[]>([]);
  const [practiceResult, setPracticeResult] = useState<'correct' | 'wrong' | null>(null);
  const [practiceScore, setPracticeScore] = useState({ correct: 0, total: 0 });

  const currentData = useMemo(() => {
    switch (activeTab) {
      case 'gojuon': return gojuonData;
      case 'dakuon': return dakuonData;
      case 'handakuon': return handakuonData;
      default: return gojuonData;
    }
  }, [activeTab]);

  const generateQuestion = useMemo(() => {
    return () => {
      const data = [...gojuonData, ...dakuonData, ...handakuonData];
      const correct = data[Math.floor(Math.random() * data.length)];
      
      // 生成选项
      if (practiceMode === 'kana-to-romaji') {
        const wrongOptions = data
          .filter(k => k.id !== correct.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(k => k.romaji);
        const options = [...wrongOptions, correct.romaji].sort(() => Math.random() - 0.5);
        setPracticeOptions(options);
      } else {
        const wrongOptions = data
          .filter(k => k.id !== correct.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(k => k.hiragana);
        const options = [...wrongOptions, correct.hiragana].sort(() => Math.random() - 0.5);
        setPracticeOptions(options);
      }
      
      setPracticeQuestion(correct);
      setPracticeResult(null);
    };
  }, [practiceMode]);

  useEffect(() => {
    if (activeTab === 'practice') {
      generateQuestion();
    }
  }, [activeTab, practiceMode]);

  const handleKanaClick = (kana: Kana) => {
    setSelectedKana(kana);
    speak(kana.hiragana);
  };

  const handlePracticeAnswer = (answer: string) => {
    if (!practiceQuestion || practiceResult) return;
    
    const correctAnswer = practiceMode === 'kana-to-romaji' 
      ? practiceQuestion.romaji 
      : practiceQuestion.hiragana;
    
    const isCorrect = answer === correctAnswer;
    setPracticeResult(isCorrect ? 'correct' : 'wrong');
    setPracticeScore(s => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      total: s.total + 1,
    }));
  };

  const nextQuestion = () => {
    generateQuestion();
  };

  const renderKanaGrid = (data: Kana[]) => {
    // 按行分组
    const rows: Kana[][] = [];
    let currentRow = -1;
    
    data.forEach(kana => {
      if (kana.row !== currentRow) {
        currentRow = kana.row;
        rows.push([]);
      }
      rows[rows.length - 1].push(kana);
    });

    return (
      <View className={styles.grid}>
        {rows.map((row, rowIdx) => (
          <View key={rowIdx} className={styles.gridRow}>
            {/* 行标 */}
            <View className={styles.rowLabel}>
              <Text className={styles.rowLabelText}>{rowNames[row[0].row]}</Text>
            </View>
            {/* 5个假名 */}
            <View className={styles.rowCells}>
              {[0, 1, 2, 3, 4].map(col => {
                const kana = row.find(k => k.col === col);
                return (
                  <View
                    key={col}
                    className={classnames(
                      styles.kanaCell,
                      !kana && styles.kanaCellEmpty,
                      selectedKana?.id === kana?.id && styles.kanaCellSelected,
                    )}
                    onClick={() => kana && handleKanaClick(kana)}
                  >
                    {kana ? (
                      <>
                        {viewMode !== 'katakana' && (
                          <Text className={styles.kanaHiragana}>{kana.hiragana}</Text>
                        )}
                        {viewMode === 'both' && <View className={styles.kanaDivider} />}
                        {viewMode !== 'hiragana' && (
                          <Text className={styles.kanaKatakana}>{kana.katakana}</Text>
                        )}
                        <Text className={styles.kanaRomaji}>{kana.romaji}</Text>
                      </>
                    ) : null}
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View className={styles.page}>
      {/* Tab 切换 */}
      <ScrollView scrollX className={styles.tabBar}>
        {[
          { key: 'gojuon', label: '清音' },
          { key: 'dakuon', label: '浊音' },
          { key: 'handakuon', label: '半浊音' },
          { key: 'practice', label: '练习' },
        ].map(tab => (
          <View
            key={tab.key}
            className={classnames(styles.tabItem, activeTab === tab.key && styles.tabItemActive)}
            onClick={() => {
              setActiveTab(tab.key as TabType);
              setSelectedKana(null);
            }}
          >
            <Text className={classnames(styles.tabText, activeTab === tab.key && styles.tabTextActive)}>
              {tab.label}
            </Text>
          </View>
        ))}
      </ScrollView>

      {activeTab !== 'practice' && (
        <>
          {/* 显示模式切换 */}
          <View className={styles.modeSwitch}>
            {[
              { key: 'hiragana', label: '平假名' },
              { key: 'katakana', label: '片假名' },
              { key: 'both', label: '对比' },
            ].map(mode => (
              <View
                key={mode.key}
                className={classnames(styles.modeBtn, viewMode === mode.key && styles.modeBtnActive)}
                onClick={() => setViewMode(mode.key as ViewMode)}
              >
                <Text className={classnames(styles.modeText, viewMode === mode.key && styles.modeTextActive)}>
                  {mode.label}
                </Text>
              </View>
            ))}
          </View>

          {/* 假名表格 */}
          <View className={styles.gridContainer}>
            {renderKanaGrid(currentData)}
          </View>

          {/* 选中假名详情 */}
          {selectedKana && (
            <View className={styles.kanaDetail} onClick={() => speak(selectedKana.hiragana)}>
              <View className={styles.detailBig}>
                <Text className={styles.detailKana}>{selectedKana.hiragana}</Text>
                <Text className={styles.detailKanaKatakana}>{selectedKana.katakana}</Text>
              </View>
              <Text className={styles.detailRomaji}>{selectedKana.romaji.toUpperCase()}</Text>
              <Text className={styles.detailHint}>点击播放发音 🔊</Text>
            </View>
          )}
        </>
      )}

      {activeTab === 'practice' && (
        <View className={styles.practiceContainer}>
          {/* 练习模式切换 */}
          <View className={styles.practiceModeSwitch}>
            <View
              className={classnames(
                styles.practiceModeBtn,
                practiceMode === 'kana-to-romaji' && styles.practiceModeBtnActive,
              )}
              onClick={() => setPracticeMode('kana-to-romaji')}
            >
              <Text className={styles.practiceModeText}>看假名选罗马音</Text>
            </View>
            <View
              className={classnames(
                styles.practiceModeBtn,
                practiceMode === 'romaji-to-kana' && styles.practiceModeBtnActive,
              )}
              onClick={() => setPracticeMode('romaji-to-kana')}
            >
              <Text className={styles.practiceModeText}>看罗马音选假名</Text>
            </View>
          </View>

          {/* 得分 */}
          <View className={styles.scoreCard}>
            <Text className={styles.scoreText}>
              {practiceScore.correct} / {practiceScore.total}
            </Text>
            <Text className={styles.scoreLabel}>当前得分</Text>
          </View>

          {/* 题目 */}
          {practiceQuestion && (
            <View className={styles.questionCard}>
              {practiceMode === 'kana-to-romaji' ? (
                <View className={styles.questionKana}>
                  <Text className={styles.questionBig}>{practiceQuestion.hiragana}</Text>
                  <Text className={styles.questionKatakana}>{practiceQuestion.katakana}</Text>
                </View>
              ) : (
                <Text className={styles.questionRomaji}>{practiceQuestion.romaji.toUpperCase()}</Text>
              )}
              <Text className={styles.questionHint}>选择正确答案</Text>
            </View>
          )}

          {/* 选项 */}
          <View className={styles.optionsGrid}>
            {practiceOptions.map((option, idx) => {
              const correctAnswer = practiceQuestion
                ? (practiceMode === 'kana-to-romaji' ? practiceQuestion.romaji : practiceQuestion.hiragana)
                : '';
              const isCorrect = practiceResult && option === correctAnswer;
              const isWrong = practiceResult === 'wrong' && option === correctAnswer;
              
              return (
                <View
                  key={idx}
                  className={classnames(
                    styles.optionBtn,
                    isCorrect && styles.optionCorrect,
                    practiceResult === 'wrong' && option !== correctAnswer && styles.optionDisabled,
                    practiceResult === 'correct' && option !== correctAnswer && styles.optionDisabled,
                  )}
                  onClick={() => handlePracticeAnswer(option)}
                >
                  <Text className={styles.optionText}>{option}</Text>
                </View>
              );
            })}
          </View>

          {/* 结果/下一题 */}
          {practiceResult && (
            <View className={styles.resultArea}>
              <Text className={classnames(
                styles.resultText,
                practiceResult === 'correct' ? styles.resultCorrect : styles.resultWrong,
              )}>
                {practiceResult === 'correct' ? '✓ 正确！' : `✗ 正确答案是 ${practiceMode === 'kana-to-romaji' ? practiceQuestion?.romaji : practiceQuestion?.hiragana}`}
              </Text>
              <View className={styles.nextBtn} onClick={nextQuestion}>
                <Text className={styles.nextBtnText}>下一题 →</Text>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default GojuonPage;
