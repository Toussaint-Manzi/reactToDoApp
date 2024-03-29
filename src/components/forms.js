import {useEffect} from 'react';
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

const Forms = ( { todos, input, setTodos, setInput,edit , setEdit } ) => {

  const url = "http://localhost:8000/tasks"

  const onChange = (e) =>{
    setInput (e.target.value);
  }  

  const updateTodo = (title, id ,completed) =>{
    axios.put(`${url}/${id}`, {
      title,
      id,
      completed
    }).then((res)=>{
      setTodos(res.data);
    })
  }

  
  const onSubmit = () => {
    if(!edit) {
      axios.post(url,{
        id:uuidv4(),
        title:input,
        completed:false
      }).then((res)=>{
        setTodos(res.data);
      })
      setInput("");
    }else {
      updateTodo(input , edit.id ,edit.completed);
    }
  }
  
  useEffect(()=>{
    axios.get(url).then((res)=>{
        setTodos(res.data);
    })
  },[todos])
  return (
    <div>
        <form onSubmit={ onSubmit } className='form-control  form-control-check'>
            <input type='text' placeholder='Enter a new task' value = { input } onChange = {onChange}/>
            <button className='btn' type='onSubmit'>Add</button>
        </form>
    </div>
  )
}

export default Forms