require('dotenv').config();

const jsonServer = require('json-server');
const cors = require('cors');
const fs = require('fs');

const server = jsonServer.create();
// const db = JSON.parse(fs.readFileSync('db.json'));
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

server.get('/search/shorts', (req, res) => {
    const resp = fs.readFileSync('db.json', 'utf8');
    const data = JSON.parse(resp);
    const shorts = data.shorts;

    const query = req.query.query ?? '';

    res.json(
        shorts.filter((short) => {
            const regex = new RegExp(query, 'i');

            return regex.test(short.title);
        }),
    );
});

server.use(router);

server.listen(PORT, () => {
    console.log('JSON Server is running on:', PORT);
});

module.exports = server;
