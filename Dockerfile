FROM node:20-alpine AS build-stage

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ARG VITE_APPLICATION_HOST
ARG VITE_API_HOST
ARG VITE_AUTH0_CLIENT_ID
ARG VITE_AUTH0_DOMAIN

ENV VITE_APPLICATION_HOST=$VITE_APPLICATION_HOST
ENV VITE_API_HOST=$VITE_API_HOST
ENV VITE_AUTH0_CLIENT_ID=$VITE_AUTH0_CLIENT_ID
ENV VITE_AUTH0_DOMAIN=$VITE_AUTH0_DOMAIN

RUN npm run build

FROM nginx:alpine

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
