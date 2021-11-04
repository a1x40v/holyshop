FROM node:16.13.0-alpine3.14
RUN apk add --no-cache libc6-compat

USER node
WORKDIR /home/node
COPY package*.json ./
RUN npm install
RUN rm -rf ./node_modules/@next/swc-linux-x64-gnu
COPY . .
EXPOSE 4000

CMD ["npm", "run", "dev"]