import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"


export const Otp = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(new Array(6).fill(""));

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleVerify = async () => {
        try {
            let enteredOtp = otp.join("");
            let data = JSON.parse(localStorage.getItem('loginData'))
            data.otp = enteredOtp;

            let result = await axios.post("https://staging.fastor.in/v1/pwa/user/login", data)
            if (result.data.status === "Success") {
                localStorage.setItem("userData", JSON.stringify(result.data.data))
                navigate("/")
            }
        } catch (error) {
            console.log("error: ", error)
        }
    }

    useEffect(() => {
        alert("Your OTP is (123456) ")
    }, [])

    return <div className="otp-container">

        <div className="input-container">

            {otp.map((data, index) => {
                return (
                    <input
                        className="otp-field"
                        type="text"
                        name="otp"
                        maxLength="1"
                        key={index}
                        value={data}
                        onChange={e => handleChange(e.target, index)}
                        onFocus={e => e.target.select()}
                    />
                );
            })}
        </div>

        <button
            className="verify-button"
            onClick={handleVerify}
        >
            Verify
        </button>

    </div>
}