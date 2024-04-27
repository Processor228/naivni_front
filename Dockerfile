# Use a Node.js base image
FROM node:18-alpine3.17 as build

# Update and install dependencies
RUN apk update && apk upgrade && adduser -D svelteuser

# Set the working directory
WORKDIR /app

# Copy the project files into the container
COPY --chown=svelteuser:svelteuser . /app

# Install dependencies and build the project
RUN npm install && npm run build

# Use a lightweight Node.js base image for the final stage
FROM node:18-alpine3.17

# Copy the build artifacts from the build stage
COPY --from=build /app/public /app/public
COPY --from=build /app/build /app/build

# Set the working directory
WORKDIR /app

# Expose the port your app runs on
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
