FROM node:16.14-buster

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --pure-lockfile

COPY . .

ENV PORT 9008 

ENV HOST 0.0.0.0

RUN yarn build

EXPOSE 9008

CMD ["yarn", "start"]
