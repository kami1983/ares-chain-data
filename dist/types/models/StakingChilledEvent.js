"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakingChilledEvent = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class StakingChilledEvent {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save StakingChilledEvent entity without an ID");
        await store.set('StakingChilledEvent', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove StakingChilledEvent entity without an ID");
        await store.remove('StakingChilledEvent', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get StakingChilledEvent entity without an ID");
        const record = await store.get('StakingChilledEvent', id.toString());
        if (record) {
            return StakingChilledEvent.create(record);
        }
        else {
            return;
        }
    }
    static async getByWhoId(whoId) {
        const records = await store.getByField('StakingChilledEvent', 'whoId', whoId);
        return records.map(record => StakingChilledEvent.create(record));
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new StakingChilledEvent(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.StakingChilledEvent = StakingChilledEvent;
