import '../../styles/modal.scss'
import { GiCancel } from "react-icons/gi";
import { useMutation } from '@apollo/client';
import { ADD_EDUCATION } from '../../queries/educationQuery';
import { useContext } from 'react';
import { UserContext } from '../../contextProvider/userContext';


export default function EducationModal({active, setActive, setRefetchData}:any) {
   const user = useContext(UserContext)
    var display:string;
    if(active){
        display = "flex"
    }else{
        display = "hidden"
    }

    const [addEducation] = useMutation(ADD_EDUCATION)

    function addEducationHandler(){
        const schoolInp = (document.getElementById("school") as HTMLInputElement).value
        const degreeInp = (document.getElementById("degree") as HTMLInputElement).value
        const majorInp = (document.getElementById("major") as HTMLInputElement).value
        const startDateInp = (document.getElementById("startDate") as HTMLInputElement).value
        const endDateInp = (document.getElementById("endDate") as HTMLInputElement).value
        const gradeInp = (document.getElementById("grade") as HTMLInputElement).value
        const descriptionInp = (document.getElementById("description") as HTMLInputElement).value

        addEducation({
            variables: {
                userID: user.user.id,
                school: schoolInp,
                degree: degreeInp,
                major: majorInp,
                grade: gradeInp,
                startDate: startDateInp,
                endDate: endDateInp,
                description: descriptionInp
            }
        }).then(()=>{
            setRefetchData(true)
            alert("Success added!")
        }).catch((e)=>{
            alert(e)
        })
    }

    return (
        <div className={`${display} modal-container center-all`}>
            <div className='bg-white border-lg modal'>
                <div className='flex items-center justify-between border-bt-2-grey'>
                    <span className='font-bold  p-4'>Add education</span>
                    <GiCancel onClick={()=>{setActive(false)}} size={25} className="closeBtn cursor-pointer"/>
                </div>
                <div className='modal-content mt-2'>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>School</p>
                        <input id='school' type="text" className='text-input white-bg w-full max-w-98' placeholder='Ex: Binus University'/>
                    </div>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Degree</p>
                        <input id='degree' type="text" className='text-input white-bg w-full max-w-98' placeholder="Ex: Bacherlor's"/>
                    </div>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Field of study</p>
                        <input id='major' type="text" className='text-input white-bg w-full max-w-98' placeholder='Ex: Business'/>
                    </div>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Start date</p>
                        <input id='startDate' type="month" className='text-input white-bg w-full max-w-98'/>
                    </div>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>End date</p>
                        <input id='endDate' type="month" className='text-input white-bg w-full max-w-98'/>
                    </div>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Grade</p>
                        <input id='grade' type="text" className='text-input white-bg w-full max-w-98'/>
                    </div>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Description</p>
                        <textarea id='description' className='textarea-vertical text-input white-bg w-full max-w-98'/>
                    </div>
                </div>
                <div className='justify-end pt-5 pb-5'>
                    <button className='addBtn' onClick={addEducationHandler}>add</button>
                </div>
            </div>
        </div>
    )
}
