import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Box, Button, Typography } from "../components";
import { Layout } from '../screens'

function AuthenticatedApp() {
    const { logout } = useAuth();

    return (
        <Layout>
            <>
                <Typography color="white" type="H1">Authenticated!</Typography>
                <Button maxWidth="20%" onClick={logout}>Logout</Button>
                </>
        </Layout>
    );
}

export default AuthenticatedApp;
