const { db } = require("../config/firebase");

class Subscriber_Schema {
    constructor (address, id, status, subscribers, bodies) {
        this.Address       = address
        this.Id            = id
        this.Status        = status
        this.Subscriptions = subscribers
        this.Bodies        = bodies
    }
}

const Subscribers = db.collection('/Subscribers');

module.exports = { 
    Subscribers,
    Subscriber_Schema
}