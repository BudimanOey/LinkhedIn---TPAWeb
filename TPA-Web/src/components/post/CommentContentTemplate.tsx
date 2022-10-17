import React from 'react'
import { Link } from 'react-router-dom'
import { HastagRichText1, HastagRichText2, MentionRichText, URLRichText } from '../../helper/RegexFormat'
import MentionText from './MentionText'

const CommentContentTemplate = ({ texts, }: { texts: string[] }) => {
    return (
        <p>
            {
                texts.map((text, i) => {
                    if (text.match(HastagRichText2)) {
                        let firstIndexHastag = text.indexOf('[');
                        let lastIndexHastag = text.indexOf(']');
                        let hastagSubString = text.substring(firstIndexHastag + 1, lastIndexHastag)

                        let hastagUrl = text.substring(firstIndexHastag + 2, lastIndexHastag)
                        return <Link className='richText-a' key={i} to={`/search/hashtag/${hastagUrl}`}>{hastagSubString} &nbsp;</Link>
                    } else if (text.match(HastagRichText1)) {
                        let hastagUrl = text.substring(1, text.length)
                        return <Link key={i} className='richText-a' to={`/search/hashtag/${hastagUrl}`}>{text} &nbsp;</Link>
                    } else if (text.match(URLRichText)) {
                        return <a key={i} target="_blank" rel="noopener noreferrer" href={text}>{text} &nbsp;</a>
                    } else if (text.match(MentionRichText)) {
                        return <MentionText key={i} text={text} />
                    } else {
                        return <span key={i}>{text} &nbsp;</span>
                    }
                })
            }
        </p>
    )
}

export default CommentContentTemplate