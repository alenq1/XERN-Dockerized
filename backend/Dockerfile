FROM node:16.9.0-alpine

RUN apk --no-cache add curl

WORKDIR /backend

ENV PATH /backend/node_modules/.bin:$PATH

COPY ["package.json", "package-lock.json*", "./"]

RUN npm config rm proxy && npm config rm https-proxy
RUN npm config set registry http://registry.npmjs.org/
RUN npm install --verbose
#RUN addgroup -S appgroup && adduser -S appuser -G appgroup
#RUN chown -R node:node /backend/* 
USER node



#ENTRYPOINT [ "./entrypoint.sh" ]
#CMD ["npm", "start"]