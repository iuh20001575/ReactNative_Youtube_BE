require('dotenv').config();

const jsonServer = require('json-server');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT ?? 8888;

server.use(
    cors({
        allowedHeaders: ['content-type'],
    }),
);
server.use(middlewares);

server.use(jsonServer.bodyParser);

server.use(router);

server.listen(PORT, () => {
    console.log('JSON Server is running on:', PORT);
});

module.exports = server;
