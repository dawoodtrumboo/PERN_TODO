import React, { useEffect, useState } from 'react'
import ListItem from './ListItem'

const ListBox = ({todoList,setTodoList}) => {

  
  return (
    <div className='w-4/5 md:w-1/2 border h-[60%] rounded-[30px] p-5 flex flex-col overflow-y-scroll'>
       
       {todoList?.map((item)=>(
        <ListItem 
        key={item.id}
        id={item.todoid}
        label = {item.description}
        iscompeleted = {item.iscompleted}
        setTodoList={setTodoList}/>
       ))}
       
        
    </div>
  )
}

export default ListBox