import React, { useRef, useState } from 'react'

const ListItem = ({id,label,setTodoList,iscompeleted}) => {

    const labelRef = useRef(null)

    const [status, setStatus] = useState(iscompeleted)
    const [isEditable,setIsEditable] = useState(false)
    const handleComplete = async (value)=>{
        console.log(status)
        const bodyData = {
            iscompleted : value
        }
        console.log(bodyData,id,iscompeleted)
        
        try {
            const response = await fetch(`http://localhost:8000/todos/${id}`,{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(bodyData)
            })
            if(response.ok){
                setStatus(prevState =>!prevState)
                setTodoList((prevState)=>
                prevState.map((item)=>
                item.todoid ===id ? {...item,iscompleted:bodyData.iscompleted}:item))
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    const handleDelete = async ()=>{
        try {
            const response = await fetch(`http://localhost:8000/todos/${id}`,{
                method:'DELETE'
            })
            if(response.ok){
                setTodoList(prevState=>prevState.filter((item)=>item.todoid!==id))
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    const handleEdit = async ()=>{
        try {
            const response = await fetch(`http://localhost:8000/todos/${id}`,{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({description:labelRef.current.value})
            })

            if(response.ok){
                setIsEditable(false)
            }
        } catch (e) {
            console.log(e.message)
        }
    }
  return (
    <div className='flex items-center justify-between gap-10'>
    <div className="inline-flex items-center w-full">
    <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="custom-style1">
      <input type="radio"  onClick={(e)=>handleComplete(e.target.checked)} checked={status}
        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-white  p-0 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"
        id="custom-style1" />
      <span
        className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
          className="w-full h-full scale-105">
          <path fill-rule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clip-rule="evenodd"></path>
        </svg>
      </span>
    </label>
    <label className="mt-px font-light text-white cursor-pointer select-none w-full">
      <input ref={labelRef} defaultValue={label} readOnly={!isEditable} className={`block bg-transparent  font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-400 focus:outline-none px-3 py-1 rounded-xl w-full ${status ? 'line-through text-gray-400':' text-white'} ${!isEditable? ' cursor-default':'bg-gray-100 bg-opacity-10 cursor-text'}`}/>
  
    </label>
  </div>
  <div className='flex items-center text-white gap-2'>
    {
        !status
        &&(
            !isEditable
            &&
            <span className='cursor-pointer' onClick={()=>setIsEditable(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
    </svg>
    
        </span>
        ||
        <span className='cursor-pointer' onClick={handleEdit}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>

        </span>
        )
   }
    <span className='cursor-pointer' onClick={handleDelete}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

    </span>
  </div>
  </div>
  )
}

export default ListItem