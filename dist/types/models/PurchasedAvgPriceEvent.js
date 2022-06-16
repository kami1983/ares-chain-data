"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasedAvgPriceEvent = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class PurchasedAvgPriceEvent {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save PurchasedAvgPriceEvent entity without an ID");
        await store.set('PurchasedAvgPriceEvent', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove PurchasedAvgPriceEvent entity without an ID");
        await store.remove('PurchasedAvgPriceEvent', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get PurchasedAvgPriceEvent entity without an ID");
        const record = await store.get('PurchasedAvgPriceEvent', id.toString());
        if (record) {
            return PurchasedAvgPriceEvent.create(record);
        }
        else {
            return;
        }
    }
    static async getByPurchased_eventId(purchased_eventId) {
        const records = await store.getByField('PurchasedAvgPriceEvent', 'purchased_eventId', purchased_eventId);
        return records.map(record => PurchasedAvgPriceEvent.create(record));
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new PurchasedAvgPriceEvent(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.PurchasedAvgPriceEvent = PurchasedAvgPriceEvent;
