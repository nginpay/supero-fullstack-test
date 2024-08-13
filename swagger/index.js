const serverless = require("serverless-http");
const express = require('express')
const path = require('path');
const swaggerUi = require('swagger-ui-express')

const swaggerDocument = require('./swagger.json');

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/swagger', (req, res) => {
    const filePath = path.join(process.cwd(), 'swagger.json');
    return res.sendFile(filePath);
});

app.get('/docs', (req, res) => {
    const filePath = path.join(__dirname, './index.html');
    return res.sendFile(filePath);
})
// module.exports.handler = serverless(app);

app.listen(3001, ()=> {
    console.log('running...')
})
