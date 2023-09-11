const { Subscribers, Subscriber_Schema } = require("../models/Subscribers");

const QuerySubscriberOnFields = async (fields, comp = "==") => {
    const fieldsAsEntries = Object.entries(fields);
    let QueryReducer = Subscribers;
    let i = 0;

    if(comp instanceof String) comp = new Array(fieldsAsEntries.length).fill(comp);

    for (const [key, value] of fieldsAsEntries) {
        QueryReducer = QueryReducer.where(key, comp[i++], value);
    }

    return (await QueryReducer.get()).docs;
}

module.exports = {
    QuerySubscriberOnFields,
};