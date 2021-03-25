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
            {/* MainStack은 로그인 된 경우에만 보이는 화면,
                AuthStack은 로그인되어있지 않을 경우에만 보이는 화면.
            */}
            { user?.uid && user?.email ? <MainStack/> : <AuthStack/>}
            { inProgress && <Spinner /> }
        </NavigationContainer>
    )
}

export default Navigation;

