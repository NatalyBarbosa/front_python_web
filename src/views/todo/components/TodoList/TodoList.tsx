import React, { useEffect, useState } from "react";

import IconButton from "../../../../components/iconButton";

import { useTodo } from "../../../../features/todo"
import { TodoGet } from "../../../../features/todo/todoInterface";
import { Tabela } from "./Todo.style";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../features/auth/authHook";






const TodoList = () => {

    const { search, markAsDone, markAsPending, remove } = useTodo()
    const {
        auth: { isAuthenticated },

    } = useAuth();
    const { data: list, refetch, isLoading } = search('')

    const deleteChore = async (todo: TodoGet) => {
        await remove(todo)
        refetch()
    }
    const navigate = useNavigate()
    useEffect(() => {

        if (!isAuthenticated) {
            navigate("/")
        }
        refetch()

    }, [isAuthenticated])

    const renderRow = () => {

        return list?.map(todo => (
            <Tabela key={todo.id}>

                <td className={!todo.feito ? 'markAsDone' : ''}>{todo.nome+ ": " + todo.decricao}</td>
                <td style={{ float: 'right' }}>
                    <IconButton
                        style="success"
                        icon="check"
                        onClick={async () => {
                            await markAsDone(todo)
                            refetch()
                        }}
                        hide={!todo.feito}
                    />
                    <IconButton
                        style="warning"
                        icon="undo"
                        onClick={async () => {
                            await markAsPending(todo)
                            refetch()
                        }}
                        hide={todo.feito}
                    />

                    <IconButton
                        style="danger"
                        icon="trash-o"
                        onClick={() => deleteChore(todo)}
                        hide={todo.feito}
                    />
                </td>
            </Tabela>
        ))

    }


    return (
        <table className="table">
            <thead>
                <tr >
                    <th>Descrição</th>
                    <th style={{ float: 'right' }} className="tableActions">Ações</th>
                </tr>
            </thead>
            <tbody style={{ justifyContent: "space-evenly" }}>
                {isLoading ? <div className="spinner-border " role="status">
                    <span className="sr-only">Loading...</span>
                </div> : renderRow()}
            </tbody>

        </table>
    )

}

export default TodoList