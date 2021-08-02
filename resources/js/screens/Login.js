import React from "react"
import API from "../config/api";
import { Box, Typography } from "../components"
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    email: '',
    password: '',
}

function Login() {
    const [loginData, setLoginData] = React.useState(initialState);

    const { email, password } = loginData; 

    const setInput = (event) => setLoginData(prevState => ({ ...prevState, [event.target.name]: event.target.value }));

    const handleLogin = async () => {
        try {
            API.login({ email, password })
        } catch(error) {
            return toast.error("Login failed, please try again.", {
                position: toast.POSITION.TOP_CENTER
            });
        }
    };

    return (
        <Box
            flexDirection="column"
            backgroundColor="blue"
            color="white"
            width="100%"
            height="100vh"
            isLoading={true}
        >
            <ToastContainer />
            <Typography type="H1">Login</Typography>
            <Box flexDirection="column" width="40%" margin="0 auto">
                <input name="email" value={email} onChange={setInput} />
                <input name="password" type="password" value={password} onChange={setInput} />
                <button onClick={handleLogin}>
                    <Typography>Login</Typography>
                </button>
            </Box>
        </Box>
    )
}

export default Login