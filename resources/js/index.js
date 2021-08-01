import React from 'react';
import { Login } from "./screens"
import ReactDOM from 'react-dom';

function App() {
    return (
        <div className="container">
            <Login />
        </div>
    );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
