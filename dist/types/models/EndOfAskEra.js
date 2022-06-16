"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndOfAskEra = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class EndOfAskEra {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save EndOfAskEra entity without an ID");
        await store.set('EndOfAskEra', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove EndOfAskEra entity without an ID");
        await store.remove('EndOfAskEra', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get EndOfAskEra entity without an ID");
        const record = await store.get('EndOfAskEra', id.toString());
        if (record) {
            return EndOfAskEra.create(record);
        }
        else {
            return;
        }
    }
    static async getBySession_index(session_index) {
        const records = await store.getByField('EndOfAskEra', 'session_index', session_index);
        return records.map(record => EndOfAskEra.create(record));
    }
    static async getByEra_num(era_num) {
        const records = await store.getByField('EndOfAskEra', 'era_num', era_num);
        return records.map(record => EndOfAskEra.create(record));
    }
    static async getByEra_income(era_income) {
        const records = await store.getByField('EndOfAskEra', 'era_income', era_income);
        return records.map(record => EndOfAskEra.create(record));
    }
    static async getByEra_points(era_points) {
        const records = await store.getByField('EndOfAskEra', 'era_points', era_points);
        return records.map(record => EndOfAskEra.create(record));
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new EndOfAskEra(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.EndOfAskEra = EndOfAskEra;
