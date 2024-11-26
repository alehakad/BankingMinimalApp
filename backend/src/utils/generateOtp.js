import otpGenerator from 'otp-generator';

function generateOtp() {
    return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
}

export default generateOtp;