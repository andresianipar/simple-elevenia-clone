FROM node:16

WORKDIR /home/app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run db:create
# RUN npm run db:migrate
# RUN npm run db:seed:all

EXPOSE 8080
CMD [ "npm", "start" ]
