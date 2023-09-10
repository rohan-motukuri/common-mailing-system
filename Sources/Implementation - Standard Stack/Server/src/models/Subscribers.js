const { db } = require("../config/firebase");

const document_schema = {
    "Address" : String,
    "Id" : Number,
    "Status" : Boolean,
    "Subscriptions" : [],
    "Bodies" : []
}

const Subscribers = db.collection('/Subscribers');

module.exports = { 
    Subscribers,
}