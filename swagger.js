const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Books API",
        description: "An API to create , update, delete and get books and authors from a MongoDB database."
    },
    host: "localhost:8080", //change when deploying to Render
    schemes: ["http", "https"]
}

const outputFile = "./swagger.json";
const endpointFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointFiles, doc);