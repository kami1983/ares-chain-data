"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRewardToken = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class PurchaseRewardToken {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save PurchaseRewardToken entity without an ID");
        await store.set('PurchaseRewardToken', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove PurchaseRewardToken entity without an ID");
        await store.remove('PurchaseRewardToken', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get PurchaseRewardToken entity without an ID");
        const record = await store.get('PurchaseRewardToken', id.toString());
        if (record) {
            return PurchaseRewardToken.create(record);
        }
        else {
            return;
        }
    }
    static async getByEra_num(era_num) {
        const records = await store.getByField('PurchaseRewardToken', 'era_num', era_num);
        return records.map(record => PurchaseRewardToken.create(record));
    }
    static async getByWho(who) {
        const records = await store.getByField('PurchaseRewardToken', 'who', who);
        return records.map(record => PurchaseRewardToken.create(record));
    }
    static async getByReward(reward) {
        const records = await store.getByField('PurchaseRewardToken', 'reward', reward);
        return records.map(record => PurchaseRewardToken.create(record));
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new PurchaseRewardToken(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.PurchaseRewardToken = PurchaseRewardToken;
