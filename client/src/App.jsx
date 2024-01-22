import { useState,useEffect } from 'react'
import InputBar from './components/InputBar'
import ListBox from './components/ListBox'


function App() {
  const [todoList, setTodoList] =useState([])
  const baseURL = import.meta.env.VITE_SERVER_URL

  const getTodoList = async ()=>{
    try {
        const response = await fetch(`${baseURL}/todos`)
        if(response.ok){
            const result = await response.json()
            console.log(result)
            setTodoList(result)
        }
    } catch (e) {
        console.log(e.message)
    }
}
    useEffect(()=>{
        getTodoList()
    },[setTodoList])

  return (
    
      <div className='max-w-screen max-h-screen h-screen w-screen overflow-hidden bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900'>
        <h1 className='w-full text-center font-bold text-[28px] text-white uppercase p-10'>My Todo List </h1>
        <div className='h-full w-full flex flex-col items-center gap-10'>

           <InputBar setTodoList={setTodoList} rerender={()=>getTodoList()}/>
         
          <ListBox setTodoList={setTodoList} todoList={todoList} />
        </div>
      </div>
    
  )
}

export default App
