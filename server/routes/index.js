const { feedRouter } = require('./feed.js');
const { drinkRouter } = require('./drinkView.js');
const { searchRouter } = require('./search.js');
const { customRouter } = require('./customFeed.js');
const { usersRouter } = require('./users.js');
const { businessesRouter } = require('./businesses.js');
const { transactionsRouter } = require('./transactions.js');
const { youtubeRouter } = require('./youtube.js');
const { Router } = require('express');
const axios = require('axios');
require('dotenv').config();

module.exports = (app) => {
  app.use(`/routes/feed/`, feedRouter),
    app.use('/routes/search/', searchRouter),
    app.use('/routes/drink/', drinkRouter),
    app.use('/routes/custom/', customRouter),
    app.use('/routes/users/', usersRouter),
    app.use('/routes/businesses', businessesRouter),
    app.use('/routes/tutorial', youtubeRouter),
    app.use('/routes/transactions', transactionsRouter);
  // app.get('/trailer/:query', (req, res) => {
  //   const youtubeApi = process.env.YOUTUBE_API_KEY;
  //   const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=howtomake${req.params.query}&channelType=any&key=${youtubeApi}`;
  //   return axios(url)
  //     .then(({ data }) => data.items[0].id.videoId)
  //     .then((data) => res.status(200).send(data))
  //     .catch();
  //BPJCzaGqEAM
  // });
};
