#FROM fesco/ubuntu:v1
#RUN chmod 755 /usr/bin/wkhtmltopdf
#WORKDIR /app
#CMD npm run server:docker

FROM node:16
# Установите рабочую директорию
WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "dev"]
