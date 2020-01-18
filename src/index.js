const express = require('express');
const routes = require('./routes');

const app =  express();

app.use(express.json());
app.use(routes);

// port = process.env.PORT || 3000;
// app.listen(port);
app.listen(3333);