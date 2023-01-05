const express = require('express')
const router = express.Router({ mergeParams: true }); // we need to set mergeParams:true so we have access to :id

const catchAsync = require('../utils/catchAsync'); //this is for error handling
const ExpressError = require('../utils/expressError') // the class thing
const Phone = require('../models/phone')
const Review = require('../models/review')
const { isLoggedin, validateReview, isReviewAuthor } = require('../middleware')

const reviews = require('../controllers/reviews')



router.post('/', isLoggedin, validateReview, catchAsync(reviews.createReview))


router.delete('/:reviewId', isLoggedin, isReviewAuthor, catchAsync(reviews.deleteReview))


module.exports = router