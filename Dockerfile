# Use the official Node.js 16 image as the base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# RUN npm i vite -g

# Copy package.json and package-lock.json to the container
COPY package.json .

# Install the project dependencies
RUN npm install

# Copy the application code to the container
COPY . .

EXPOSE 5174
VOLUME [ "/app", "/app/node_modules" ]

# Build the application
# RUN npm run build

# Set the command to start the application
CMD ["npm", "run", "dev"]
