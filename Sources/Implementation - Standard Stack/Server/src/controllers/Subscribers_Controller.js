//Service Imports
const { QuerySubscriberOnFields } = require("../services/Subscribers_Service");

//Controller Imports
const {} = require("./Subscriptions_Controller");
const {} = require("./Bodies_Controller");

const responseSchemas = (useCase) => {
    switch(useCase) {
        case "VerifySubscriber" : 
        return (exists, subscriptionsList = [], bodiesList = []) => {
            return {
                'exists' : exists,
                'subscriptionsList' : subscriptionsList,
                'bodiesList': bodiesList
        }};
    }
}

const VerifySubscriber = async (req, res) => {
    const queryfield = {'Address' : req.params.mail.substring(1).toLowerCase()}
    let subscriberMatchedDoc = (await QuerySubscriberOnFields(queryfield))[0]

    if(subscriberMatchedDoc.length == 0) {
        return res.json(responseSchemas('VerifySubscriber')(false));
    }

    return res.json(responseSchemas('VerifySubscriber')(true /*, userDocRef['Subscrtions'] */));
};

module.exports = { 
    VerifySubscriber,
    
};