# backend/Dockerfile

# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Expose backend port
EXPOSE 5000

# Start the backend
CMD ["npm", "start"]
