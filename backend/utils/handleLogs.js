const printLogs = (msg) => {
    const environment = process.env.NODE_ENV
    if (environment === 'pre') {
        console.log(msg);
    }
}

module.exports = {printLogs}