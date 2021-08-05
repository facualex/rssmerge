import { useState, useEffect } from "react";
import { Box, Typography, Button, Input, Icon } from "../../components";
import { useAuth } from "../../context/AuthProvider";
import { useFeedMixManager } from "../../context/FeedMixProvider";
import API from "../../config/api";

import { toast } from "react-toastify";

const initialState = {
    searchTerm: "",
    feedMixes: [],
    feedMixesById: {},
};

function Sidebar(props) {
    const { logout } = useAuth();
    const { selectedFeedMix, setSelectedFeedMix } = useFeedMixManager();

    const [state, setState] = useState(initialState);

    const { searchTerm, feedMixes, feedMixesById } = state;

    function setInput(event) {
        setState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }

    const getFeedMixes = async () => {
        try {
            const {
                data: { feedMixes, feedMixesById },
            } = await API.listFeedMixes();

            setState((prevState) => ({
                ...prevState,
                feedMixes,
                feedMixesById,
            }));
        } catch (error) {
            return toast.error(
                "Couldn't get feed mixes. Please, refresh and try again.",
                {
                    position: toast.POSITION.TOP_CENTER,
                }
            );

            console.log(error);
        }
    };

    useEffect(getFeedMixes, []);

    return (
        <Box position="relative" overflowY="auto" {...props}>
            <Input
                name="searchTerm"
                value={searchTerm}
                width="90%"
                placeholder="Search feedmix..."
                marginY="4"
                onChange={setInput}
            />

            <Box
                width="100%"
                backgroundColor="darkGrey"
                paddingX="6"
                paddingY="2"
                justifyContent="center"
                alignItems="center"
                cursor="pointer"
                hoverProps={{
                    backgroundColor: "darkerGrey",
                }}
            >
                <Icon type="addSquare" color="primary" />
                <Typography
                    color="primary"
                    type="H4"
                    marginLeft="2"
                    fontWeight="bold"
                >
                    New mix
                </Typography>
            </Box>

            <Box flexDirection="column">
                {feedMixes.map((id) => {
                    const { cronTriggerTime, name, urlIdentifier } =
                        feedMixesById[id];

                    return (
                        <Button
                            backgroundColor={
                                selectedFeedMix.id === id ? "primary" : "grey"
                            }
                            color={
                                selectedFeedMix.id === id ? "white" : "primary"
                            }
                            hoverProps={null}
                            border="1px solid"
                            borderColor="grey"
                            onClick={() =>
                                setSelectedFeedMix({
                                    id,
                                    name,
                                    cronTriggerTime,
                                    urlIdentifier,
                                })
                            }
                            key={id}
                        >
                            {feedMixesById[id].name}
                        </Button>
                    );
                })}
            </Box>

            <Button
                position="fixed"
                bottom="2"
                left="2.5"
                width="15%"
                backgroundColor="darkerGrey"
                hoverProps={{
                    backgroundColor: "darkGrey",
                }}
                onClick={logout}
            >
                Logout
            </Button>
        </Box>
    );
}

export default Sidebar;
