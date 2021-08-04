import { Box, Typography } from "../../components";

import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout({ children }) {
    return (
        <Box display="block" height="100%">
            <Header
                backgroundColor="darkGrey"
                alignItems="center"
                justifyContent="space-between"
                height="15vh"
                paddingX="8"
            />
            <Box backgroundColor="red" justifyContent="stretch" height="85vh">
                <Sidebar
                    flex="2"
                    flexDirection="column"
                    backgroundColor="grey"
                    alignItems="center"
                />

                <Box flex="10" backgroundColor="darkerGrey">{children}</Box>
            </Box>
        </Box>
    );
}

export default Layout;
