"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionNewSessionEvent = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class SessionNewSessionEvent {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save SessionNewSessionEvent entity without an ID");
        await store.set('SessionNewSessionEvent', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove SessionNewSessionEvent entity without an ID");
        await store.remove('SessionNewSessionEvent', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get SessionNewSessionEvent entity without an ID");
        const record = await store.get('SessionNewSessionEvent', id.toString());
        if (record) {
            return SessionNewSessionEvent.create(record);
        }
        else {
            return;
        }
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new SessionNewSessionEvent(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.SessionNewSessionEvent = SessionNewSessionEvent;
