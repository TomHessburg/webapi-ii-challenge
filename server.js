    //server.js gets everything index got yesterday. first we need to have access to express
const express = require('express');

    //postsRouter is all of the routes for '/api/posts' they live in one place in antoher file
    // and we bring them in here...
const postsRouter = require('./routers/posts-router.js')

    //now like yesterday we need to create our server using express
const server = express();

    //tell the server to use json
server.use(express.json());

    //tell the server what to return at the base route
server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});


    //this is essentially just telling the server to take all of the shit from posts-router
    //which we brought in above and link it to the /api/posts route
server.use('/api/posts', postsRouter)

    //export the serve to be imported into index.js
module.exports = server //commonjs module syntax