import { Startable } from 'startable';
export declare class Discoverlite extends Startable {
    private db;
    private registerStatement;
    private deregisterStatement;
    constructor(path: string, id: string, location: string);
    protected Startable$rawStart(): Promise<void>;
    protected Startable$rawStop(): Promise<void>;
}
