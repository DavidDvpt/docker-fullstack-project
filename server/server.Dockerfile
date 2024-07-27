ARG NODE_VERSION=20.15.1

FROM  --platform=arm64 node:${NODE_VERSION}-alpine AS server

WORKDIR /server

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]