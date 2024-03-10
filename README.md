# StockDashboard

## 專案簡介

這是一個實作了類似財報狗的股票分析網站。

使用 React 和 NextJS 框架

UI 元件使用 MUI (Material-UI)

狀態管理上使用了 Redux Toolkit

圖表使用 ECharts

時間計算使用 date-fns

## 專案架構
```
├── src/
│   ├── components/        # React元件
│   ├── pages/             # Next.js頁面
│   ├── store/             # Redux狀態管理
│   ├── style/            # 樣式與主題設定
│   ├── utils/             # 共用的工具函數
├── .env.local             # 放置本地環境變數
├── next.config.js         # Next.js配置文件
├── README.md              # 專案說明文件
```

## 開發環境設置
Node 版本: 18 或 20

安裝相依套件：
``` bash
npm install
```

設定環境變數：

在根目錄下建立 .env.local 文件，並添加 finmind API 金鑰：
``` env
API_TOKEN=your_api_key_here
```

啟動開發伺服器：
``` bash
npm run dev
```
透過瀏覽器訪問 http://localhost:3000/analysis/{stockCode}

即可預覽專案。

例如: http://localhost:3000/analysis/2330 台積電


## 部署
部屬至 Vercel 上
https://stock-dashboard-eta.vercel.app/analysis/2330

## 補充 & 已知情況
* 如文件需求指示，Menu 只有視覺功能而已
* 如設計圖所示，每月營收、詳細數據按鈕，只有留一個單一個Button Group
* 仿照財報狗用路由控制要查詢的股票代碼，不過目前並沒有針對非法股票代碼做檢查與處理
* 部分回傳資料有異常時，沒有額外做 edge case 處理
* 股票名稱從api取得，顯示得比較慢