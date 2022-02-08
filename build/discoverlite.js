"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discoverlite = void 0;
const startable_1 = require("startable");
const Database = require("better-sqlite3");
class Discoverlite extends startable_1.Startable {
    constructor(path, id, location) {
        super();
        this.db = new Database(path, { fileMustExist: true });
        this.registerStatement = this.db.prepare(`
			INSERT INTO registry (id, location) VALUES (?, ?);
		`).bind(id, location);
        this.deregisterStatement = this.db.prepare(`
			DELETE FROM registry WHERE id = ?;
		`).bind(id);
    }
    async Startable$rawStart() {
        this.db.transaction(() => {
            this.deregisterStatement.run();
            this.registerStatement.run();
        });
    }
    async Startable$rawStop() {
        this.deregisterStatement.run();
    }
}
exports.Discoverlite = Discoverlite;
//# sourceMappingURL=discoverlite.js.map