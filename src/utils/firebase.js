import * as firebase from 'firebase';
import config from '../../firebase.json';

const app = firebase.initializeApp(config);

const Auth = app.auth();

export const login = async ({ email, password }) => {
    const { user } = await Auth.signInWithEmailAndPassword(email, password);
    return user;
};

const uploadImage = async uri => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            resolve(xhr.response);
        };
        xhr.onerror = () => {
            reject(new TypeError('Network request failed'));
        };

        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    })
};


export const signup = async ({ email, password, name, photoUrl }) => {
    const { user } = await Auth.createUserWithEmailAndPassword(email, password);
    const storageUrl = photoUrl.startsWith('https')
    ? photoUrl
    : await uploadImage(photoUrl);
    await user.updateProfile({
        displayName : name,
        photoURL : storaggeUrl,
    })
    return user;
}
