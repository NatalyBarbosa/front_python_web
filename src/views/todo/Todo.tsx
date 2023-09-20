import React from "react";
import PageHeader from "../../components/PageHeader";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";



const Todo = ()=>{
    return(
        <div>
        <PageHeader name='Tarefas' small='Cadastro'/>
        <TodoForm/>
        <TodoList/>
     </div>
    )
}

export default Todo