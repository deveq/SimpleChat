//올바른 이메일 형식인지 확인하는 함수
export const validateEmail = email => {
    const regex = /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]{0,3}$/;
    return regex.test(email);
}

//입력된 문자열에서 공백을 모두 제거하는 함수
export const removeWhitespace = text => {
    const regex = /\s/g;
    return text.replace(regex,'');
}