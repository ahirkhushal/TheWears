// Dockerfile

// # FROM node:16

// # WORKDIR /app

// # COPY package*.json ./

// # RUN npm install \
// #     && npm install -g nodemon \
// #     && npm install --platform=linuxmusl --arch=x64 sharp

// # COPY . .

// # EXPOSE 2405

// # CMD ["npm", "start"]

//------------------------------------------------------------------------------------------

//docker-compose.yml

// # version: '3'
// # services:
// #   app:
// #     build: .
// #     image: api:v1
// #     restart: always
// #     ports:
// #       - 2405:8080
// #     volumes:
// #       - .:/app
// #     depends_on:
// #       - db
// #     networks:
// #       - application
// #     container_name: backend

// #   db:
// #     image: mongo
// #     restart: always
// #     volumes:
// #       - mongo-data:/data/db
// #     environment:
// #       - MONGO_INITDB_ROOT_USERNAME=${MONGODB_USER}
// #       - MONGO_INITDB_ROOT_PASSWORD=${MONGODB_PASSWORD}
// #     networks:
// #       - application
// #     container_name: mongodb

// # networks:
// #   application:
// #     driver: bridge

// # volumes:
// #   mongo-data:
// #     driver: local
