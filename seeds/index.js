const mongoose = require('mongoose');
const Phone = require('../models/phone')
const models = require('../seeds/models')


mongoose.set('strictQuery', true); // this is not important it is required to hide a warning will delete later

mongoose.connect('mongodb://localhost:27017/myCrud');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('Database connected');
});



const seedDB = async () => {
    await Phone.deleteMany({});


    for (let i = 0; i < 25; i++) {
        const rand = Math.floor(Math.random() * 6)
        const rand13 = Math.floor(Math.random() * 13)
        const randNum100 = Math.floor((Math.random() * 600) + 100)

        const p = new Phone({
            author: "63b58bede58b6f5adb80a097",
            model: `${models[rand]} ${rand13}`, price: randNum100,
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
            description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat...'
        })
        await p.save()
    }
}

seedDB()