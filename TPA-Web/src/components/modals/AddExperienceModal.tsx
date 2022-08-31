import '../../styles/modal.scss'
import { GiCancel } from "react-icons/gi";
import { UserContext } from '../../contextProvider/userContext'
import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EXPERIENCE } from '../../queries/experienceQuery';

export default function AddExperienceModal({active, setActive, setRefetchData}: any) {
    const getUser = useContext(UserContext);
    const [endDateOpt, setEndDateOpt] = useState(false);
    const [addExp] = useMutation(ADD_EXPERIENCE)


    var display:string;
    if(active){
        display = "flex"
    }else{
        display = "hidden"
    }

    function checkboxHandler(){
        const checkbox = (document.getElementById("workingNow") as HTMLInputElement).checked
        if(checkbox){
            setEndDateOpt(true)
        }else{
            setEndDateOpt(false)
        }
    }


    function addExpHandler(){
        const title = (document.getElementById("title") as HTMLInputElement).value;
        const employmentType = (document.getElementById("employmentType") as HTMLInputElement).value;
        const company = (document.getElementById("company") as HTMLInputElement).value;
        const location = (document.getElementById("location") as HTMLInputElement).value;
        const startDateInp = (document.getElementById("startDateID") as HTMLInputElement).value
        const desc = (document.getElementById("descript") as HTMLInputElement).value;

        if(endDateOpt) {
            addExp( {
                variables: {
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
            const endDateInp = (document.getElementById("endDateID") as HTMLInputElement).value
            addExp( {
                variables: {
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
        <div className={`${display} modal-container center-all`}>
            <div className='bg-white border-lg modal'>
                <div className='flex items-center justify-between border-bt-2-grey'>
                    <span className='font-bold  p-4'>Add Experience</span>
                    <GiCancel onClick={()=>{setActive(false)}} size={25} className="closeBtn cursor-pointer"/>
                </div>
                <div className='modal-content mt-2'>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Title</p>
                        <input id='title' type="text" className='text-input white-bg w-full max-w-98' placeholder='Ex: Retail Sales manager'/>
                    </div>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Employment type</p>
                        <select name="employmentType" id="employmentType">
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
                        <input id='company' type="text" className='text-input white-bg w-full max-w-98' placeholder='Ex: Microsoft'/>
                    </div>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Location</p>
                        <input id='location' type="text" className='text-input white-bg w-full max-w-98' placeholder='Ex: London, United Kingdom'/>
                    </div>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Start date</p>
                        <input id='startDateID' type="month" className='text-input white-bg w-full max-w-98'/>
                    </div>
                    <div className='w-full flex-col mt-5'>
                        <input type="checkbox" id='workingNow' onChange={checkboxHandler}/>
                        <label htmlFor="workingNow">I am currently working in this role</label>
                    </div>                  
                    {endDateOpt === false && 
                        <div className='w-full flex-col'>
                            <p className='text-black text-s'>End date</p>
                            <input id='endDateID' type="month" className='text-input white-bg w-full max-w-98'/>
                        </div>
                    }
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Description</p>
                        <textarea id='descript' className='textarea-vertical text-input white-bg w-full max-w-98'/>
                    </div>
                </div>
                <div className='justify-end pt-5 pb-5'>
                    <button className='addBtn' onClick={addExpHandler}>add</button>
                </div>
            </div>
        </div>
    )
}
