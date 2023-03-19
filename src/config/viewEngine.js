import express from 'express';

const configViewEngine = (app) => {
  app.use(express.static('./src/public')); // chi duoc lay anh tai day
  app.set('view engine', 'ejs');
  app.set('views', './src/views');    // tat ca thu muc view o day
};

module.exports = configViewEngine;
