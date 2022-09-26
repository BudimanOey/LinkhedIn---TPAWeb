import { useMutation, useQuery } from '@apollo/client';
import { GET_EDUCATION, REMOVE_EDUCATION } from '../../queries/educationQuery';
import { IoIosCreate } from 'react-icons/io';
import { GrAdd } from "react-icons/gr";
import { useContext, useState } from 'react';
import { UserContext } from '../../contextProvider/userContext';
import { AiFillDelete } from 'react-icons/ai';
import UpdateEducation from '../modals/UpdateEducation';

export default function Education({id, setOpenModal, refetchData, setRefetchData}:any) {
    const user = useContext(UserContext).user;
    const [updateEdu, setUpdateEdu] = useState(false)
    const [removeEducation] = useMutation(REMOVE_EDUCATION)
    const {loading, error, data, refetch} = useQuery(GET_EDUCATION, {
        variables: {
            userID: id
        }
    });

    function removeEducationHandler(id:any){
        removeEducation({
            variables: {
                id: id
            }
        }).then(()=>{
            refetch();
        })
    }

    if(refetchData){
        refetch();
    }
    
    if(loading){
        return(
            <div>
                loading
            </div>
        )
    }


    return (
        <div className='flex flex-col border-2 rounded-lg shadow-md mt-5 mr-32 ml-32 bg-white'>
            <div className='flex w-100 justify-between items-center pl-5 m-3'>
                <span className='font-bold text-2xl'>Education</span>
                {
                    id === user.id &&
                    <div>
                        <button onClick={()=>{setOpenModal(true)}} className="mr-3">
                            <GrAdd/>
                        </button>
                    </div>
                }
            </div>
            <div className='grid grid-template-col-1'>
                { data &&  data.getEducation.map((e:any)=>{
                    return (
                        <div key={e.id} className='m-4 p-2 items-center'>
                            <UpdateEducation active={updateEdu} setActive={setUpdateEdu} setRefetchData={setRefetchData} education={e}/>
                            <div className='flex justify-between items-center'>
                                <h3 className=''>{e.school}</h3>
                                <div className='flex'>
                                    <IoIosCreate size={25}  className="cursor-pointer add-style" onClick={()=>{setUpdateEdu(true)}}/>
                                    <AiFillDelete size={25} className="cursor-pointer delete-style" onClick={()=>{removeEducationHandler(e.id)}}/>
                                </div>
                            </div>
                            <div className='my-0 py-0'>
                                <p className='my-0 py-0'>{e.degree}, {e.major}</p>
                                <p className='my-0 py-0'>{e.startDate} - {e.endDate}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
