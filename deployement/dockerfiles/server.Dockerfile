# deployment/dockerfiles/server.Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY server/package*.json ./
RUN npm install --production
COPY server/ ./
CMD ["node", "server.js"]
