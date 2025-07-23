FROM node:20
WORKDIR /workspaces/Img2Code
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
