# Specify the base image
FROM node:14-alpine

#Create-react-app has two bugs that prevents it from running correctly in a docker container. 
ENV CI=true
ENV WDS_SOCKET_PORT=0


# Set up the working directory
WORKDIR /app

# Copy package.json and install all dependencies
COPY ./package.json ./
RUN npm install

# Copy rest of the files
COPY ./ ./

# Specify the start-up command
CMD ["npm","start"]