FROM node:16.13

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

COPY /public/index.html ./
COPY . .

CMD ["npm","run","start"]
