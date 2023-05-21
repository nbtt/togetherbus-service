# Base image
FROM node:18-alpine

# Bundle app source
COPY --chown=node:node ./ /usr/src/app

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
ENV YARN_CACHE_FOLDER=/root/.cache/yarn
RUN --mount=type=cache,target=/root/.cache/yarn yarn install --ignore-engines

# Creates a "dist" folder with the production build
RUN yarn build

# Start the server using the production build
CMD [ "yarn", "start:prod" ]
