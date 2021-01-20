export class Process {
    private process: NodeJS.Process;
    private eventsException: ((e: Error) => void)[] = [];
    private eventsStop: (() => void)[] = [];

    constructor (process: NodeJS.Process) {
        this.process = process;

        this.process.once('SIGUSR2', () => {
            this.eventsStop.forEach((e) => e());

            this.process.kill(process.pid, 'SIGUSR2');
        });

        this.process.on('uncaughtException', (error) => {
            this.eventsException.forEach((e) => e(error));

            this.process.kill(process.pid, 'SIGINT');
        });
    }

    public onException (callback: (e: Error) => void) {
        this.eventsException.push(callback);

        const index = this.eventsException.length - 1;

        return (): void => {
            this.eventsException.splice(index, 1);
        };
    }

    public onStop (callback: () => void) {
        this.eventsStop.push(callback);

        const index = this.eventsStop.length - 1;

        return (): void => {
            this.eventsStop.splice(index, 1);
        };
    }
}

export default new Process(process);
