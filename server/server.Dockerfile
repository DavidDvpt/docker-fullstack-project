ARG NODE_VERSION=20

# Use the official Node.js image as the base image
FROM node:${NODE_VERSION}
# Set the working directory in the container
WORKDIR /app/server

# Install dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["npm", "run", "dev"]