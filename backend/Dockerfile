FROM node:18

WORKDIR /app


COPY package*.json ./

# Install dependencies trong môi trường Linux (ở đây là container)
RUN npm install

# Copy code vào container
COPY . .

EXPOSE 4000

CMD ["node", "server.js"]
