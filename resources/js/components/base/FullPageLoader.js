import Box from "./Box";
import Icon from "./Icon";
import Typography from "./Typography";

function FullPageLoader() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100vh"
            cursor="not-allowed"
            backgroundColor="darkGrey"
        >
            <Icon type="loader" spin={true} size="40" color="primary" />
            <Typography color="primary" marginTop="1">Loading...</Typography>
        </Box>
    );
}

export default FullPageLoader;
