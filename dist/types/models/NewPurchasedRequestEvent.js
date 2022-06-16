"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewPurchasedRequestEvent = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class NewPurchasedRequestEvent {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save NewPurchasedRequestEvent entity without an ID");
        await store.set('NewPurchasedRequestEvent', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove NewPurchasedRequestEvent entity without an ID");
        await store.remove('NewPurchasedRequestEvent', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get NewPurchasedRequestEvent entity without an ID");
        const record = await store.get('NewPurchasedRequestEvent', id.toString());
        if (record) {
            return NewPurchasedRequestEvent.create(record);
        }
        else {
            return;
        }
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new NewPurchasedRequestEvent(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.NewPurchasedRequestEvent = NewPurchasedRequestEvent;
