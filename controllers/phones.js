const Phone = require('../models/phone')




module.exports.index = async (req, res) => {
    const phones = await Phone.find({})
    res.render('phones/index', { phones })
}


module.exports.newForm = (req, res) => {
    res.render('phones/new')
}

module.exports.createPhone = async (req, res) => {
    const phone = new Phone(req.body.phone);
    phone.author = req.user._id
    await phone.save();
    req.flash('success', 'Successfully added a phone');
    res.redirect(`/phones/${phone._id}`);
}

module.exports.showPhone = async (req, res) => {
    const phone = await Phone.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!phone) {
        req.flash('error', 'Cannot find that phone!')
        return res.redirect('/phones')
    }
    res.render('phones/show', { phone })
}


module.exports.editForm = async (req, res) => {
    const { id } = req.params
    const phone = await Phone.findById(id)
    if (!phone) {
        req.flash('error', 'Cannot find that phone!')
        return res.redirect('/phones')
    }
    res.render('phones/edit', { phone })
}


module.exports.editPhone = async (req, res) => {
    const { id } = req.params
    const phone = await Phone.findByIdAndUpdate(id, { ...req.body.phone })
    req.flash('success', 'Successfully updated a phone');
    res.redirect(`/phones/${phone._id}`)
}


module.exports.deletePhone = async (req, res) => {
    const { id } = req.params
    await Phone.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted a phone');
    res.redirect('/phones')
}