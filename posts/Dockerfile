#  Specify Base Image 
FROM node:14-alpine

# Set the Project Directory
WORKDIR /app

# Copy the package.json to the location and run npm install
COPY ./package.json ./
RUN npm install

# Copy all of the files -> This way we will not run npm install unless package.json changes
COPY ./ ./

# Start-up Command
CMD ["npm", "start"]