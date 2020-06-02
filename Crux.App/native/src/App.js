import React from 'react';
import { Entry } from 'nav';
import { UserStoreProvider } from 'stores/user';
import { registerRootComponent } from 'expo';

function App(props) {
    return (
        <UserStoreProvider>
            <Entry {...props} />
        </UserStoreProvider>
    );
}

export default registerRootComponent(App);