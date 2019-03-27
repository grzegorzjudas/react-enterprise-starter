FROM node:10-alpine

WORKDIR /application
ENV NODE_ENV=production
ENV PORT=80
EXPOSE 80

ADD build/artifact.tar.gz .
CMD node server.js
