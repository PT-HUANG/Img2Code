# 使用官方提供的 Node.js 版本為 20 的映像檔作為基底
FROM node:20

# 設定容器內的工作目錄為 /app（之後的操作都會在這個目錄下進行）
WORKDIR /workspaces/Img2Code

# 複製 package.json 和 package-lock.json 到容器中
# 後面必須要加上 . 指定複製的位置( . 代表剛剛指定的Docker工作目錄 WORKDIR /app)
COPY package*.json .

# 安裝專案相依套件
RUN npm install

# 將專案的所有其他檔案（.js、.ts、.jsx、.tsx、public 等）複製進容器中
# 第一個 . 代表專案在本機的位置，第二個 . 代表專案在工作目錄存放的位置
COPY . .

# 將容器內的 3000 port 開放出來（對應到本機的 port，讓你可以從瀏覽器連線）
EXPOSE 3000

# 設定容器啟動時要執行的指令（這裡是啟動 dev server）
CMD ["npm", "run", "dev"]
