import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import { Image, Input, Button } from '../components';
import { images } from '../utils/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Alert } from 'react-native';
import { login } from '../utils/firebase';


const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding: 0 20px;
    padding-top: ${({ insets : { top }}) => top}px;
    padding-bottom: ${({ insets : { bottom }}) => bottom}px;
`;

const ErrorText = styled.Text`
    align-items: flex-start;
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    line-height: 20px;
    color: ${({ theme }) => theme.errorText};
`;

const Login = ({navigation}) => {

    const insets = useSafeAreaInsets();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ disabled, setDisabled ] = useState(true);
    const passwordRef = useRef();

    useEffect(()=> {
        setDisabled(!(email && password && !errorMessage));
    }, [email, password, errorMessage])


    const _handleEmailChange = email => {
        const changedEmail = removeWhitespace(email);
        setEmail(changedEmail);
        setErrorMessage(
            validateEmail(changedEmail) ? '' : '이메일을 확인해주세요.'
        )
    }

    const _handlePasswordChange = password => {
        setPassword(removeWhitespace(password));
    };

    const _handleLoginButtonPress = async () => {
        try {
            const user = await login({email, password});
            Alert.alert('Login Success', user.email);
        } catch (e) {
            Alert.alert('Login Error', e.message);
        }
    };

    return (
        //KeyboardAwareScrollView 이용 시 TouchableWithoutFeedback에 사용했던 Keyboard.dismiss를 사용하지 않아도 되고,
        //extraScrollHeight를 이용해 스크롤이 될 때 해당 아이템과 키보드와의 height를 지정할 수 있음.
        <KeyboardAwareScrollView
            contentContainerStyle={{flex :1}}
            extraScrollHeight={ 20 }
        >

            <Container insets={insets}>
                <Image url={images.logo} imageStyle={{borderRadius: 8, borderWidth: 1, borderColor: 'gray' }}/>
                <Input
                    label='Email'
                    value={email}
                    onChangeText={_handleEmailChange}
                    onSubmitEditing={() => passwordRef.current.focus()}
                    placeholder='Email'
                    returnKeyType='next'
                />
                <Input
                    label='Password'
                    value={password}
                    onChangeText={_handlePasswordChange}
                    onSubmitEditing={_handleLoginButtonPress}
                    placeholder='Password'
                    returnKeyType='done'
                    isPassword
                    ref={passwordRef}
                />
                <ErrorText>{errorMessage}</ErrorText>
                <Button
                    title="Login"
                    onPress={_handleLoginButtonPress}
                    isFilled={true}
                    disabled={disabled}
                />
                <Button
                    title="Sign up with email"
                    onPress={()=> navigation.navigate('Signup')}
                    isFilled={false}
                />
            </Container>
        </KeyboardAwareScrollView>


    )
}

export default Login;