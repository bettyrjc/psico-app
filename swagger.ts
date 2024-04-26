const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Psico app API",
    version: "1.0.0",
    description: "backend for psico app",
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/domain/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
