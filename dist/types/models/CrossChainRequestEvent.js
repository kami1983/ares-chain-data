"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossChainRequestEvent = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class CrossChainRequestEvent {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save CrossChainRequestEvent entity without an ID");
        await store.set('CrossChainRequestEvent', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove CrossChainRequestEvent entity without an ID");
        await store.remove('CrossChainRequestEvent', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get CrossChainRequestEvent entity without an ID");
        const record = await store.get('CrossChainRequestEvent', id.toString());
        if (record) {
            return CrossChainRequestEvent.create(record);
        }
        else {
            return;
        }
    }
    static async getByCreate_bn(create_bn) {
        const records = await store.getByField('CrossChainRequestEvent', 'create_bn', create_bn);
        return records.map(record => CrossChainRequestEvent.create(record));
    }
    static async getByAmount(amount) {
        const records = await store.getByField('CrossChainRequestEvent', 'amount', amount);
        return records.map(record => CrossChainRequestEvent.create(record));
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new CrossChainRequestEvent(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.CrossChainRequestEvent = CrossChainRequestEvent;
