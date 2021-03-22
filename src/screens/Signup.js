import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components/native";
import { Image, Button, Input } from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validateEmail, removeWhitespace } from "../utils/common";
import { images } from '../utils/images';
import { Alert } from 'react-native';
import { signup } from '../utils/firebase';
import { ProgressContext, UserContext } from "../contexts";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 40px 20px;
`;

const ErrorText = styled.Text`
  align-items: center;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const Signup = ({ navigation }) => {

    const { spinner } = useContext(ProgressContext)
    const { dispatch } = useContext(UserContext);

    const [ photoUrl, setPhotoUrl ] = useState(images.photo);
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordConfirm, setPasswordConfirm ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ disabled, setDisabled ] = useState(true);

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const didMountRef = useRef();

    const _handleSignupButtonPress = async () => {
        try {
            spinner.start();
            const user = await signup({ email, password, name, photoUrl});
            dispatch(user);
            /*
            user = {
                displayName : null,
                email: "test2@test.com",
                photoURL : null,
                uid: '',
                ....
            }
            */
        } catch (e) {
            Alert.alert('Signup Error', e.message);
        } finally {
            spinner.stop();
        }
    }

    useEffect(() => {
        let _errorMessage = '';
        if (didMountRef.current) {
            if (!name) {
                _errorMessage = 'Please enter your name';
            } else if (!validateEmail(email)) {
                _errorMessage = 'Please verify your email';
            } else if (password.length < 6) {
                _errorMessage = 'The password must contain 6 characters at least.';
            } else if (password !== passwordConfirm) {
                _errorMessage = 'Password need to match';
            } else {
                _errorMessage = '';
            }
        } else {
            didMountRef.current = true;
        }
        
        setErrorMessage(_errorMessage);
    },[name,email,password, passwordConfirm, errorMessage]);

    useEffect(()=> {
        setDisabled(
            !(name && email && password && passwordConfirm && !errorMessage)
        )
    }, [name, email, password, passwordConfirm, errorMessage])


  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
        <Container>
            <Image 
            rounded 
            url={photoUrl} 
            imageStyle={{backgroundColor:'transparent'}}
            showButton={true}
            onChangeImage={url => setPhotoUrl(url)}
            />
            <Input
                label='Name'
                value={name}
                onChangeText={setName}
                onSubmitEditing={() => {
                    setName(name.trim());
                    emailRef.current.focus();
                }}
                onBlur={() => setName(name.trim())}
                placeholder='Name'
                returnKeyType='next'
            />
            <Input
                ref={emailRef}
                label='Email'
                value={email}
                onChangeText={text => setEmail(removeWhitespace(text))}
                onSubmitEditing={() => passwordRef.current.focus()}
                placeholder='Email'
                returnKeyType='next'
            />
            <Input
                ref={passwordRef}
                label='Password'
                value={password}
                onChangeText={text => setPassword(removeWhitespace(text))}
                onSubmitEditing={() => passwordConfirmRef.current.focus()}
                placeholder='Password'
                returnKeyType='next'
                isPassword
            />
            <Input
                ref={passwordConfirmRef}
                label='Password Confirm'
                value={passwordConfirm}
                onChangeText={text => setPasswordConfirm(removeWhitespace(text))}
                onSubmitEditing={_handleSignupButtonPress}
                placeholder='Password Confirm'
                returnKeyType='done'
                isPassword
            />
            <ErrorText>{errorMessage}</ErrorText>
            <Button
                title='Signup'
                onPress={_handleSignupButtonPress}
                disabled={disabled}
            />
        </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
