import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Profile, ChannelList } from "../screens";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "styled-components";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, name }) => {
  const theme = useContext(ThemeContext);
  return <MaterialIcons name={name} size={26} color={focused ? theme.tabActiveColor : theme.tabInactiveColor} />;
};

const MainTab = ({ navigation, route}) => {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    // Navigator가 Component로 사용된 경우
    // route에 state객체가 추가로 들어옴.
    /*
    {
        index : 0,
        routeNames : [ 
            "Channel List",
            "Profile",
        ]
    }
    */
    // const titles = route.state?.routeNames || ['Channels'];
    const title = getFocusedRouteNameFromRoute(route) || 'Channels';
    // const index = route.state?.index || 0;
    navigation.setOptions({
        // headerTitle : titles[index],
        headerTitle : title,
        headerRight : () => 
        title === 'Channels' && (
          <MaterialIcons
            name='add'
            size={26}
            style={{ margin: 10}}
            onPress={()=> navigation.navigate('Channel Creation')}
          />
        )
    });
}, [route])

  return (
    <Tab.Navigator
        tabBarOptions={{
            activeTintColor: theme.tabActiveColor,
            inactiveTintColor : theme.tabInactiveColor,
        }}
    >
      <Tab.Screen
        name="Channels"
        component={ChannelList}
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarIcon({
              focused,
              name: focused ? "chat-bubble" : "chat-bubble-outline",
            }),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarIcon({
              focused,
              name: focused ? "person" : "person-outline",
            }),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
