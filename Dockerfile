FROM node:16.14.0 as builder
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=builder /usr/local/app/dist/qrcode-frontend /usr/share/nginx/html
EXPOSE 80