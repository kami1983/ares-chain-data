"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayForPurchase = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class PayForPurchase {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save PayForPurchase entity without an ID");
        await store.set('PayForPurchase', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove PayForPurchase entity without an ID");
        await store.remove('PayForPurchase', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get PayForPurchase entity without an ID");
        const record = await store.get('PayForPurchase', id.toString());
        if (record) {
            return PayForPurchase.create(record);
        }
        else {
            return;
        }
    }
    static async getByFee(fee) {
        const records = await store.getByField('PayForPurchase', 'fee', fee);
        return records.map(record => PayForPurchase.create(record));
    }
    static async getByPurchased_eventId(purchased_eventId) {
        const records = await store.getByField('PayForPurchase', 'purchased_eventId', purchased_eventId);
        return records.map(record => PayForPurchase.create(record));
    }
    static async getByUnreserve_balance(unreserve_balance) {
        const records = await store.getByField('PayForPurchase', 'unreserve_balance', unreserve_balance);
        return records.map(record => PayForPurchase.create(record));
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new PayForPurchase(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.PayForPurchase = PayForPurchase;
