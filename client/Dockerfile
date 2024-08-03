# Specify the base image
FROM node:14-alpine

# Set up the working directory
WORKDIR /app

# Copy package.json and install all dependencies
COPY ./package.json ./
RUN npm install

# Copy rest of the files
COPY ./ ./

# Specify the start-up command
CMD ["npm","start"]