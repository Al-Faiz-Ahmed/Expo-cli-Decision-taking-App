import React from 'react';

//React Navigation
import NavigationRoute from './src/config/RouteNavigate';

// Conntext Api Module
import ContextProvider from './src/context/context';


export default () => (

    // Conntext Api Module
    <ContextProvider>
        //React Navigation
        <NavigationRoute />
    </ContextProvider>
)


