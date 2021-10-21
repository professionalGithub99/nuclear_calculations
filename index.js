const http = require('http');
const express=require('express');
const app=express();
const path=require('path');

const hostname = '127.0.0.1';
const port = 3000;
app.use(express.static(path.join(__dirname,'public')));
app.listen(port,()=>{console.log(`running server on ${port}`)});
