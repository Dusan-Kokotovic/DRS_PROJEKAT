FROM node:16.13

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

COPY . .
COPY /drs-front/public/index.html ./

CMD ["npm","run","start"]
