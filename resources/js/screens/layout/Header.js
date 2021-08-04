import { Box, Typography, Icon, Button } from "../../components";
import { useFeedMixManager } from "../../context/FeedMixProvider";
import { ToastContainer, toast } from "react-toastify";

function Header(props) {
    const { selectedFeedMix } = useFeedMixManager();
    const { id: selectedFeedMixId, name: selectedFeedMixName, urlIdentifier } = selectedFeedMix;

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(urlIdentifier ? `http://zetatao.com/mergerss/${urlIdentifier}` : null);
            return toast.success("URL copied to clipboard.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        } catch (error) {
            return toast.error("Failed to copy, please try again.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
    }

    return (
        <>
            <ToastContainer />
            <Box {...props}>
                <Box alignItems="center" width="50%">
                    {selectedFeedMixId === null ? (
                        <Typography color="white" type="H2" fontWeight="bold">
                            MergeRSS
                        </Typography>
                    ) : (
                        <>
                            <Box
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                marginY="3"
                                width="50%"
                            >
                                <Typography
                                    color="white"
                                    type="H3"
                                    fontWeight="bold"
                                >
                                    {selectedFeedMixName}
                                </Typography>
                                <Typography
                                    color="primary"
                                    type="H1"
                                    fontWeight="bold"
                                >
                                    00:22:23
                                </Typography>
                                <Typography color="white">
                                    until next sync
                                </Typography>
                            </Box>
                            <Button width="30%" marginLeft="3">
                                <Icon
                                    type="refresh"
                                    spin={true}
                                    color="primary"
                                />
                                <Typography marginLeft="2">Sync now</Typography>
                            </Button>
                        </>
                    )}
                </Box>
                <Box
                    width="40%"
                    border="1px solid"
                    borderColor="primary"
                    justifyContent="space-between"
                    padding="3"
                    color="primary"
                >
                    <Typography fontWeight="bold">{urlIdentifier ? `http://zetatao.com/mergerss/${urlIdentifier}`: "-"}</Typography>
                    <Icon
                        type="copy"
                        onClick={copyToClipboard}
                        style={{ cursor: "pointer" }}
                        color="primary"
                        data-tip="Copy to clipboard"
                    />
                </Box>
            </Box>
        </>
    );
}

export default Header;
