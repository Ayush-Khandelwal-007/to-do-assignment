const authentication = async (loginInfo) => {
    return new Promise((resolve) => {
        if (loginInfo.username === 'manager' && loginInfo.password === 'pass123') {
            resolve(true);
        }
        throw new Error('Invalid credentials');
    });
};

export default authentication;
