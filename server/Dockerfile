FROM node:16-alpine 
WORKDIR /server 
COPY package.json . 
RUN npm i 
RUN npm install mysql --save
COPY . . 
CMD [ "npm", "start" ]