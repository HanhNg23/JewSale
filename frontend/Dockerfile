# build environment
FROM node:20-alpine as build

WORKDIR /app

COPY frontend/package.json /app/package.json

RUN npm install

COPY frontend /app

RUN npm run build

# production environment
FROM nginx:1.25.5-alpine

COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]