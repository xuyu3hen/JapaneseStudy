// ============================================
// 进度环组件
// ============================================

import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;    // 尺寸 (rpx)
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  label?: string;
  showPercent?: boolean;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 160,
  strokeWidth = 12,
  color = '#FF6B9D',
  bgColor = '#F0F0F0',
  label,
  showPercent = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <View className={styles.wrapper} style={{ width: `${size}rpx`, height: `${size}rpx` }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={styles.svg}
      >
        {/* 背景环 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        {/* 进度环 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className={styles.progressCircle}
        />
      </svg>
      <View className={styles.center}>
        {showPercent && (
          <Text className={styles.percent} style={{ color }}>
            {Math.round(progress)}%
          </Text>
        )}
        {label && (
          <Text className={styles.label}>{label}</Text>
        )}
      </View>
    </View>
  );
};

export default ProgressRing;
