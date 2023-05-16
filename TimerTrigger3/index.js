const fs = require('fs-extra');
const FROM_DIR = "./dummyDataFrom";
const TO_DIR = "./dummyDataTo";
module.exports = async function (context, myTimer) {
    context.log(`[Timer3(Non blocking) start] ${context.invocationId}, ${new Date().toISOString()}`);
    const directories = await fs.readdir(FROM_DIR);
    let coppied =0;
    for (const dir of directories) {
        const stat = await fs.stat(`${FROM_DIR}/${dir}`);
        if (stat.isDirectory()){
            const files = await fs.readdir(`${FROM_DIR}/${dir}`);
            for (const file of files) {
                const stat2 = await fs.stat(`${FROM_DIR}/${dir}/${file}`);
                if (!stat2.isDirectory()) {
                    try {
                        await fs.copy(`${FROM_DIR}/${dir}/${file}`, `${TO_DIR}/${dir}/${file}`, { preserveTimestamps: true });
                        coppied++;
                      } catch (err) {
                        context.log.error('[Timer3]copy', err);
                      }
                }
                // context.log(`[Timer3] ${context.invocationId}, ${FROM_DIR}/${dir}/${file}, ${stat2}, ${new Date().toISOString()}`);
            }
        }
    }
    context.log(`[Timer3(Non blocking) end] ${context.invocationId}, ${coppied}, ${new Date().toISOString()}`);
};
