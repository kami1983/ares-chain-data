"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TotalPurchaseRewardToken = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class TotalPurchaseRewardToken {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save TotalPurchaseRewardToken entity without an ID");
        await store.set('TotalPurchaseRewardToken', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove TotalPurchaseRewardToken entity without an ID");
        await store.remove('TotalPurchaseRewardToken', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get TotalPurchaseRewardToken entity without an ID");
        const record = await store.get('TotalPurchaseRewardToken', id.toString());
        if (record) {
            return TotalPurchaseRewardToken.create(record);
        }
        else {
            return;
        }
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new TotalPurchaseRewardToken(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.TotalPurchaseRewardToken = TotalPurchaseRewardToken;
