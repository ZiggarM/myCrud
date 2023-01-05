const express = require('express')
const router = express.Router();


const phones = require('../controllers/phones')

const catchAsync = require('../utils/catchAsync'); //this is for error handling
const Phone = require('../models/phone')

const { isLoggedin, validatePhone, isAuthor } = require('../middleware')






router.get('/', catchAsync(phones.index));


router.get('/new', isLoggedin, phones.newForm);

router.post('/', isLoggedin, validatePhone, catchAsync(phones.createPhone))

router.get('/:id', catchAsync(phones.showPhone))

router.get('/:id/edit', isLoggedin, isAuthor, catchAsync(phones.editForm))

router.put('/:id', isLoggedin, isAuthor, validatePhone, catchAsync(phones.editPhone))


router.delete('/:id', isLoggedin, isAuthor, catchAsync(phones.deletePhone))

module.exports = router