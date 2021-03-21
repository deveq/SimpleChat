import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import { Text, Button } from 'react-native';
import { Image, Input } from '../components';
import { images } from '../utils/images';


const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding: 20px;
`;

const Login = ({navigation}) => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const passwordRef = useRef();

    return (
        <Container>
            <Image url={images.logo} imageStyle={{borderRadius: 8, borderWidth: 1, borderColor: 'gray' }}/>
            <Input
                label='Email'
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={() => passwordRef.current.focus()}
                placeholder='Email'
                returnKeyType='next'
            />
            <Input
                label='Password'
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={() => {}}
                placeholder='Password'
                returnKeyType='done'
                isPassword
                ref={passwordRef}
            />
        </Container>
    )
}

export default Login;