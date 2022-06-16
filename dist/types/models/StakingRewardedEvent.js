"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakingRewardedEvent = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class StakingRewardedEvent {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save StakingRewardedEvent entity without an ID");
        await store.set('StakingRewardedEvent', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove StakingRewardedEvent entity without an ID");
        await store.remove('StakingRewardedEvent', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get StakingRewardedEvent entity without an ID");
        const record = await store.get('StakingRewardedEvent', id.toString());
        if (record) {
            return StakingRewardedEvent.create(record);
        }
        else {
            return;
        }
    }
    static async getByWhoId(whoId) {
        const records = await store.getByField('StakingRewardedEvent', 'whoId', whoId);
        return records.map(record => StakingRewardedEvent.create(record));
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new StakingRewardedEvent(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.StakingRewardedEvent = StakingRewardedEvent;
