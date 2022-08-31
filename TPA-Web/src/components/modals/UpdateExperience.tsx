import '../../styles/modal.scss'
import { GiCancel } from "react-icons/gi";
import { UserContext } from '../../contextProvider/userContext'
import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_EXPERIENCE } from '../../queries/experienceQuery';

export default function UpdateExperience({active, setActive, setRefetchData, experience}: any) {
    const getUser = useContext(UserContext);
    const [updateExp] = useMutation(UPDATE_EXPERIENCE)
    const [endDateOpt, setEndDateOpt] = useState(experience.currentlyWorking);
    const [title, setTitle] = useState(experience.title)
    const [employmentType, setEmploymentType] = useState(experience.employmentType)
    const [company, setCompany] = useState(experience.company)
    const [location, setLocation] = useState(experience.location)
    const [startDateInp, setStartDateInp] = useState(experience.startDate)
    const [endDateInp, setEndDateInp] = useState(experience.endDate)
    const [desc, setDesc] = useState(experience.description)
    
    var display:string;
    if(active){
        display = "flex"
    }else{
        display = "hidden"
    }

    function checkboxHandler(){
        if(endDateOpt){
            setEndDateOpt(false)
        }else{
            setEndDateOpt(true)
        }
    }


    function saveExpHandler(){

        console.log(title)
        if(endDateOpt) {
            updateExp( {
                variables: {
                    id: experience.ID,
                    userID: getUser.user.id,
                    title: title,
                    employmentType: employmentType,
                    company: company,
                    location: location,
                    startDate: startDateInp,
                    endDate: "",
                    desc: desc,
                    currWork: endDateOpt
                }
            }).then(()=>{
                setRefetchData(true)
                alert("Succeed!")
            })
        }else{
            updateExp( {
                variables: {
                    id: experience.ID,
                    userID: getUser.user.id,
                    title: title,
                    employmentType: employmentType,
                    company: company,
                    location: location,
                    startDate: startDateInp,
                    endDate: endDateInp,
                    desc: desc,
                    currWork: endDateOpt
                }
            }).then(()=>{
                setRefetchData(true)
                alert("Succeed!")
            })
        }
    }

    return (
        <div className={`${display} modal-container center-all top-0 left-0`}>
            <div className='bg-white border-lg modal'>
                <div className='flex items-center justify-between border-bt-2-grey'>
                    <span className='font-bold  p-4'>Update Experience</span>
                    <GiCancel onClick={()=>{setActive(false)}} size={25} className="closeBtn cursor-pointer"/>
                </div>
                <div className='modal-content mt-2'>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Title</p>
                        <input id='title' type="text" className='text-input white-bg w-full max-w-98' defaultValue={experience.title} onChange={(e)=>{setTitle(e.target.value)}}/>
                    </div>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Employment type</p>
                        <select name="employmentType" id="employmentType" onChange={(e)=>{setEmploymentType(e.target.value)}}>
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="self-employed">Self-employed</option>
                            <option value="freelance">Freelance</option>
                            <option value="contract">Contract</option>
                            <option value="internship">Internship</option>
                            <option value="apprenticeship">Apprenticeship</option>
                            <option value="seasonal">Seasonal</option>
                        </select>
                    </div>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Company name</p>
                        <input id='company' type="text" className='text-input white-bg w-full max-w-98' defaultValue={experience.company} onChange={(e)=>{setCompany(e.target.value)}}/>
                    </div>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Location</p>
                        <input id='location' type="text" className='text-input white-bg w-full max-w-98' defaultValue={experience.location} onChange={(e)=>{setLocation(e.target.value)}}/>
                    </div>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Start date</p>
                        <input id='startDateID' type="month" className='text-input white-bg w-full max-w-98' defaultValue={experience.startDate} onChange={(e)=>{setStartDateInp(e.target.value)}}/>
                    </div>
                    <div className='w-full flex-col mt-5'>
                        <input type="checkbox" id='workingNow' onChange={checkboxHandler} checked={endDateOpt}/>
                        <label htmlFor="workingNow">I am currently working in this role</label>
                    </div>                  
                    {endDateOpt === false && 
                        <div className='w-full flex-col'>
                            <p className='text-black text-s'>End date</p>
                            <input id='endDateID' type="month" className='text-input white-bg w-full max-w-98' defaultValue={experience.endDate} onChange={(e)=>{setEndDateInp(e.target.value)}}/>
                        </div>
                    }
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Description</p>
                        <textarea id='descript' className='textarea-vertical text-input white-bg w-full max-w-98' defaultValue={experience.desc} onChange={(e)=>{setDesc(e.target.value)}}/>
                    </div>
                </div>
                <div className='justify-end pt-5 pb-5'>
                    <button className='addBtn' onClick={saveExpHandler}>Save</button>
                </div>
            </div>
        </div>
    )
}
