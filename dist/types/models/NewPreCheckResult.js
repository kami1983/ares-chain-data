"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewPreCheckResult = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class NewPreCheckResult {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save NewPreCheckResult entity without an ID");
        await store.set('NewPreCheckResult', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove NewPreCheckResult entity without an ID");
        await store.remove('NewPreCheckResult', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get NewPreCheckResult entity without an ID");
        const record = await store.get('NewPreCheckResult', id.toString());
        if (record) {
            return NewPreCheckResult.create(record);
        }
        else {
            return;
        }
    }
    static async getByStash_account(stash_account) {
        const records = await store.getByField('NewPreCheckResult', 'stash_account', stash_account);
        return records.map(record => NewPreCheckResult.create(record));
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new NewPreCheckResult(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.NewPreCheckResult = NewPreCheckResult;
