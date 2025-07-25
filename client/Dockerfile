# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files and install
COPY package*.json ./
RUN npm install

COPY . .

# Build the React app
RUN npm run build

# Serve using a simple static server
RUN npm install -g serve
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]

