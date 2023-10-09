[![Netlify Status](https://api.netlify.com/api/v1/badges/d85575ee-b02b-4bc7-99ae-ca948736fa96/deploy-status)](https://app.netlify.com/sites/common-mail/deploys) [![](https://img.shields.io/badge/google%20apps%20script-v8-%234285f4)](https://developers.google.com/apps-script/guides/v8-runtime)

# Common Mailing Interface
The project is a subscription based mailing interface for cohorts of any level of organization to quickly, seamlessly and securely access shared inboxes. 

## Problem Statement

Shared mails for purpouses such as lecture note sharing for a class would result in various concerns such as -
1. Leaked locations.
2. Misused conduct of the privilages by a few bad actors.
(For example some anonoymous bad actor rejected my access thanks to 2-Step Verification when I tried to access from a new device)
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

