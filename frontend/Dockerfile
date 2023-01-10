FROM node:14.9
 
WORKDIR /opt/app/frontend
 
COPY package*.json ./
 
RUN npm install
 
COPY . .
 
CMD [ "npm", "start" ]