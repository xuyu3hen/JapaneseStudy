import React, { useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';

const ReviewPage: React.FC = () => {
  useEffect(() => {
    // 自动跳转到学习页并传入复习模式
    const timer = setTimeout(() => {
      Taro.redirectTo({
        url: '/pages/study/index?mode=review',
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <Text>准备复习中...</Text>
    </View>
  );
};

export default ReviewPage;
