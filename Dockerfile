# Use an existing node image as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json file to the container
COPY package.json .

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Specify the command to run when the container starts
CMD ["npm", "start"]
