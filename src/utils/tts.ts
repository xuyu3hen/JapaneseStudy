// ============================================
// TTS 发音工具（使用浏览器/小程序内置 TTS）
// ============================================

import Taro from '@tarojs/taro';

let audioContext: Taro.InnerAudioContext | null = null;

function getAudioContext(): Taro.InnerAudioContext {
  if (!audioContext) {
    audioContext = Taro.createInnerAudioContext();
    audioContext.onError((res) => {
      console.error('[TTS] Audio error:', res);
    });
  }
  return audioContext;
}

/**
 * 使用在线 TTS 朗读日语
 * 使用 Google TTS API（免费，适用于小程序环境）
 */
export function speak(text: string, onEnd?: () => void): void {
  if (!text) return;

  try {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=ja&client=tw-ob`;
    const ctx = getAudioContext();

    ctx.src = url;
    ctx.onEnded(() => {
      onEnd?.();
    });
    ctx.play();
  } catch (e) {
    console.error('[TTS] speak error:', e);
  }
}

/**
 * 停止朗读
 */
export function stopSpeak(): void {
  if (audioContext) {
    audioContext.stop();
  }
}

/**
 * 朗读单词（包含假名和例句）
 */
export function speakWord(kana: string, example?: string): void {
  speak(kana);
  if (example) {
    setTimeout(() => {
      speak(example);
    }, 1500);
  }
}
