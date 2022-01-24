FROM node:16
WORKDIR /myapp2
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 3001
CMD ["npm" , "run" ,"dev"]

