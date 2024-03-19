// Please don't change the pre-written code
// Import the necessary modules here
import winston from "winston";

export const logger = winston.createLogger({
  // Write your code here
  level:"info",
  format: winston.format?.json(),
  defaultMeta: {service: "request-logging"},
  transports: [
      new winston.transports.File({filename: "combined.log"})
  ]
});
