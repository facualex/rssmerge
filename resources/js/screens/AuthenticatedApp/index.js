import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Icon, Input } from "../../components";
import { useFeedMixManager } from "../../context/FeedMixProvider";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ReactTooltip from "react-tooltip";
import { Layout } from "..";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";
import API from "../../config/api";
import "./style.css";

const intialState = {
    activeFeeds: [],
    activeFeedsById: {},
    disabledFeeds: [],
    disabledFeedsById: {},
    isModalOpen: false,
};

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

Modal.setAppElement("#root");

function AuthenticatedApp() {
    const [state, setState] = useState(intialState);
    const { selectedFeedMix } = useFeedMixManager();

    const {
        activeFeeds,
        activeFeedsById,
        disabledFeeds,
        disabledFeedsById,
        isModalOpen,
    } = state;

    const { name: selectedFeedMixName, id: selectedFeedMixId } =
        selectedFeedMix;

    const classifyActiveDisabledFeeds = ({ feeds, feedsById }) => {
        const disabledFeeds = [];
        const disabledFeedsById = {};
        const activeFeeds = [];
        const activeFeedsById = {};

        feeds.forEach((feedId) => {
            if (feedsById[feedId].feed_status_id == 1) {
                // active feed
                activeFeeds.push(feedId);
                activeFeedsById[feedId] = feedsById[feedId];
            } else {
                // disabled feed
                disabledFeeds.push(feedId);
                disabledFeedsById[feedId] = feedsById[feedId];
            }
        });

        setState((prevState) => ({
            ...prevState,
            disabledFeeds,
            disabledFeedsById,
            activeFeeds,
            activeFeedsById,
        }));
    };

    function openModal() {
        setState((prevState) => ({ ...prevState, isModalOpen: true }));
    }

    function closeModal() {
        setState((prevState) => ({ ...prevState, isModalOpen: false }));
    }

    const onFeedDragEnd = (event) => {
        const { destination, source, draggableId } = event;

        if (!destination) {
            return;
        }

        // User dropped the draggable in the same place
        // where it was
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
    };

    useEffect(async () => {
        try {
            // TODO: List feeds only for one feedmix
            const {
                data: { feeds, feedsById },
            } = await API.listFeeds();

            classifyActiveDisabledFeeds({ feeds, feedsById });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <Layout>
            <ReactTooltip />
            <ToastContainer />

            <Modal
                isOpen={isModalOpen}
                onAfterOpen={() => console.log("Open request")}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                overlayClassName="overlayModal"
                className="Modal"
            >
                <Box flexDirection="column" paddingX="5" paddingY="4">
                    <Box width="100%" justifyContent="space-between">
                        <Box flexDirection="column">
                            <Typography
                                fontWeight="bold"
                                color="white"
                                type="H2"
                                alignItems="center"
                            >
                                Create new feed
                            </Typography>
                            <Typography color="primary" fontWeight="bold">
                                Selected mix: {selectedFeedMixName}
                            </Typography>
                        </Box>
                        <Icon
                            onClick={closeModal}
                            type="closeCircle"
                            color="primary"
                            size="25"
                            style={{ cursor: "pointer" }}
                        />
                    </Box>
                    <Box
                        flexDirection="column"
                        width="100%"
                        alignItems="center"
                    >
                        <Box width="70%" flexDirection="column">
                            <Input placeholder="Name" label="Name" />
                            <Input placeholder="Origin" label="Feed origin" />
                            <Button>
                                <Typography fontWeight="bold">
                                    CREATE
                                </Typography>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>

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
                        data-tip="Edit feed mix"
                        type="edit"
                        size="20"
                        color="primary"
                        style={{ margin: "0 1rem", cursor: "pointer" }}
                    />
                    <Icon
                        data-tip="Delete feed mix"
                        type="delete"
                        size="20"
                        color="primary"
                        style={{ cursor: "pointer" }}
                    />
                </Box>

                <DragDropContext onDragEnd={onFeedDragEnd}>
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
                                <Input
                                    width="50%"
                                    placeholder="Search feed..."
                                />

                                <Droppable droppableId="active-feeds-droppable">
                                    {(provided) => (
                                        <Box
                                            width="100%"
                                            height="70%"
                                            marginY="3"
                                            alignItems="center"
                                            flexDirection="column"
                                            overflowY="auto"
                                            innerRef={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {activeFeeds.map(
                                                (feedId, index) => (
                                                    <Draggable
                                                        draggableId={`active-feed-${feedId.toString()}`}
                                                        index={index}
                                                        key={index}
                                                    >
                                                        {(provided) => (
                                                            <Box
                                                                width="90%"
                                                                height="6rem"
                                                                backgroundColor="white"
                                                                borderRadius="5px"
                                                                marginY="2"
                                                                alignItems="center"
                                                                paddingX="4"
                                                                justifyContent="space-between"
                                                                cursor="pointer"
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                innerRef={
                                                                    provided.innerRef
                                                                }
                                                            >
                                                                <Box alignItems="center">
                                                                    <Icon
                                                                        type="move"
                                                                        color="grey"
                                                                    />
                                                                    <Typography
                                                                        type="H4"
                                                                        fontWeight="bold"
                                                                        color="darkGrey"
                                                                        marginLeft="3"
                                                                    >
                                                                        {
                                                                            activeFeedsById[
                                                                                feedId
                                                                            ]
                                                                                .name
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                                <Box justifyContent="flex-end">
                                                                    <Icon
                                                                        data-tip="Edit feed"
                                                                        type="edit"
                                                                        size="15"
                                                                        color="primary"
                                                                        style={{
                                                                            margin: "0 1rem",
                                                                            cursor: "pointer",
                                                                        }}
                                                                    />
                                                                    <Icon
                                                                        data-tip="Delete feed"
                                                                        type="delete"
                                                                        size="15"
                                                                        color="primary"
                                                                        style={{
                                                                            cursor: "pointer",
                                                                        }}
                                                                    />
                                                                </Box>
                                                            </Box>
                                                        )}
                                                    </Draggable>
                                                )
                                            )}

                                            {provided.placeholder}
                                        </Box>
                                    )}
                                </Droppable>

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
                                    onClick={openModal}
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
                                <Input
                                    width="50%"
                                    placeholder="Search feed..."
                                />

                                <Droppable droppableId="disabled-feeds-droppable">
                                    {(provided) => (
                                        <Box
                                            width="100%"
                                            height="70%"
                                            marginTop="3"
                                            alignItems="center"
                                            flexDirection="column"
                                            overflowY="auto"
                                            innerRef={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {disabledFeeds.map(
                                                (feedId, index) => (
                                                    <Draggable
                                                        draggableId={`disabled-feed-${feedId.toString()}`}
                                                        index={index}
                                                        key={index}
                                                    >
                                                        {(provided) => (
                                                            <Box
                                                                width="90%"
                                                                height="20%"
                                                                backgroundColor="white"
                                                                borderRadius="5px"
                                                                marginY="2"
                                                                alignItems="center"
                                                                paddingX="4"
                                                                justifyContent="space-between"
                                                                cursor="pointer"
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                innerRef={
                                                                    provided.innerRef
                                                                }
                                                            >
                                                                <Box alignItems="center">
                                                                    <Icon
                                                                        type="move"
                                                                        color="grey"
                                                                    />
                                                                    <Typography
                                                                        type="H4"
                                                                        fontWeight="bold"
                                                                        color="darkGrey"
                                                                        marginLeft="3"
                                                                    >
                                                                        {
                                                                            disabledFeedsById[
                                                                                feedId
                                                                            ]
                                                                                .name
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                                <Box justifyContent="flex-end">
                                                                    <Icon
                                                                        data-tip="Edit feed"
                                                                        type="edit"
                                                                        size="15"
                                                                        color="primary"
                                                                        style={{
                                                                            margin: "0 1rem",
                                                                            cursor: "pointer",
                                                                        }}
                                                                    />
                                                                    <Icon
                                                                        data-tip="Delete feed"
                                                                        type="delete"
                                                                        size="15"
                                                                        color="primary"
                                                                        style={{
                                                                            cursor: "pointer",
                                                                        }}
                                                                    />
                                                                </Box>
                                                            </Box>
                                                        )}
                                                    </Draggable>
                                                )
                                            )}
                                            {provided.placeholder}
                                        </Box>
                                    )}
                                </Droppable>

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
                                    onClick={openModal}
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
                </DragDropContext>
            </Box>
        </Layout>
    );
}

export default AuthenticatedApp;
