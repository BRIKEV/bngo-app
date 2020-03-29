FROM node:12.16.1-alpine3.11

# In order to run node alpine avoiding Python error
RUN apk --no-cache add --virtual builds-deps build-base python

# Create app directory
WORKDIR /usr/src/app

# Frontend
# create folders
RUN mkdir frontend

# Install app dependencies
COPY frontend/package*.json ./frontend/

RUN cd frontend && npm install && cd ..

# Bundle app source
COPY frontend/ ./frontend/

# # bundle frontend files
RUN cd frontend &&  npm run build && cd ..

# Backend
## Install app dependencies
COPY backend/package*.json ./

RUN npm install

## Bundle app source
COPY backend/ ./

EXPOSE 3000

CMD ["npm", "start" ]
