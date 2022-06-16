"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImOnlineSomeOfflineEvent = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class ImOnlineSomeOfflineEvent {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save ImOnlineSomeOfflineEvent entity without an ID");
        await store.set('ImOnlineSomeOfflineEvent', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove ImOnlineSomeOfflineEvent entity without an ID");
        await store.remove('ImOnlineSomeOfflineEvent', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get ImOnlineSomeOfflineEvent entity without an ID");
        const record = await store.get('ImOnlineSomeOfflineEvent', id.toString());
        if (record) {
            return ImOnlineSomeOfflineEvent.create(record);
        }
        else {
            return;
        }
    }
    static async getByWhoId(whoId) {
        const records = await store.getByField('ImOnlineSomeOfflineEvent', 'whoId', whoId);
        return records.map(record => ImOnlineSomeOfflineEvent.create(record));
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new ImOnlineSomeOfflineEvent(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.ImOnlineSomeOfflineEvent = ImOnlineSomeOfflineEvent;
