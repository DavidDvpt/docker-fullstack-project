ARG NODE_VERSION=20.15.1

FROM --platform=arm64 node:${NODE_VERSION}-alpine AS client

WORKDIR /client

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run dev"]