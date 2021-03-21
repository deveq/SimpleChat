import React from 'react';
import styled from 'styled-components';
import { Text } from 'react-native';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
`;

const Signup = ({ navigation }) => (
    <Container>
        <Text style={{ fontSize: 30 }}>Signup Screen</Text>
    </Container>
);

export default Signup;
