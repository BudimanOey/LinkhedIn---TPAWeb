import { MdCreate } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import { useContext, useState } from "react";
import { UserContext } from "../../contextProvider/userContext";
import { useMutation, useQuery } from "@apollo/client";
import { GET_EXPERIENCE, REMOVE_EXPERIENCE } from "../../queries/experienceQuery";
import { AiFillDelete } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import UpdateExperience from "../modals/UpdateExperience";


export default function Experience({id, setOpenModal, refetchData, setRefetchData}:any) {
    const user = useContext(UserContext);
    const [removeExp] = useMutation(REMOVE_EXPERIENCE)
    const [updateExpModal, setUpdateExpModal] = useState(false)
    const {loading, error, data, refetch} = useQuery(GET_EXPERIENCE, {
        variables: {
            userID: id
        }
    });

    function removeExpHandler(id: any){
        removeExp({
            variables: {
                id: id
            }
        }).then(()=>{
            refetch()
        }).catch((e)=>{
            alert(e)
        })
    }

    if(refetchData){
        refetch();
    }

    if(loading)return(
        <div>
            loading...
        </div>
    )

    


    return (
        <div className='flex flex-col border-2 rounded-lg shadow-md mt-5 mr-32 ml-32'>
            <div className='flex w-100 justify-between items-center pl-5 m-3'>
                <span className='font-bold text-2xl'>Experience</span>
                {
                    id === user.user.id &&
                    <div>
                        <button onClick={()=>{setOpenModal(true)}} className="mr-4">
                            <GrAdd/>
                        </button>
                    </div>
                }
            </div>
            <div className='grid grid-template-col-1'>
                {data && data.getExperience.map((e:any)=>{
                    return(
                        <div key={e.ID} className='m-4 p-2'>

                            <UpdateExperience active={updateExpModal} setActive={setUpdateExpModal} setRefetchData={setRefetchData} experience={e}/>

                            <div className='flex justify-between items-center'>
                                <h3 className="font-bold">{e.title}</h3>
                                <div className="flex items-center m-2">
                                    <IoIosCreate size={25}  className="cursor-pointer add-style" onClick={()=>{setUpdateExpModal(true)}}/>
                                    <AiFillDelete size={25} className="cursor-pointer delete-style" onClick={()=>{removeExpHandler(e.ID)}}/>
                                </div>
                            </div>
                            <div className="flex flex-col my-0 py-0">
                                <p className="my-0 py-0">{e.company}</p>
                                {
                                    e.endDate ? 
                                    <p className="my-0 py-0">{e.startDate} - {e.endDate}</p>
                                    :
                                    <p className="my-0 py-0">{e.startDate} - now</p>

                                }
                                <p className="my-0 py-0">{e.location}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
