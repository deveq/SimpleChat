import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import MainTab from './MainTab';
import { Channel, ChannelCreation } from '../screens';

const Stack = createStackNavigator();

const MainStack = () => {

    const theme  = useContext(ThemeContext);

    return (
        <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTintColor: theme.headerTintColor,
                cardStyle: { backgroundColor : theme.background},
                headerBackTitleVisible : false,
            }}
        >
            <Stack.Screen name='Main' component={MainTab}/>
            <Stack.Screen name="Channel" component={Channel}/>
            <Stack.Screen name="Channel Creation" component={ChannelCreation}/>
        </Stack.Navigator>
    )
}

export default MainStack;