const server = require('./server.js');
//index js simply pulls in the server from server.jsand loads it to a port

server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
