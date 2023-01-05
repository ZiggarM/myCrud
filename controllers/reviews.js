const Review = require('../models/review')
const Phone = require('../models/phone')


module.exports.createReview = async (req, res) => {
    const phone = await Phone.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id
    phone.reviews.push(review);
    await review.save();
    await phone.save();
    req.flash('success', 'Successfully added a Review');
    res.redirect(`/phones/${phone._id}`)
}







module.exports.deleteReview = async (req, res,) => {
    const { id, reviewId } = req.params
    await Phone.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)

    req.flash('success', 'Successfully deleted a Review');
    res.redirect(`/phones/${id}`)
}