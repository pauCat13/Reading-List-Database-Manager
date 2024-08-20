//Author: Paula Catalan Santana
//Date: 12/05/24
//StudentID: 22920306

//File to connect to db using mongoose
//User Name: paulacatalan13
//Password: 4FIpLuoAx6LHA3x1

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://paulacatalan13:4FIpLuoAx6LHA3x1@cluster0.sgoktnn.mongodb.net/rentAgreement?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected successfully');
});