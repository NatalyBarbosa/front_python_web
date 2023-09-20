import { useSelector } from "react-redux";

import { authAPI } from "./authApi";
import { authActions, authSelector } from "./authSlice";
import { useAppDispatch } from "../../app/store";
// import { UserRegisterProps } from "./interfaces";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const auth = useSelector(authSelector);
    const [register] = authAPI.useRegisterMutation();
    const [login] = authAPI.useLoginMutation();
    const [logout] = authAPI.useLogoutMutation();
    const [userAsSuspended] = authAPI.useUserAsSuspendedMutation();
    const [userPending] = authAPI.useUserPendingMutation();
    return {
        auth,
        register: (props: any) => register(props).unwrap(),
        login: (props: { username: string; password: string }) => {
            dispatch(authActions.logout())
            return login(props).unwrap()
        },
        listUsers: () => {
            const { data, refetch, isLoading } = authAPI.useListUserQuery()
            return { data, refetch, isLoading }
        },
        load: () => dispatch(authActions.load()),
        logout: () => {
            logout()
            dispatch(authActions.logout())
        },
        userAsSuspended: (todo: any) => {
            const id = todo.id
            // console.log(id)
            return userAsSuspended({ id })
        },
        userPending: (todo: any) => {
            const id = todo.id
            return userPending({ id })
        },
    };
};