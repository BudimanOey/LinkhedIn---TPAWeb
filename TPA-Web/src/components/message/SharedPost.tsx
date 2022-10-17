import { useQuery } from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { GET_POST, GET_POST_BY_ID } from '../../queries/postQuery'

import CommentContentTemplate from '../post/CommentContentTemplate'
import { GET_USER_BY_ID } from '../../queries/userQuery'
import SharedPostCreatorCard from './SharedPostCreatorCard'

export default function SharedPost({postID}:any) {
    const {loading, error, data} = useQuery(GET_POST_BY_ID, {
        variables:{
            id: postID
        }
    })

    if(loading) return(
        <div className="">
            Loading...
        </div>
    )

    if(error) return(
        <div className="">
            Error while fetching data!
        </div>
    )

    // console.log(data.getPostByID.creator);
    

    return (
        <div className='w-full flex-col bg-white border-2 rounded-lg shadow-md'>
             <div className='flex m-3 items-center border-bt-2-grey pb-4'>
                <SharedPostCreatorCard userID={data.getPostByID.creator}/>
             </div>
             <div className=''>
                {
                    data.getPostByID.photoURL &&
                    <img src={data.getPostByID.photoURL} className="w-full h-64 border-bt-2-grey"/>  
                    
                }
                {
                    data.getPostByID.videoURL &&
                    <video src={data.getPostByID.videoURL} className="w-full h-64 border-bt-2-grey" controls/>
                }
                <div className="m-4 text-justify pt-4 font-semibold">
                    <CommentContentTemplate texts={data.getPostByID.text.split(" ")}/>
                </div>
             </div>
        </div>
    )
}
