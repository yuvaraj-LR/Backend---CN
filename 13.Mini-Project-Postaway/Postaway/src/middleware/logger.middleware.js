import winston from "winston";

const logger = winston.createLogger({
        level:"info",
        format: winston.format.json(),
        defaultMeta: {service: "request-logging"},
        transports: [
            new winston.transports.File({filename: "logs.txt"})
        ]
    });

const loggerMiddleware = async(req, res, next) => {
    if(!req.url.includes("signIn") || !req.url.includes("signUp")) {
        console.log(req.body, "bodddyyy....");
        let logData = `\n ${req.url} - ${JSON.stringify(req.body)}` 
        logger.info(logData);
    }

    next();
}

export default loggerMiddleware;