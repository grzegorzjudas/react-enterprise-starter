import React from 'react';

import Config from 'client/lib/config';

import styles from './App.css';

export const App = () => (
    <div className={styles.container}>
        <h1>Hello world!</h1>
        <h5>Environment: {Config.NODE_ENV}</h5>
    </div>
);

export default App;
