
# Specify a base image
FROM node:16-alpine as builder

WORKDIR '/app'
COPY . .
RUN yarn install
#RUN yarn start
CMD ["yarn", "start"]
