// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const Route = require("./Routes/route")
dotenv.config(); 

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);
// Import routes
const authRoutes = require('./routes/authRoutes');
const plotRoutes = require('./routes/plotRoutes');

// Use routes
app.use('/auth', authRoutes);
app.use("/api", Route)
app.use('/api/plots', plotRoutes);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Plot API",
      version: "1.0.0",
      description: "APIs for managing plots",
    },
    servers: [
      {
        url: "http://localhost:3000/api/plots",
      },
    ],
  },
  apis: ["./routes/plotRoutes.js"], // Path to the API routes files
  apis: ["./routes/route.js"],
  apis: ["./routes/authRoutes.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
