FROM node:6

ENV PORT 3000
EXPOSE 3000

ENV APP_DIR /app/
WORKDIR $APP_DIR

ADD package.json yarn.lock $APP_DIR
RUN yarn

ADD . $APP_DIR
RUN npm run build

CMD npm start
