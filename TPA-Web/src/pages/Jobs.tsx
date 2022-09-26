import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { GrAdd } from "react-icons/gr"
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_JOB, GET_JOBS } from '../queries/jobQuery'
import AddJobModal from '../components/modals/AddJobModal'

export default function Jobs() {
  const {loading, error, data, refetch} = useQuery(GET_JOBS);

  const [modal, setModal] = useState(false);
  
  if(loading) return(
    <div>
      Loading...
    </div>
  )

  if(error) {
    return (
      <div>
        Error while fetching data!
      </div>
    )
  }

  return (
    <div className='flex full-screen flex-col'>
      <AddJobModal active={modal} setActive={setModal} setRefetchData={refetch}/>
      <Navbar/>
      <div className='full-screen bg-linkhedin'>
        {/* <div className=''> */}
          <div className='flex flex-col border-2 rounded-lg shadow-md mt-5 mr-32 ml-32 bg-white'>
              <div className='flex w-100 justify-between items-center pl-5 m-3'>
                <span className='font-bold text-2xl'>Jobs</span>
                <button className="mr-3" onClick={()=>{setModal(true)}}>
                  <GrAdd/>
                </button>
              </div>
              <div className='grid grid-template-col-1'>
                {data.getJobs.map((e:any)=>{
                  return(
                    <div key={e.id} className='m-4 p-2 items-center'>
                      <div className='flex justify-between items-center'>
                        <h3 className=''>{e.title}</h3>
                      </div>
                      <div className='my-0 py-0'>
                        <p className='my-0 py-0'>{e.company}</p>
                        <p className='my-0 py-0'>{e.location}</p>
                        <p className='my-0 py-0'>{e.createdAt}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
          </div>
        {/* </div> */}
      </div>
    </div>
  )
}
