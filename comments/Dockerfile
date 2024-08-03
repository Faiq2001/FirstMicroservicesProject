# Download the base image
FROM node:14-alpine

# Setup the working directory
WORKDIR /app

# Copy the package.json and install all the dependencies
COPY ./package.json ./
RUN npm install

# Copy rest of the files
COPY ./ ./

# Start-up command
CMD ["npm","start"]