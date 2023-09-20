import { useSelector } from 'react-redux'
import { useAppDispatch } from "../../app/store"
import { TodoGet } from './todoInterface'

import { todoSelector, todoAction } from "./todoSlice"
import { todoAPI } from "./todoApi"
export const useTodo = () => {
    const dispatch = useAppDispatch()
    const todo = useSelector(todoSelector)
    const [add] = todoAPI.useAddMutation()
    const [remove] = todoAPI.useRemoveMutation()
    const [markAsDone] = todoAPI.useMarkAsDoneMutation()
    const [markAsPending] = todoAPI.useMarkAsPendingMutation()

    return {
        todo,
        search: (name: string) => {
            // return dispatch(todoAction.search(name))
            const { data, refetch, isLoading } = todoAPI.useSearchQuery({ name })
            return { data, refetch, isLoading }
        },
        add: (name: string, decricao: string) => add({ name, decricao }).unwrap()
        // return dispatch(todoAction.add(name))
        // }
        ,
        markAsDone: (todo: TodoGet) => {
            const id = todo.id
            return markAsDone({ id })
        },
        markAsPending: (todo: TodoGet) => {
            const id = todo.id
            return markAsPending({ id })
        },
        remove: (todo: TodoGet) => {
            const id = todo.id
            remove({ id })
        }


    }
}