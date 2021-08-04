import React from "react";
import { Box, Typography, Input, Button } from "../components";
import { useAuth } from '../context/AuthProvider';
import { ToastContainer, toast } from "react-toastify";

const initialState = {
    email: "",
    password: "",
    isLoading: false,
};

function Login() {
    const { login } = useAuth()
    const [loginData, setLoginData] = React.useState(initialState);

    const { email, password, isLoading } = loginData;

    const setInput = (event) => {
        setLoginData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleLogin = async () => {
        try {
            setLoginData((prevState) => ({
                ...prevState,
                isLoading: true,
            }));

            await login({ email, password}) 

            setLoginData((prevState) => ({
                ...prevState,
                isLoading: false,
            }));

            return toast.success("Logged in!", {
                position: toast.POSITION.TOP_CENTER,
            });
        } catch (error) {
            setLoginData((prevState) => ({
                ...prevState,
                isLoading: false,
            }));

            return toast.error("Login failed, please try again.", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    return (
        <Box
            flexDirection="column"
            backgroundColor="darkerGrey"
            color="white"
            width="100%"
            height="100vh"
            isLoading={false}
        >
            <ToastContainer />
            <Typography type="H3" marginTop="4" marginLeft="5">
                RSSMerge
            </Typography>
            <Box
                backgroundColor="darkGrey"
                flexDirection="column"
                alignItems="center"
                width="35%"
                height="50vh"
                margin="0 auto"
                paddingX="6"
                paddingY="4"
                marginTop="8"
                boxShadow="main"
                border="1px solid"
                borderColor="primary"
                borderRadius="3px"
            >
                <Input
                    placeholder="Type your email here..."
                    name="email"
                    label="Email"
                    value={email}
                    width="85%"
                    marginTop="6"
                    onChange={setInput}
                />
                <Input
                    placeholder="Type your password here..."
                    name="password"
                    label="Password"
                    type="password"
                    width="85%"
                    value={password}
                    marginTop={4}
                    marginBottom={4}
                    onChange={setInput}
                />
                <Button
                    marginTop="4"
                    paddingY="3"
                    width="85%"
                    isLoading={isLoading}
                    onClick={handleLogin}
                >
                    <Typography fontWeight="bold">LOGIN</Typography>
                </Button>
            </Box>
        </Box>
    );
}

export default Login;
