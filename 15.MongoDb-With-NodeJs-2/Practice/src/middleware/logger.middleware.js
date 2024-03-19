// import fs from "fs";

// const fsPromise = fs.promises;

// async function log(logData) {
//     try{
//         logData = ` \n ${new Date().toString()}. Log Data: + ${logData}`;
//         await fsPromise.writeFile("log.txt", logData);
//     } catch (err) {
//         console.log(err);
//     }   
// }

import winston from "winston";

const logger = winston.createLogger({
        level:"info",
        format: winston.format.json(),
        defaultMeta: {service: "request-logging"},
        transports: [
            new winston.transports.File({filename: "logs.txt"})
        ]
    });

const logMiddleware = async(req, res, next) => {
    let logData = `\n ${req.url} - ${JSON.stringify(req.body)}` 
    logger.info(logData);

    next();
}

export default logMiddleware;