import winston from 'winston';

const logger = () => {
  const customFormat = winston.format.printf(info => {
    return `[${info.timestamp}] ${info.level}: ${info.message}`;
  });

  return winston.createLogger({
    format: winston.format.combine(
      winston.format(info => {
        info.level = info.level.toUpperCase();
        return info;
      })(),
      winston.format.timestamp({
        format: 'YY-MM-DD HH:MM:SS',
      }),
      customFormat,
      winston.format.colorize({
        colors: { error: 'red', warn: 'yellow', info: 'cyan', debug: 'green' },
        all: true,
      }),
    ),
    transports: [new winston.transports.Console()],
  });
};

export default logger();
