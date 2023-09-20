import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../features/auth/authHook';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<{ username: string, email: string, password: string }>({} as { username: string, email: string, password: string })
    const { auth: { isAuthenticated, user }, login, register } = useAuth()

    const onSubmit = () => {
        // data.username = "Jeovane"
        // data.password = "123"
        register(data).then((res) => {
            const user: any = res

            console.log(user);
            if (user?.tipo === "client" && !user?.suspenso) {
                navigate("/todos")
                return

            }
            if (user?.tipo === "root") {
                navigate("/dashboard")
                return
            }
        }).catch((err) => {
            console.log(err)
        })


        // navigate("/todos")
    }

    return <section className="vh-100 gradient-custom">
        <div className="container py-5 h-80">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-dark text-white" style={{ height: 600 }}>
                        <div className="card-body p-5 text-center">

                            <div className="mb-md-5 mt-md-4 pb-5" >

                                <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                                <p className="text-white-50 mb-5">Please enter your login, emial and password!</p>

                                <div className="form-outline form-white mb-4">
                                    <input type="text" id="typeEmailX" className="form-control form-control-lg" onChange={(e) => setData({ ...data, username: e.target.value })} />
                                    <label className="form-label" >Username</label>
                                </div>
                                <div className="form-outline form-white mb-4">
                                    <input type="email" id="typeEmailX" className="form-control form-control-lg" onChange={(e) => setData({ ...data, email: e.target.value })} />
                                    <label className="form-label" >E-amil</label>
                                </div>

                                <div className="form-outline form-white mb-4">
                                    <input type="password" id="typePasswordX" className="form-control form-control-lg" onChange={(e) => setData({ ...data, password: e.target.value })} />
                                    <label className="form-label" >Password</label>
                                </div>



                                <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={onSubmit}>Register</button>



                            </div>

                            <div style={{ marginTop: -80 }}>
                                <p className="mb-0"> <Link className="text-white-50 fw-bold" to={'/'}>Login</Link>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

}

export default Register