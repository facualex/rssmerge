import React from 'react';
import { Login } from "./screens"
import ReactDOM from 'react-dom';
import AppProviders from './context/AppProviders';
import { useAuth } from './context/AuthProvider';

// TODO: Lazy load AuthenticatedApp and UnauthenticatedApp
function AuthenticatedApp() {
    return <h1>Authenticated!</h1>
}

function UnauthenticatedApp() {
    return <Login />
}

function App() {
    const { user } = useAuth()
    console.log(user)
    return user?.userId ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(
    <AppProviders>
        <App />
    </AppProviders>, document.getElementById('root'));
}
