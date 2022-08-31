import '../../styles/modal.scss'
import { GiCancel } from "react-icons/gi";
import { useMutation } from '@apollo/client';
import { UPDATE_EDUCATION } from '../../queries/educationQuery';
import { useContext, useState } from 'react';
import { UserContext } from '../../contextProvider/userContext';


export default function UpdateEducation({active, setActive, setRefetchData, education}:any) {
    const user = useContext(UserContext)
    const [updateEdu] = useMutation(UPDATE_EDUCATION)
    const [schoolInp, setSchool] = useState(education.school)
    const [degreeInp, setDegree] = useState(education.degree)
    const [majorInp, setMajor] = useState(education.major)
    const [startDateInp, setStartDate] = useState(education.startDate)
    const [endDateInp, setEndDate] = useState(education.endDate)
    const [gradeInp,setGrade] = useState(education.grade)
    const [descriptionInp,setDesc] = useState(education.description)

    var display:string;
    if(active){
      display = "flex"
    }else{
      display = "hidden"
    }

    function updateEducationHandler(){
        updateEdu({
            variables: {
                id: education.id,
                userID: user.user.id,
                school: schoolInp,
                major: majorInp,
                degree: degreeInp,
                grade: gradeInp,
                startDate: startDateInp,
                endDate: endDateInp,
                desc: descriptionInp
            }
        }).then(()=>{
            setRefetchData(true)
            alert("Success added!")
        }).catch((e)=>{
            alert(e)
        })
    }

    return (
        <div className={`${display} modal-container center-all top-0 left-0`}>
            <div className='bg-white border-lg modal'>
                <div className='flex items-center justify-between border-bt-2-grey'>
                    <span className='font-bold  p-4'>Add education</span>
                    <GiCancel onClick={()=>{setActive(false)}} size={25} className="closeBtn cursor-pointer"/>
                </div>
                <div className='modal-content mt-2'>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>School</p>
                        <input id='school' type="text" className='text-input white-bg w-full max-w-98' defaultValue={education.school} onChange={(e)=>{setSchool(e.target.value)}}/>
                    </div>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Degree</p>
                        <input id='degree' type="text" className='text-input white-bg w-full max-w-98' defaultValue={education.degree} onChange={(e)=>{setDegree(e.target.value)}}/>
                    </div>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Field of study</p>
                        <input id='major' type="text" className='text-input white-bg w-full max-w-98' defaultValue={education.major} onChange={(e)=>{setMajor(e.target.value)}}/>
                    </div>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Start date</p>
                        <input id='startDate' type="month" className='text-input white-bg w-full max-w-98' defaultValue={education.startDate} onChange={(e)=>{setStartDate(e.target.value)}}/>
                    </div>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>End date</p>
                        <input id='endDate' type="month" className='text-input white-bg w-full max-w-98' defaultValue={education.endDate} onChange={(e)=>{setEndDate(e.target.value)}}/>
                    </div>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Grade</p>
                        <input id='grade' type="text" className='text-input white-bg w-full max-w-98' defaultValue={education.grade} onChange={(e)=>{setGrade(e.target.value)}}/>
                    </div>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Description</p>
                        <textarea id='description' className='textarea-vertical text-input white-bg w-full max-w-98' defaultValue={education.description} onChange={(e)=>{setDesc(e.target.value)}}/>
                    </div>
                </div>
                <div className='justify-end pt-5 pb-5'>
                    <button className='addBtn' onClick={updateEducationHandler}>Save</button>
                </div>
            </div>
        </div>
    )
}
