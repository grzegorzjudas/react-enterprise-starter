export class Process {
    private process: NodeJS.Process;
    private eventsException: Function[] = [];
    private eventsStop: Function[] = [];

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

    public onException (callback: Function): Function {
        this.eventsException.push(callback);

        const index = this.eventsException.length - 1;

        return () => {
            this.eventsException.splice(index, 1);
        };
    }

    public onStop (callback: Function): Function {
        this.eventsStop.push(callback);

        const index = this.eventsStop.length - 1;

        return () => {
            this.eventsStop.splice(index, 1);
        };
    }
}

export default new Process(process);
