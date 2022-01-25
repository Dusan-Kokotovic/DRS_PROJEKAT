FROM node:16.13
WORKDIR /drs-front
ENV PATH /drs-front/node_modules/.bin:$PATH
COPY /drs-front/package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./
CMD ["npm", "start"]
