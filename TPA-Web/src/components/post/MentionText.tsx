import { useState } from "react"
import { Link } from "react-router-dom";
import MentionModal from "../modals/MentionModal";

export default function MentionText({ text }: { text: string }) {
    const [modalMention, setModalMention] = useState(false)

    let firstIndexMentionTag = text.indexOf('[');
    let lastIndexMentionTag = text.indexOf(']');
    let mentionTagSubString = text.substring(firstIndexMentionTag + 1, lastIndexMentionTag)

    let firstIndexUserId = text.indexOf('(')
    let lastIndexUserId = text.indexOf(')')
    let userIdSubString = text.substring(firstIndexUserId + 1, lastIndexUserId)

    return (
        <span className="items-center">
        {
            modalMention && <MentionModal userID={userIdSubString} />
        }
        <Link onMouseOver={()=>{setModalMention(true)}} onMouseOut={()=>{setModalMention(false)}} to={`/profile/${userIdSubString}`}>{mentionTagSubString} &nbsp;</Link>
        </span>
    )
}