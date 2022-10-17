import { useMutation, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GET_ACTIVATION } from '../queries/activationQuery'
import { ACTIVATE_USER } from '../queries/userQuery'
import { IoMdArrowBack } from "react-icons/io";
import '../styles/styleLib.scss'
import NotFoundPage from './NotFoundPage'


export default function ActivatePage() {
    const {id} = useParams()
    const [activateUser] = useMutation(ACTIVATE_USER)
    const {loading, error,data} = useQuery(GET_ACTIVATION, {
        variables:{
            id: id
        }
    })


    function activateUserHandler(){
        if(data){
            activateUser({
                variables: {
                    id: data.getActivation.userID
                }
            })
        }
    }

    useEffect(() => {
        // console.log(data)

        activateUserHandler()
    }, [data])
      

    if(loading)return (
        <div>
            Loading...
        </div>
    )
    
    if(error !== undefined){
        return(
            <NotFoundPage/>
        )
    }

    
    return (
        <div className='pl-32'>
            <h1>Your Account is active now!</h1>
                <Link to={'/'}>
                <h4 className='flex align-center cursor-pointer max-w-'><IoMdArrowBack size={24} className='pr-5'/>Go back to login</h4>
                </Link>
        </div>
    )
}
