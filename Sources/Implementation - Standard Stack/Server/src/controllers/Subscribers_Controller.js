const { QueryEqualitySubscriberOnField } = require("../services/Subscribers_Service");

const responseSchemas = (useCase) => {
    switch(useCase) {
        case "userMails" : return (exists, subscriptionsList = [], bodiesList = []) => {return {
            'exists' : exists,
            'subscriptionsList' : subscriptionsList,
            'bodiesList': bodiesList
        }};
    }
}

const VerifySubscriber = async (req, res) => {
    let subscriberMatchedDoc = await QueryEqualitySubscriberOnField({'Address' : req.params.mail.substring(1)})

    if(subscriberMatchedDoc.length == 0) {
        return res.json(responseSchemas('userMails')(false));
    }

    return res.json(responseSchemas('userMails')(true /*, userDocRef['Subscrtions'] */));
};

module.exports = { 
    VerifySubscriber,
    
};