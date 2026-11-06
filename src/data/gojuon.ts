// ============================================
// 五十音图数据
// ============================================

export interface Kana {
  id: string;
  hiragana: string;    // 平假名
  katakana: string;    // 片假名
  romaji: string;      // 罗马音
  row: number;         // 行 (0-9)
  col: number;         // 列 (0-4)
  group: string;       // 清音/浊音/半浊音/拗音
}

// 五十音图 - 清音
export const gojuonData: Kana[] = [
  // あ行
  { id: 'a', hiragana: 'あ', katakana: 'ア', romaji: 'a', row: 0, col: 0, group: '清音' },
  { id: 'i', hiragana: 'い', katakana: 'イ', romaji: 'i', row: 0, col: 1, group: '清音' },
  { id: 'u', hiragana: 'う', katakana: 'ウ', romaji: 'u', row: 0, col: 2, group: '清音' },
  { id: 'e', hiragana: 'え', katakana: 'エ', romaji: 'e', row: 0, col: 3, group: '清音' },
  { id: 'o', hiragana: 'お', katakana: 'オ', romaji: 'o', row: 0, col: 4, group: '清音' },
  // か行
  { id: 'ka', hiragana: 'か', katakana: 'カ', romaji: 'ka', row: 1, col: 0, group: '清音' },
  { id: 'ki', hiragana: 'き', katakana: 'キ', romaji: 'ki', row: 1, col: 1, group: '清音' },
  { id: 'ku', hiragana: 'く', katakana: 'ク', romaji: 'ku', row: 1, col: 2, group: '清音' },
  { id: 'ke', hiragana: 'け', katakana: 'ケ', romaji: 'ke', row: 1, col: 3, group: '清音' },
  { id: 'ko', hiragana: 'こ', katakana: 'コ', romaji: 'ko', row: 1, col: 4, group: '清音' },
  // さ行
  { id: 'sa', hiragana: 'さ', katakana: 'サ', romaji: 'sa', row: 2, col: 0, group: '清音' },
  { id: 'shi', hiragana: 'し', katakana: 'シ', romaji: 'shi', row: 2, col: 1, group: '清音' },
  { id: 'su', hiragana: 'す', katakana: 'ス', romaji: 'su', row: 2, col: 2, group: '清音' },
  { id: 'se', hiragana: 'せ', katakana: 'セ', romaji: 'se', row: 2, col: 3, group: '清音' },
  { id: 'so', hiragana: 'そ', katakana: 'ソ', romaji: 'so', row: 2, col: 4, group: '清音' },
  // た行
  { id: 'ta', hiragana: 'た', katakana: 'タ', romaji: 'ta', row: 3, col: 0, group: '清音' },
  { id: 'chi', hiragana: 'ち', katakana: 'チ', romaji: 'chi', row: 3, col: 1, group: '清音' },
  { id: 'tsu', hiragana: 'つ', katakana: 'ツ', romaji: 'tsu', row: 3, col: 2, group: '清音' },
  { id: 'te', hiragana: 'て', katakana: 'テ', romaji: 'te', row: 3, col: 3, group: '清音' },
  { id: 'to', hiragana: 'と', katakana: 'ト', romaji: 'to', row: 3, col: 4, group: '清音' },
  // な行
  { id: 'na', hiragana: 'な', katakana: 'ナ', romaji: 'na', row: 4, col: 0, group: '清音' },
  { id: 'ni', hiragana: 'に', katakana: 'ニ', romaji: 'ni', row: 4, col: 1, group: '清音' },
  { id: 'nu', hiragana: 'ぬ', katakana: 'ヌ', romaji: 'nu', row: 4, col: 2, group: '清音' },
  { id: 'ne', hiragana: 'ね', katakana: 'ネ', romaji: 'ne', row: 4, col: 3, group: '清音' },
  { id: 'no', hiragana: 'の', katakana: 'ノ', romaji: 'no', row: 4, col: 4, group: '清音' },
  // は行
  { id: 'ha', hiragana: 'は', katakana: 'ハ', romaji: 'ha', row: 5, col: 0, group: '清音' },
  { id: 'hi', hiragana: 'ひ', katakana: 'ヒ', romaji: 'hi', row: 5, col: 1, group: '清音' },
  { id: 'fu', hiragana: 'ふ', katakana: 'フ', romaji: 'fu', row: 5, col: 2, group: '清音' },
  { id: 'he', hiragana: 'へ', katakana: 'ヘ', romaji: 'he', row: 5, col: 3, group: '清音' },
  { id: 'ho', hiragana: 'ほ', katakana: 'ホ', romaji: 'ho', row: 5, col: 4, group: '清音' },
  // ま行
  { id: 'ma', hiragana: 'ま', katakana: 'マ', romaji: 'ma', row: 6, col: 0, group: '清音' },
  { id: 'mi', hiragana: 'み', katakana: 'ミ', romaji: 'mi', row: 6, col: 1, group: '清音' },
  { id: 'mu', hiragana: 'む', katakana: 'ム', romaji: 'mu', row: 6, col: 2, group: '清音' },
  { id: 'me', hiragana: 'め', katakana: 'メ', romaji: 'me', row: 6, col: 3, group: '清音' },
  { id: 'mo', hiragana: 'も', katakana: 'モ', romaji: 'mo', row: 6, col: 4, group: '清音' },
  // や行
  { id: 'ya', hiragana: 'や', katakana: 'ヤ', romaji: 'ya', row: 7, col: 0, group: '清音' },
  { id: 'yu', hiragana: 'ゆ', katakana: 'ユ', romaji: 'yu', row: 7, col: 2, group: '清音' },
  { id: 'yo', hiragana: 'よ', katakana: 'ヨ', romaji: 'yo', row: 7, col: 4, group: '清音' },
  // ら行
  { id: 'ra', hiragana: 'ら', katakana: 'ラ', romaji: 'ra', row: 8, col: 0, group: '清音' },
  { id: 'ri', hiragana: 'り', katakana: 'リ', romaji: 'ri', row: 8, col: 1, group: '清音' },
  { id: 'ru', hiragana: 'る', katakana: 'ル', romaji: 'ru', row: 8, col: 2, group: '清音' },
  { id: 're', hiragana: 'れ', katakana: 'レ', romaji: 're', row: 8, col: 3, group: '清音' },
  { id: 'ro', hiragana: 'ろ', katakana: 'ロ', romaji: 'ro', row: 8, col: 4, group: '清音' },
  // わ行
  { id: 'wa', hiragana: 'わ', katakana: 'ワ', romaji: 'wa', row: 9, col: 0, group: '清音' },
  { id: 'wo', hiragana: 'を', katakana: 'ヲ', romaji: 'wo', row: 9, col: 4, group: '清音' },
  // ん
  { id: 'n', hiragana: 'ん', katakana: 'ン', romaji: 'n', row: 10, col: 0, group: '拨音' },
];

// 浊音
export const dakuonData: Kana[] = [
  { id: 'ga', hiragana: 'が', katakana: 'ガ', romaji: 'ga', row: 1, col: 0, group: '浊音' },
  { id: 'gi', hiragana: 'ぎ', katakana: 'ギ', romaji: 'gi', row: 1, col: 1, group: '浊音' },
  { id: 'gu', hiragana: 'ぐ', katakana: 'グ', romaji: 'gu', row: 1, col: 2, group: '浊音' },
  { id: 'ge', hiragana: 'げ', katakana: 'ゲ', romaji: 'ge', row: 1, col: 3, group: '浊音' },
  { id: 'go', hiragana: 'ご', katakana: 'ゴ', romaji: 'go', row: 1, col: 4, group: '浊音' },
  { id: 'za', hiragana: 'ざ', katakana: 'ザ', romaji: 'za', row: 2, col: 0, group: '浊音' },
  { id: 'ji', hiragana: 'じ', katakana: 'ジ', romaji: 'ji', row: 2, col: 1, group: '浊音' },
  { id: 'zu', hiragana: 'ず', katakana: 'ズ', romaji: 'zu', row: 2, col: 2, group: '浊音' },
  { id: 'ze', hiragana: 'ぜ', katakana: 'ゼ', romaji: 'ze', row: 2, col: 3, group: '浊音' },
  { id: 'zo', hiragana: 'ぞ', katakana: 'ゾ', romaji: 'zo', row: 2, col: 4, group: '浊音' },
  { id: 'da', hiragana: 'だ', katakana: 'ダ', romaji: 'da', row: 3, col: 0, group: '浊音' },
  { id: 'di', hiragana: 'ぢ', katakana: 'ヂ', romaji: 'ji', row: 3, col: 1, group: '浊音' },
  { id: 'du', hiragana: 'づ', katakana: 'ヅ', romaji: 'zu', row: 3, col: 2, group: '浊音' },
  { id: 'de', hiragana: 'で', katakana: 'デ', romaji: 'de', row: 3, col: 3, group: '浊音' },
  { id: 'do', hiragana: 'ど', katakana: 'ド', romaji: 'do', row: 3, col: 4, group: '浊音' },
  { id: 'ba', hiragana: 'ば', katakana: 'バ', romaji: 'ba', row: 5, col: 0, group: '浊音' },
  { id: 'bi', hiragana: 'び', katakana: 'ビ', romaji: 'bi', row: 5, col: 1, group: '浊音' },
  { id: 'bu', hiragana: 'ぶ', katakana: 'ブ', romaji: 'bu', row: 5, col: 2, group: '浊音' },
  { id: 'be', hiragana: 'べ', katakana: 'ベ', romaji: 'be', row: 5, col: 3, group: '浊音' },
  { id: 'bo', hiragana: 'ぼ', katakana: 'ボ', romaji: 'bo', row: 5, col: 4, group: '浊音' },
];

// 半浊音
export const handakuonData: Kana[] = [
  { id: 'pa', hiragana: 'ぱ', katakana: 'パ', romaji: 'pa', row: 5, col: 0, group: '半浊音' },
  { id: 'pi', hiragana: 'ぴ', katakana: 'ピ', romaji: 'pi', row: 5, col: 1, group: '半浊音' },
  { id: 'pu', hiragana: 'ぷ', katakana: 'プ', romaji: 'pu', row: 5, col: 2, group: '半浊音' },
  { id: 'pe', hiragana: 'ぺ', katakana: 'ペ', romaji: 'pe', row: 5, col: 3, group: '半浊音' },
  { id: 'po', hiragana: 'ぽ', katakana: 'ポ', romaji: 'po', row: 5, col: 4, group: '半浊音' },
];

// 行名称
export const rowNames = ['あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ', 'ん'];

// 合并所有数据
export const allKanaData: Kana[] = [...gojuonData, ...dakuonData, ...handakuonData];
