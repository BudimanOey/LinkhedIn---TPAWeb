import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { GET_RESET_PASSWORD_LINK } from '../../queries/resetPassQuery'
import { UPDATE_USER_PASSWORD } from '../../queries/userQuery'
import NotFoundPage from '../NotFoundPage'

export default function InsertNewpassPage() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [updatePass] = useMutation(UPDATE_USER_PASSWORD)
    const {loading,error,data} = useQuery(GET_RESET_PASSWORD_LINK, {
        variables: {
            id: id
        }
    })

    if(loading) return(
        <div>
            Loading...
        </div>
    )

    if(error) return(
        <NotFoundPage/>
    )

    function updatePassHandler(){
        const newPassInp = (document.getElementById("newPassInp") as HTMLInputElement).value
        const confPassInp = (document.getElementById("confPassInp") as HTMLInputElement).value
        
        if(newPassInp === ""){
            alert("Insert new password")
        }else if(newPassInp !== confPassInp){
            alert("Recheck your new password!")
        }else{
            updatePass({
                variables: {
                    id: data.getResetPassLink.userID,
                    newPass: newPassInp
                }
            })
            alert("Password updated!")
            navigate('/')
        }
    }

    return (
        <div>
            <div className='form'>
                <span className='signIn'>Insert new password</span>
                <p className='pl-3'>Reset your password with the new one</p>
                <input id='newPassInp' type={'password'} placeholder='new password' className='inputBox ml-2'/>
                <input id='confPassInp' type={'password'} placeholder='confirm password' className='inputBox ml-2'/>
                <div className='center-all mt-5'>
                    <button className='button ml-1' onClick={updatePassHandler}>Reset password</button> 
                    <Link to={'/'}>
                        <button className='w-32 mt-4'>Back</button>
                    </Link>
                </div>
            </div> 
        </div>
    )
}
