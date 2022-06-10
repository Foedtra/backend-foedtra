ARG NODE_VERSION=12
FROM node:${NODE_VERSION}-alpine

# moving to working direktory
WORKDIR /usr/src/app

ENV PORT 8080

EXPOSE ${PORT}

# Copy package.json and install node modules
COPY package.json .
RUN npm install

# Add app source code
ADD . /usr/src/app
# Set the entrypoint
ENTRYPOINT npm run start