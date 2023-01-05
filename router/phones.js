const express = require('express')
const router = express.Router();


const phones = require('../controllers/phones')

const catchAsync = require('../utils/catchAsync'); //this is for error handling

const { isLoggedin, validatePhone, isAuthor } = require('../middleware')



router.route('/')
    .get(catchAsync(phones.index))
    .post(isLoggedin, validatePhone, catchAsync(phones.createPhone))


router.get('/new', isLoggedin, phones.newForm);


router.route('/:id')
    .get(catchAsync(phones.showPhone))
    .put(isLoggedin, isAuthor, validatePhone, catchAsync(phones.editPhone))
    .delete(isLoggedin, isAuthor, catchAsync(phones.deletePhone))



router.get('/:id/edit', isLoggedin, isAuthor, catchAsync(phones.editForm))



module.exports = router