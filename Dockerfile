FROM node:18-alpine as build

WORKDIR /app

COPY medical-prescriptions-ui .
RUN npm install

EXPOSE 3002

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]