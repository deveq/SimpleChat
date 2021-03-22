import React, { useContext } from 'react';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import { Spinner } from '../components';
import { ProgressContext, UserContext } from '../contexts';

const Navigation = () => {
    const { inProgress } = useContext(ProgressContext);
    const { user } = useContext(UserContext);
    return (
        <NavigationContainer>
            { user?.uid && user?.email ? <MainStack/> : <AuthStack/>}
            { inProgress && <Spinner /> }
        </NavigationContainer>
    )
}

export default Navigation;

