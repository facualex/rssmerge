import React from "react";
import { Box, Button, Typography, Icon, Input } from "../components";
import { useFeedMixManager } from "../context/FeedMixProvider";
import ReactTooltip from "react-tooltip";
import { Layout } from "../screens";

function AuthenticatedApp() {
    const { selectedFeedMix } = useFeedMixManager();
    const { name: selectedFeedMixName, id: selectedFeedMixId } =
        selectedFeedMix;

    return (
        <Layout>
            <ReactTooltip />
            <Box flexDirection="column">
                <Box
                    alignItems="center"
                    height="2rem"
                    paddingX="4"
                    paddingY="4"
                    color="white"
                >
                    <Typography type="H3" fontWeight="bold">
                        {selectedFeedMixName}
                    </Typography>
                    <Icon
                        data-tip="Edit feed"
                        type="edit"
                        size="20"
                        color="primary"
                        style={{ margin: "0 1rem", cursor: "pointer" }}
                    />
                    <Icon
                        data-tip="Delete feed"
                        type="delete"
                        size="20"
                        color="primary"
                        style={{ cursor: "pointer" }}
                    />
                </Box>
                <Box width="100%" justifyContent="space-evenly">
                    <Box
                        borderRadius="10px"
                        width="40%"
                        height="70vh"
                        backgroundColor="grey"
                        position="relative"
                    >
                        <Box
                            width="100%"
                            alignItems="center"
                            flexDirection="column"
                        >
                            <Typography
                                type="H2"
                                color="primary"
                                fontWeight="bold"
                                marginTop="4"
                                marginBottom="2"
                            >
                                Active feeds
                            </Typography>
                            <Input width="50%" placeholder="Search feed..." />
                            <Box
                                backgroundColor="grey"
                                borderRadius="0 0 10px 10px"
                                width="100%"
                                height="3rem"
                                position="absolute"
                                bottom="0"
                                right="0"
                                left="0"
                                justifyContent="center"
                                alignItems="center"
                                cursor="pointer"
                                hoverProps={{
                                    backgroundColor: "darkGrey",
                                }}
                                data-tip="New feed"
                            >
                                <Icon
                                    type="addCircle"
                                    color="primary"
                                    size="25"
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        borderRadius="10px"
                        width="40%"
                        height="70vh"
                        backgroundColor="grey"
                        position="relative"
                    >
                        <Box
                            width="100%"
                            alignItems="center"
                            flexDirection="column"
                        >
                            <Typography
                                type="H2"
                                color="primary"
                                fontWeight="bold"
                                marginTop="4"
                                marginBottom="2"
                            >
                                Disabled feeds
                            </Typography>
                            <Input width="50%" placeholder="Search feed..." />
                            <Box
                                backgroundColor="grey"
                                borderRadius="0 0 10px 10px"
                                width="100%"
                                height="3rem"
                                position="absolute"
                                bottom="0"
                                right="0"
                                left="0"
                                justifyContent="center"
                                alignItems="center"
                                cursor="pointer"
                                hoverProps={{
                                    backgroundColor: "darkGrey",
                                }}
                                data-tip="New feed"
                            >
                                <Icon
                                    type="addCircle"
                                    color="primary"
                                    size="25"
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Layout>
    );
}

export default AuthenticatedApp;
