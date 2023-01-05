const Phone = require('./models/phone')
const Review = require('./models/review')
const ExpressError = require('./utils/expressError') // the class thing
const { phonesSchema, reviewSchema } = require('./schemas') // destructure it cuz we will have more schemas in the file(its for joi schema)


module.exports.isLoggedin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first')
        return res.redirect('/login')
    }
    else {
        next()
    }
}

module.exports.validatePhone = (req, res, next) => {
    const { error } = phonesSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else {
        next();
    }
}


module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const phone = await Phone.findById(id);
    if (!phone.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that')
        return res.redirect(`/phones/${id}`)
    }
    next();
}


module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else {
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params
    const review = await Review.findById(reviewId)
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that')
        return res.redirect(`/phones/${id}`)
    }
    next()
}