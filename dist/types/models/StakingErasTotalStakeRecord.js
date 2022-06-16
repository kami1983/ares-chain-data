"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakingErasTotalStakeRecord = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class StakingErasTotalStakeRecord {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save StakingErasTotalStakeRecord entity without an ID");
        await store.set('StakingErasTotalStakeRecord', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove StakingErasTotalStakeRecord entity without an ID");
        await store.remove('StakingErasTotalStakeRecord', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get StakingErasTotalStakeRecord entity without an ID");
        const record = await store.get('StakingErasTotalStakeRecord', id.toString());
        if (record) {
            return StakingErasTotalStakeRecord.create(record);
        }
        else {
            return;
        }
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new StakingErasTotalStakeRecord(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.StakingErasTotalStakeRecord = StakingErasTotalStakeRecord;
