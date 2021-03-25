import React, { useState, useLayoutEffect, useContext, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Text, FlatList, Alert } from 'react-native';
import { DB, createMessage, getCurrentUser } from '../utils/firebase';
import { Input } from '../components';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';


const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
`;

const SendButton = props => {
    const theme = useContext(ThemeContext);

    return (
        <Send
            {...props}
            disabled={!props.text}
            containerStyle={{
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 4,
            }}
        >
            <MaterialIcons
                name="send"
                size={24}
                color={
                    props.text ? theme.sendButtonActivate : theme.sendButtonInactivate
                }
            />
        </Send>
    )
}

const Channel = ({ navigation, route : { params }}) => {

    const [ messages, setMessages ] = useState([]);
    const [ text, setText ] = useState([]);
    const { uid, name, photoUrl } = getCurrentUser();

    const _handleMessageSend = async messageList => {
        const newMessage = messageList[0];
        try {
            await createMessage({ channelId: params.id, message : newMessage });
        } catch (e) {
            Alert.alert('Send Message Error', e.message);
        }
    };

    useEffect(() => {
        const unsubscribe = DB.collection('channels')
            .doc(params.id)
            .collection('messages')
            .orderBy('createdAt','desc')
            .onSnapshot(snapshot => {
                console.log(snapshot,"스냅샷");
                const list = [];
                snapshot.forEach(doc => {
                    console.log(doc,'doc');
                    list.push(doc.data());
                });
                setMessages(list);
            })
        return () => unsubscribe();
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: params.title || 'Channel'});
    }, []);

    return (
        <Container>
            {/* <FlatList
                keyExtractor={item => item['id']}
                data={messages}
                renderItem={({ item }) => (
                    <Text style={{ fontSize: 24}}>{item.text}</Text>
                )}
                inverted
            />
            <Input
                value={text}
                onChangeText={setText}
                onSubmitEditing={() => {createMessage({ channelId: params.id, text})}}
            /> */}
            <GiftedChat
                listViewProps={{
                    style: { backgroundColor : theme.background },
                }}
                placeholder='Enter a message...'
                messages={messages}
                user={{ _id: uid, name, avatar: photoUrl}}
                onSend={_handleMessageSend}
                alwaysShowSend={true}
                textInputProps={{
                    autoCapitalize: 'none',
                    autoCorrect: false,
                    textContentType: 'none',
                    underlinecolorAndroid: 'transparent',
                }}
                multiline={false}
                renderUsernameOnMessage={true}
                scrollToBottm={true}
                renderSend={props => <SendButton {...props}/>}
                />
        </Container>
    )
}

export default Channel;