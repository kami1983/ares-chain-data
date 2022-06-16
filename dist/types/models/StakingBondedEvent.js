"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakingBondedEvent = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class StakingBondedEvent {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save StakingBondedEvent entity without an ID");
        await store.set('StakingBondedEvent', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove StakingBondedEvent entity without an ID");
        await store.remove('StakingBondedEvent', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get StakingBondedEvent entity without an ID");
        const record = await store.get('StakingBondedEvent', id.toString());
        if (record) {
            return StakingBondedEvent.create(record);
        }
        else {
            return;
        }
    }
    static async getByWhoId(whoId) {
        const records = await store.getByField('StakingBondedEvent', 'whoId', whoId);
        return records.map(record => StakingBondedEvent.create(record));
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new StakingBondedEvent(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.StakingBondedEvent = StakingBondedEvent;
