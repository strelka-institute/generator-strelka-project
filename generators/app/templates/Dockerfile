FROM node:8

ENV NPM_CONFIG_PRODUCTION false
ENV NODE_ENV production
ENV APP_DIR /app/
WORKDIR $APP_DIR

ADD package.json yarn.lock $APP_DIR
RUN yarn

ADD . $APP_DIR
RUN npm run build

CMD npm start
