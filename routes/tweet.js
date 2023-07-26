// routes/tweetRoutes.js

const express = require('express');
const router = express.Router();
const tweetController = require('../controllers/tweetController');

// Create a new tweet
router.post('/tweets', tweetController.createTweet);

// Get all tweets
router.get('/tweets', tweetController.getTweets);

module.exports = router;
