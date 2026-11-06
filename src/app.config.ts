export default defineAppConfig({
  pages: [
    'pages/learn/index',
    'pages/gojuon/index',
    'pages/books/index',
    'pages/stats/index',
    'pages/mine/index',
    'pages/study/index',
    'pages/review/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#FF6B9D',
    navigationBarTitleText: '日语学习',
    navigationBarTextStyle: 'white',
    backgroundColor: '#FAFAFA',
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#FF6B9D',
    backgroundColor: '#FFFFFF',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/learn/index',
        text: '学习',
        iconPath: 'assets/tabbar/learn.svg',
        selectedIconPath: 'assets/tabbar/learn-selected.svg',
      },
      {
        pagePath: 'pages/books/index',
        text: '词书',
        iconPath: 'assets/tabbar/books.svg',
        selectedIconPath: 'assets/tabbar/books-selected.svg',
      },
      {
        pagePath: 'pages/stats/index',
        text: '统计',
        iconPath: 'assets/tabbar/stats.svg',
        selectedIconPath: 'assets/tabbar/stats-selected.svg',
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: 'assets/tabbar/mine.svg',
        selectedIconPath: 'assets/tabbar/mine-selected.svg',
      },
    ],
  },
})
