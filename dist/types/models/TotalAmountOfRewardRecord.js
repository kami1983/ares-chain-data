"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TotalAmountOfRewardRecord = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class TotalAmountOfRewardRecord {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save TotalAmountOfRewardRecord entity without an ID");
        await store.set('TotalAmountOfRewardRecord', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove TotalAmountOfRewardRecord entity without an ID");
        await store.remove('TotalAmountOfRewardRecord', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get TotalAmountOfRewardRecord entity without an ID");
        const record = await store.get('TotalAmountOfRewardRecord', id.toString());
        if (record) {
            return TotalAmountOfRewardRecord.create(record);
        }
        else {
            return;
        }
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new TotalAmountOfRewardRecord(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.TotalAmountOfRewardRecord = TotalAmountOfRewardRecord;
