"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientCountOfValidators = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class InsufficientCountOfValidators {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save InsufficientCountOfValidators entity without an ID");
        await store.set('InsufficientCountOfValidators', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove InsufficientCountOfValidators entity without an ID");
        await store.remove('InsufficientCountOfValidators', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get InsufficientCountOfValidators entity without an ID");
        const record = await store.get('InsufficientCountOfValidators', id.toString());
        if (record) {
            return InsufficientCountOfValidators.create(record);
        }
        else {
            return;
        }
    }
    static async getByPurchased_eventId(purchased_eventId) {
        const records = await store.getByField('InsufficientCountOfValidators', 'purchased_eventId', purchased_eventId);
        return records.map(record => InsufficientCountOfValidators.create(record));
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new InsufficientCountOfValidators(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.InsufficientCountOfValidators = InsufficientCountOfValidators;
