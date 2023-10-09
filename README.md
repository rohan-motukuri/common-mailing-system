[![Netlify Status](https://api.netlify.com/api/v1/badges/d85575ee-b02b-4bc7-99ae-ca948736fa96/deploy-status)](https://app.netlify.com/sites/common-mail/deploys) [![](https://img.shields.io/badge/google%20apps%20script-v8-%234285f4)](https://developers.google.com/apps-script/guides/v8-runtime)

# Common Mailing Interface
The project is a subscription based mailing interface for cohorts of any level of organization to quickly, seamlessly and securely access shared inboxes. 

## Technologies
1. Google App Scripts (A serverless service to run scripts or deployments)
2. React JS
3. Firebase
4. emailjs-mime-parser

## Problem Statement

Shared mails for purposes such as sharing notes of a lecture for a class would result in various concerns such as -
1. Leaked locations.
2. Misused conduct of the privilages by a few bad actors.
(For example some anonoymous user rejected my access thanks to 2-Step Verification when I tried to access a common mail from a new device)
![image](https://github.com/rohan-motukuri/common-mailing-system/assets/123802857/7ef30c03-7f48-4bc2-a800-ea5c25a19730)

## Exploring Solutions

| S_No | Approach                                                                                             | Benefits        | Demerits                                                                                                                                                                                                                 |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Setup an Auto Forwarding system using [POP/IMAP](https://support.google.com/mail/answer/10957?hl=en) | In-Built method & Familiar end-user experience | Forwardable to only one address, Isn't ideal in the case of a shared mail with multiple users (addresses)                                                                                                               |
| 2    | Setup a Common Group on a Messenger Service (Like WhatsApp or Telegram)                              | Familiar Experience     | In many a cases, a need for common mail arises due to professional requirements or due to the ease & capabilities of data organization in email services; Which, as of now, are not replicable on a messaging service. |

## Solution 

So to bridge the merits of each solution discussed, I came up with a Common Mailing Interface solution.

| Merits                      | Demerits         | Potential Extensions                           |
| --------------------------- | ---------------- | ---------------------------------------------- |
| Simpler End-User Experience | Complex Approach | Auto Forwarding, Messenger Service Integration | 

# Architecture

| Component           | Technology         | Deployment                         | Access                                   | Functioning                                                                 |
| ------------------- | ------------------ | ---------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------- |
| Frontend            | React JS           | Netlify                            | [Link](https://common-mail.netlify.app/) | User Interaction                                                            |
| Gateway Script      | Google App Scripts | Web App (Server less GCP Function) | URL (from DB)                            | Acts as an interface for securing credentials of subscriptions and database |
| Subscription Script | Google App Scripts | Web App (Server less GCP Function) | URL (from DB)                            | Interacts with the Gmail inbox of the subscription at hand.                 |

## Gateway Overview:
**Gateway as an abstraction for subscriptions in context of frontend**
![subscriptionAbstraction](https://github.com/rohan-motukuri/common-mailing-system/assets/123802857/7052027a-caea-43a2-9f6d-aaf0e13ad553)
**Gateway as an abstraction for database in context of subscriptions**
![dbAbstraction](https://github.com/rohan-motukuri/common-mailing-system/assets/123802857/49c66b97-2560-46d5-89af-101939e7156b)

# Functioning
1. Assessment of current threads in inbox - Since there is no free or direct manner to add webhooks to G-Mail inboxes without coding up polling systems which might set back the development duration, I decided to simply request an assessment to the current state of inbox on load of the entire frontend instance. (To handle quota limitations, I set a cool down period for re-assessment across the various frontend instances). This assessment merely writes the metadata of all the mails into the firebase.
2. Firestore Listeners - The frontend site initiates a firestore listener on mount which listens to updates in the 'Threads' and 'Subscriptinon' collections (in relevance to the logged in user).
3. Fetching actual raw email - This is done `onScroll()` and `onClick()` events on thread list rendering. Maintains an internal Cyclic Queue data structure to cache fetched original mail data (equivalent to .eml files)
4. Rendering fetched emails using an email parser in the front end.

## Workflow

### Assessment of Inbox
![Initial Assessment To DB](https://github.com/rohan-motukuri/common-mailing-system/assets/123802857/52521599-df71-4d2f-b1fd-1cb8f8c3048a)

### Content Fetch Cycle (content refers to raw email data (.eml))
![Content Fetch Cycle](https://github.com/rohan-motukuri/common-mailing-system/assets/123802857/68c167b9-de4b-46ce-9446-6f6b6ecfa169)

