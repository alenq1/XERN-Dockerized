FROM node:11.15.0-alpine

WORKDIR /frontend

ENV PATH /frontend/node_modules/.bin:$PATH


COPY ["package.json", "package-lock.json*", "./"]

RUN npm config rm proxy
RUN npm config rm https-proxy
RUN npm config set registry http://registry.npmjs.org/
RUN npm install --verbose
RUN npm install react-scripts --silent

#ENTRYPOINT [ "./entrypoint.sh" ]
#CMD ["npm", "start"]