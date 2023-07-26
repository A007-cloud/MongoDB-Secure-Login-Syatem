// controllers/tweetController.js

const Tweet = require('../models/tweet');

// Controller to create a new tweet
exports.createTweet = async (req, res) => {
  try {
    const { content, author } = req.body;
    const tweet = await Tweet.create({ content, author });
    res.status(201).json(tweet);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to get all tweets
exports.getTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find().populate('author');
    res.json(tweets);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
