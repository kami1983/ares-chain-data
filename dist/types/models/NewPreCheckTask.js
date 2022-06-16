"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewPreCheckTask = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class NewPreCheckTask {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save NewPreCheckTask entity without an ID");
        await store.set('NewPreCheckTask', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove NewPreCheckTask entity without an ID");
        await store.remove('NewPreCheckTask', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get NewPreCheckTask entity without an ID");
        const record = await store.get('NewPreCheckTask', id.toString());
        if (record) {
            return NewPreCheckTask.create(record);
        }
        else {
            return;
        }
    }
    static async getByStash_account(stash_account) {
        const records = await store.getByField('NewPreCheckTask', 'stash_account', stash_account);
        return records.map(record => NewPreCheckTask.create(record));
    }
    static async getByCheck_resultId(check_resultId) {
        const records = await store.getByField('NewPreCheckTask', 'check_resultId', check_resultId);
        return records.map(record => NewPreCheckTask.create(record));
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new NewPreCheckTask(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.NewPreCheckTask = NewPreCheckTask;
