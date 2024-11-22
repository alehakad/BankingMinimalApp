FROM node:slim

ENV NODE_ENV=development

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5000

CMD ["node", "src/app.js"]

