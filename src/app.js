const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');

const ApiRoutes = require('./routes');
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

ApiRoutes(app);

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((error, req, res, next) => {
    res.status(400).json(error);
});

app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

