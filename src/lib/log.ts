export default class Logger {
    static date: string;
    static {
        Logger.date = new Date().toDateString();
    }

    static log(...message: unknown[]) {
        console.log(`[${Logger.date}]:`, message);
    }

    static warn(...message: unknown[]) {
        console.warn(`[${Logger.date}]:`, message);
    }

    static error(...message: unknown[]) {
        console.error(`[${Logger.date}]:`, message);
    }

    static info(...message: unknown[]) {
        console.info(`[${Logger.date}]:`, message);
    }

    static table(message: unknown[]) {
        Logger.log();
        console.table(message);
    }
}
