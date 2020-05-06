# Use the official image as a parent image.
FROM node:14.1.0-stretch

# Set the working directory.
WORKDIR /usr/src/app

# This container must be run with a bind mount

EXPOSE 80


ENTRYPOINT /bin/bash
# CMD npm run dev

