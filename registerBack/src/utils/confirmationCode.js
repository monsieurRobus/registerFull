const confirmationCode = () => {
    const code = Math.floor(Math.random() * 1000000);
    return code;
}

module.exports = { confirmationCode }