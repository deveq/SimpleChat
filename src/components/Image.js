import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const Container = styled.View`
    align-self: center;
    margin-bottom: 30px;
`;

const StyledImage = styled.Image`
    background-color: ${({ theme }) => theme.imageBackground};
    width: 100px;
    height: 100px;
`;

const ButtonContainer = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.imageButtonBackground };
    position: absolute;
    bottom: 0;
    right: 0;
    width : 30px;
    height: 30px;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
`;

const ButtonIcon = styled(MaterialIcons).attrs({
    name: 'photo-camera',
    size: 22,
})`
    color: ${({ theme }) => theme.imageButtonIcon};
`;

const PhotoButton = ({ onPress }) => {
    return (
        <ButtonContainer onPress={onPress}>
            <ButtonIcon/>
        </ButtonContainer>
    )
}

const Image = ({ url, imageStyle, rounded, showButton, onChangeImage }) => {

    useEffect(()=> {
        (async () => {
            try {
                if (Platform.OS === 'ios') {
                    const { status } = await Permissions.askAsync(
                        Permissions.CAMERA_ROLL
                        // Permissions.MEDIA_LIBRARY
                    )
                    if (status !== 'granted') {
                        Alert.alert(
                            'Photo Permission',
                            'Please turn on the camera roll permissions.'
                        );
                    }
                }
            } catch (e) {
                Alert.alert('Photo Permission Error.', e.message);
            }
        })();
    }, []);

    const _handleEditButton = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images, //조회하는 자료의 타입
                allowsEditing: true, //이미지 선택 후 편집 단계 진행 여부
                aspect: [1, 1], // android. 이미지 편집 시 x,y의 비율
                //iOS에서는 정사각형으로 불러와지므로 안드로이드에서도 1:1로 되게끔 설정함
                quality : 1, // 압축품질, 0~1 사이, 1이 최대품질
            });

            if (!result.cancelled) {
                onChangeImage(result.uri);
            }
            /**
             * 취소 시 result
             * {
             *  cancelled : true
             * }
             * 
             * 성공 시
             * {
             * cancelled : false,
             * height: 000,
             * type: "image",
             * uri: "file:.../...jpg",
             * width: 000,
             * }
             */
        } catch (e) {
            Alert.alert('Photo Error', e.message);
        }
    }

    return (
        <Container>
            <StyledImage source={{uri: url}} style={imageStyle} rounded={rounded}/>
            { showButton && <PhotoButton onPress={_handleEditButton}/>}
        </Container>
    );
};

Image.defaultProps = {
    rounded : false,
    showButton: false,
    onChangeImage: () => {}
}

Image.propTypes = {
    uri: PropTypes.string,
    imageStyle: PropTypes.object,
    showButton : PropTypes.bool,
    onChangeImage : PropTypes.func,
};

export default Image;