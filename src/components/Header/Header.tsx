import React from "react";
import { Logo } from "./Header.style";
import { useAuth } from "../../features/auth/authHook";


const Header = () => {
    const { auth: { isAuthenticated }, logout } = useAuth()


    return (
        <nav className="navbar navbar-inverse bg-black">

            <div style={{
                display: "flex",
                justifyContent: "space-between",

                width: "100%",
                margin: 5
            }}>
                <Logo className="navbar-brand"
                    href="#">
                    <i className="fa fa-calendar-check-o"></i>TodoApp
                </Logo>
                {
                    isAuthenticated ? <button type="button" style={{

                    }} className="btn btn-light" onClick={async () => {
                        await logout()


                    }}>Logout</button> : null
                }


            </div>



            {/* </div> */}

        </nav>
    )
}

export default Header