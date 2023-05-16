const fs = require('fs-extra');
const FROM_DIR = "./dummyDataFrom";
const TO_DIR = "./dummyDataTo";
module.exports = async function (context, myTimer) {
    context.log(`[Timer2(blocking) start] PID:${process.pid}, InvocationId:${context.invocationId}, ${new Date().toISOString()}`);
    const directories = fs.readdirSync(FROM_DIR);
    let coppied=0;
    for (const dir of directories) {
        const stat = fs.statSync(`${FROM_DIR}/${dir}`);
        if (stat.isDirectory()){
            const files = fs.readdirSync(`${FROM_DIR}/${dir}`);
            for (const file of files) {
                const stat2 = fs.statSync(`${FROM_DIR}/${dir}/${file}`);
                if (!stat2.isDirectory()) {
                    try {
                        fs.copySync(`${FROM_DIR}/${dir}/${file}`, `${TO_DIR}/${dir}/${file}`, { preserveTimestamps: true });
                        coppied++;
                    } catch (err) {
                        context.log.error('[Timer2]copySync', err);
                      }
                }
                // context.log(`[Timer2] PID:${process.pid}, InvocationId:${context.invocationId}, ${FROM_DIR}/${dir}/${file}, ${stat2}, ${new Date().toISOString()}`);
            }
        }
    }
    context.log(`[Timer2(blocking) end] PID:${process.pid}, InvocationId:${context.invocationId}, ${coppied}, ${new Date().toISOString()}`);
};
