import { Box, Typography } from "../../components";

import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout({ children }) {
    return (
        <>
            <Header
                backgroundColor="darkGrey"
                alignItems="center"
                justifyContent="space-between"
                height="2rem"
            />
            <Sidebar
                flexDirection="column"
                backgroundColor="grey"
                alignItems="center"
                justifyContent="space-between"
                width="20vw"
                height="calc(100vh-2rem)"
            />
            <Box width="80vw">{children}</Box>
        </>
    );
}

export default Layout;
