# 📦 圖片重命名與模板產生工具

這是一個前端介面工具，提供使用者快速重命名圖片檔案，並根據圖片清單自動產出對應的 HTML / CSS 模板程式碼。  
適合用於網頁切版、Banner 製作、批次命名等場景。

👉 開始使用 [https://pt-huang.github.io/Img2Code/](https://pt-huang.github.io/Img2Code/)

---

## 📸 頁面區塊說明

### 📁 模板產生區

- 可選擇模板類型（例如：元件）
- 上傳圖片後，自動產出：
  - ✅ **HTML 區塊**（含圖片路徑與 class 名）
  - ✅ **CSS 區塊**（含圖片尺寸與定位）
- 提供一鍵複製 HTML / CSS 程式碼功能

---

### 🔤 重新命名區

- 可設定圖片檔案命名規則：
  - 自訂前綴（例如 `BG_`）
  - 命名格式（例如 `01`, `02`, `03`）
  - 起始值（例如從 `1` 開始）
- ✅ 可勾選要重新命名或下載的圖片
- ✅ 可依據檔案類型篩選（例如 `.jpg`, `.png`）
- ✅ 支援拖曳排序圖片
- ✅ 一鍵重新命名後，自動打包下載成 `.zip` 壓縮檔

---

## 🛠 使用技術

| 功能           | 技術與套件                   |
| -------------- | ---------------------------- |
| 前端框架       | `React` + `TypeScript`       |
| 開發工具       | `Vite`                       |
| UI 元件庫      | `shadcn/ui` + `Tailwind CSS` |
| 狀態管理       | `Zustand`                    |
| 拖曳排序       | `dnd-kit`                    |
| 壓縮與檔案下載 | `JSZip` + `FileSaver.js`     |

---
