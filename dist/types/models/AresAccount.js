"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AresAccount = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class AresAccount {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save AresAccount entity without an ID");
        await store.set('AresAccount', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove AresAccount entity without an ID");
        await store.remove('AresAccount', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get AresAccount entity without an ID");
        const record = await store.get('AresAccount', id.toString());
        if (record) {
            return AresAccount.create(record);
        }
        else {
            return;
        }
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new AresAccount(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.AresAccount = AresAccount;
