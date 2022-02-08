import { Startable } from 'startable';
import Database = require('better-sqlite3');

export class Discoverlite extends Startable {
	private db: Database.Database;
	private registerStatement: Database.Statement;
	private deregisterStatement: Database.Statement;

	constructor(
		path: string,
		id: string,
		location: string,
	) {
		super();

		this.db = new Database(path, { fileMustExist: true });
		this.registerStatement = this.db.prepare(`
			INSERT INTO registry (id, location) VALUES (?, ?);
		`).bind(id, location);
		this.deregisterStatement = this.db.prepare(`
			DELETE FROM registry WHERE id = ?;
		`).bind(id);
	}

	protected async Startable$rawStart(): Promise<void> {
		this.db.transaction(() => {
			this.deregisterStatement.run();
			this.registerStatement.run();
		});
	}

	protected async Startable$rawStop(): Promise<void> {
		this.deregisterStatement.run();
	}
}
