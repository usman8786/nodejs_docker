const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Testing Swagger Documentation',
      version: '1.0.0',
      description: 'API documentation for my project',
    },
    servers: [
      {
        url: 'http://localhost:3000/', // Replace with your server URL
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Specify the path to your route files
};

// Initialize Swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  serveSwagger: swaggerUi.serve,
  setupSwagger: swaggerUi.setup(swaggerSpec),
};
