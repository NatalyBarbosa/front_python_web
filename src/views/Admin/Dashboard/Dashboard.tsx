import React, { useEffect, useState } from "react";
import { useAuth } from "../../../features/auth/authHook";
import { useNavigate } from "react-router-dom";
import { Tabela } from "../../todo/components/TodoList/Todo.style";
import IconButton from "../../../components/iconButton";








const Dashboard = () => {

    const { auth: { isAuthenticated }, listUsers, userAsSuspended, userPending } = useAuth()
    const { data: list, refetch } = listUsers()


    // const deleteChore = async (todo: TodoGet) => {
    //     await remove(todo)
    //     refetch()
    // }
    const navigate = useNavigate()
    useEffect(() => {

        if (!isAuthenticated) {
            navigate("/")
        }

    }, [isAuthenticated])

    const renderRow = () => {

        return list?.map((todo: any) => (
            <Tabela key={todo.id}>

                <td className={todo.suspenso ? 'markAsDone' : ''}>{todo.username}</td>
                <td style={{ float: 'right' }}>
                    <IconButton
                        style="danger"
                        icon="trash-o"
                        onClick={async () => {
                            await userAsSuspended(todo)
                            refetch()
                        }}
                        hide={todo.suspenso}
                    />
                    <IconButton
                        style="warning"
                        icon="undo"
                        onClick={async () => {
                            await userPending(todo)
                            refetch()
                        }}
                        hide={!todo.suspenso}
                    />

                    {/* <IconButton

                        style="success"
                        icon="check"
                        onClick={() => { }
                        }
                        hide={todo.suspenso}
                    /> */}
                </td>
            </Tabela>
        ))

    }


    return (
        <table className="table">
            <thead>
                <tr >
                    <th>User names</th>
                    <th style={{ float: 'right' }} className="tableActions">Ações</th>
                </tr>
            </thead>
            <tbody style={{ justifyContent: "space-evenly" }}>
                {renderRow()}
            </tbody>

        </table>
    )

}

export default Dashboard