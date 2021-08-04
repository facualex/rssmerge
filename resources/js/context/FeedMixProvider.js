import React from 'react';
import API from '../config/api';

const FeedMixContext = React.createContext();
FeedMixContext.displayName = 'FeedMixContext';

const initialState = {
    id: null,
    name: "",
    cronTriggerTime: "",
    urlIdentifier: "",
};

function FeedMixProvider({ children }) {
    const [selectedFeedMix, setSelectedFeedMix] = React.useState(initialState);

    return (
        <FeedMixContext.Provider value={{selectedFeedMix, setSelectedFeedMix}}>
            {children}
        </FeedMixContext.Provider>
    )
}

function useFeedMixManager() {
    const context = React.useContext(FeedMixContext);

    if (context === undefined) {
      throw new Error(`useAuth must be used within an AuthProvider`);
    }

    return context;
}

export {FeedMixProvider, useFeedMixManager}
