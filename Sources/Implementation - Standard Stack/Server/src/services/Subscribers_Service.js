const { Subscribers } = require("../models/Subscribers");

const QueryEqualitySubscriberOnField = async (fields) => {
    let QueryReducer = Subscribers;
    for (const [key, value] of Object.entries(fields)) {
        QueryReducer = QueryReducer.where(key, "==", value);
    }

    return (await QueryReducer.get()).docs;
}

module.exports = {
    QueryEqualitySubscriberOnField,
};