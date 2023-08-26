import { Route, Routes } from "react-router-dom"
import { Home } from "../Home"
import { Login } from "../Login"
import { Otp } from "../Otp"



export const ReactRoutes = () => {
    return (
        <>

            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/otp" element={<Otp />} />
            </Routes>


        </>
    )

}