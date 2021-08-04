import React from 'react';
import ReactDOM from 'react-dom';
import AppProviders from './context/AppProviders';
import { useAuth } from './context/AuthProvider';
import { FullPageLoader } from './components';

import "react-toastify/dist/ReactToastify.css";

const AuthenticatedApp = React.lazy(() => import('./screens/AuthenticatedApp'))
const UnauthenticatedApp = React.lazy(() => import('./screens/UnauthenticatedApp'))

function App() {
    const { user } = useAuth()

    return user?.userId ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(
    <AppProviders>
        <React.Suspense fallback={<FullPageLoader />}>
            <App />
        </React.Suspense>
    </AppProviders>, document.getElementById('root'));
}
