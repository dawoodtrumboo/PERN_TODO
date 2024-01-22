import React, { useRef } from 'react'

const InputBar = ({setTodoList,rerender}) => {
    const inputRef = useRef(null)
    const baseURL = import.meta.env.VITE_SERVER_URL

    const addItem = async()=>{
        try {
            const response = await fetch(`${baseURL}/todos`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"description":inputRef.current.value})
            })
            if(response.ok){
                setTodoList(prevState =>[...prevState,{"description":inputRef.current.value}])
                rerender();
            }
        } catch (e) {
            console.log(e.message)
        }
    }
  return (
    <div className='border-[1px] w-4/5 md:w-1/2 rounded-full flex items-center gap-3 text-white'>
    <input ref={inputRef} type='text' className='bg-transparent focus:outline-none w-full placeholder:font-light placeholder:italic placeholder:text-sm py-3 px-4' placeholder='Type you task here...'/>
    <span className='cursor-pointer' onClick={addItem}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
</svg></span>
    


  </div>
  )
}

export default InputBar