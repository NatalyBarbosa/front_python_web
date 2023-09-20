import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../features/auth/authHook';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<{ username: string, password: string }>({} as { username: string, password: string })
    const { auth: { isAuthenticated, user }, login } = useAuth()

    const onSubmit = () => {
        // data.username = "Jeovane"
        // data.password = "123"
        login(data).then((res) => {
            const user: any = jwt_decode(res.access)
            console.log(user);
            if (user?.tipo === "client" && !user?.suspenso) {
                navigate("/todos")
                return

            }
            if (user?.tipo === "root") {
                navigate("/dashboard")
                return
            }
        })
        // navigate("/todos")
    }
    // className="vh-100 gradient-custom"
    return <section >
        <div className="container py-5 h-80" >
            <div className="row d-flex justify-content-center align-items-center h-100" >
                <div className="col-12 col-md-8 col-lg-6 col-xl-5" style={{ overflow: 'hidden' }}>
                    <div className="card bg-dark text-white" style={{ height: 600 }} >
                        <div className="card-body p-5 text-center">

                            <div className="mb-md-5 mt-md-4 pb-5">

                                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                <div className="form-outline form-white mb-4">
                                    <input type="text" id="typeEmailX" className="form-control form-control-lg" onChange={(e) => setData({ ...data, username: e.target.value })} />
                                    <label className="form-label" >Username</label>
                                </div>

                                <div className="form-outline form-white mb-4">
                                    <input type="password" id="typePasswordX" className="form-control form-control-lg" onChange={(e) => setData({ ...data, password: e.target.value })} />
                                    <label className="form-label" >Password</label>
                                </div>



                                <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={onSubmit}>Login</button>



                            </div>

                            <div>
                                <p className="mb-0">Don't have an account? <Link className="text-white-50 fw-bold" to={'/register'}>Sign Up</Link>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

}

export default Login