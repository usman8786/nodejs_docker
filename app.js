const express = require('express');
const app = express();
const mongoose = require('mongoose');
const http = require("http");
const server = http.createServer(app);
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const postsRoutes = require('./routes/post');
const accessControls = require('./middleware/accessControls');
const errorHandler = require('./middleware/errorHandler');
const errorMessage = require('./middleware/errorMessage');
const { serveSwagger, setupSwagger } = require('./swagger-config'); // Update with your Swagger configuration file

app.use(cors());
// to support JSON-encoded bodies
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const mongoCon = process.env.mongoCon
mongoose.connect(mongoCon, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'NodeJS server is running'
  });
});

app.use("/user", postsRoutes);
app.use("/post", postsRoutes);

// Serve Swagger API documentation
app.use('/api-docs', serveSwagger, setupSwagger);

app.use(errorHandler);
app.use(accessControls);
app.use(errorMessage);

app.set("port", process.env.PORT);
server.listen(app.get("port"));
console.log("listening on port", app.get("port"));