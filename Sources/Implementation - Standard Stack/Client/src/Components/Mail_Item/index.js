import { useState } from "react";

import "../../CSS/MailItem.css"

function Mail_Item({sender, subject, recieved, attachments, bulkAction}) {
    const icons = {};
    const [selectedCurrentItem, setSelectedCurrentItem] = useState(false);

    return (
        <div className="mail_item">
            <div className="primary_section">
                <span className="primary_sender   primary_section_data">{sender}</span>
                <span className="primary_subject  primary_section_data">{subject}</span>
                <span className="primary_recieved primary_section_data">{recieved}</span>
            </div>

            <div className="attachments_section">
                {
                    attachments?.map(attachment => <span className="attachment"> {attachment} </span>)
                }
            </div>
        </div>    
    )
}

export default Mail_Item;