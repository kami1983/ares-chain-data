"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErasTotalStakeRecord = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class ErasTotalStakeRecord {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save ErasTotalStakeRecord entity without an ID");
        await store.set('ErasTotalStakeRecord', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove ErasTotalStakeRecord entity without an ID");
        await store.remove('ErasTotalStakeRecord', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get ErasTotalStakeRecord entity without an ID");
        const record = await store.get('ErasTotalStakeRecord', id.toString());
        if (record) {
            return ErasTotalStakeRecord.create(record);
        }
        else {
            return;
        }
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new ErasTotalStakeRecord(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.ErasTotalStakeRecord = ErasTotalStakeRecord;
