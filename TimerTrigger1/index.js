module.exports = async function (context, myTimer) {
    context.log(`[Timer1 start] ${context.invocationId}, ${new Date().toISOString()}`);
    let loop = async () => {
        return new Promise((resolve) => {
            let i = 1;
            let timer = setInterval(() => {
                context.log(`Loop of ${context.invocationId}, ${i}, ${new Date().toISOString()}`)
                if (i >= 10) {
                    clearTimeout(timer);
                    resolve();
                } else {
                    i++;
                }
            }, 1000);
        })
    }
    await loop();
    context.log(`[Timer1 end]: ${context.invocationId}, ${new Date().toISOString()}`);
};
