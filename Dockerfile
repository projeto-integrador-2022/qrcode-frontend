#Essa linha pega a versao e o modelo da imagem
FROM node:16.14.0 as builder
#Aqui fica setado a pasta destino que faz a copia
WORKDIR /usr/local/app
#Aqui Faz a copia
COPY ./ /usr/local/app/
#instalando o Npm
RUN npm install
#Essa linha faz o update do npm
RUN npm update -g
RUN npm run build
#instalando o Nginx
FROM nginx:latest
#copiando do arquivo para uma pasta na memoria.
COPY --from=builder /usr/local/app/dist/qrcode-frontend /usr/share/nginx/html
EXPOSE 4200:4200