import { useMutation } from '@apollo/client';
import React from 'react';
import { GiCancel } from "react-icons/gi";
import { CREATE_JOB } from '../../queries/jobQuery';

export default function AddJobModal({active, setActive, setRefetchData}:any) {
  const [createJob] = useMutation(CREATE_JOB);
  const date = new Date();
  var display:string;
  if(active){
      display = "flex"
  }else{
      display = "hidden"
  }

  function createJobHandler(){
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const company = (document.getElementById("company") as HTMLInputElement).value;
    const location = (document.getElementById("location") as HTMLInputElement).value;
    const createdAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
    createJob({
      variables:{
        title: title,
        company: company,
        location: location,
        createdAt: createdAt
      }
    }).then(()=>{
      setRefetchData(true)
      setActive(false)
    }).catch((e)=>{
      alert(e)
    })
  }

  return (
    <div className={`${display} modal-container center-all`}>
        <div className='bg-white border-lg modal'>
            <div className='flex items-center justify-between border-bt-2-grey'>
              <span className='font-bold  p-4'>Add Job</span>
              <GiCancel onClick={()=>{setActive(false)}} size={25} className="closeBtn cursor-pointer"/>
            </div>
          <div className='modal-content mt-2'>
            <div className='w-full flex-col'>
                <p className='text-black text-s'>Title</p>
                <input id='title' type="text" className='text-input white-bg w-full max-w-98' placeholder='Ex: Marketing'/>
            </div>
            <div className='w-full flex-col'>
                <p className='text-black text-s'>Company</p>
                <input id='company' type="text" className='text-input white-bg w-full max-w-98' placeholder="Ex: PT Mencari Cinta"/>
            </div>
            <div className='w-full flex-col'>
                <p className='text-black text-s'>Location</p>
                <input id='location' type="text" className='text-input white-bg w-full max-w-98' placeholder='Ex: Bojong'/>
            </div>
          </div>
            <div className='justify-end pt-5 pb-5'>
              <button className='addBtn' onClick={createJobHandler}>add</button>
            </div>
        </div>
      </div>
  )
}
