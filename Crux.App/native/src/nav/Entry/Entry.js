import React, { useContext, useState } from 'react';
import { Loader, Layout } from 'nav';
import { Signin } from './Signin';
import { Alt } from './Alt';
import { postReconnect, UserStore } from 'stores/user';

export function Entry(props) {
    const { stateUser, dispatchUser } = useContext(UserStore);

    let isVisible = false;
    const [Comp, setComp] = useState(Alt);

    if (!stateUser.isLoaded) {
        if (!stateUser.isLoading) {
            isVisible = true;
        }
    }
    else {
        isVisible = true;
    }

    import(`./Signin.js`)
        .then(component => {
            setComp(component);
        })
        .catch(error => {
            console.error('error logged');
        });

    return (
        <React.Fragment>
            {isVisible ? stateUser.isAuth ? <Layout {...props} /> : <Comp /> : <Loader />}
        </React.Fragment>
    );
}