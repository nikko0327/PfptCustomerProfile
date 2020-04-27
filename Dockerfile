FROM node:alpine3.10
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json package.json
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
	&& npm cache clean --force \
    && apk del .gyp
COPY . .
EXPOSE 3001
CMD [ "node", "app.js" ]
