
import { BrowserRouter, Routes as RoutesWrapper, Route, useNavigate } from 'react-router-dom';
import Todo from './todo';
import { useAuth } from '../features/auth/authHook';
import Login from './public/Login/Login';
import { useEffect } from 'react';
import Dashboard from './Admin/Dashboard/Dashboard';
import Register from './public/Register/Register';

const Routes = () => {
    const {
        auth: { isAuthenticated, user },

    } = useAuth();



    const router = () => {
        const token = localStorage.getItem("accessToken");
        if (token && isAuthenticated && user.tipo === "client") {

            return <>
                <Route path="/todos" element={<Todo />} />
                <Route path="/*" element={<Todo />} />
            </>


        }
        if (token && isAuthenticated && user.tipo === "root") {
            return <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/*" element={<Dashboard />} />
            </>
        }

        return <>
            <Route path="/*" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </>
    }

    return (
        <BrowserRouter>
            <RoutesWrapper>

                {router()}
            </RoutesWrapper>
        </BrowserRouter>
    );
};

export default Routes;
