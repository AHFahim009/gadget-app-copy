"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class QueryHandler {
    constructor(query, model) {
        this.queryObj = {};
        this.sortField = null;
        this.sortOrder = -1;
        this.page = 1;
        this.limit = 5;
        this.query = query;
        this.model = model;
    }
    search(fields) {
        if (this.query.searchTerm) {
            this.queryObj.$or = fields.map(field => ({
                [field]: { $regex: this.query.searchTerm, $options: 'i' }
            }));
        }
        return this;
    }
    sort() {
        if (this.query.sortField && this.query.sortOrder) {
            this.sortField = this.query.sortField;
            this.sortOrder = this.query.sortOrder === 'desc' ? -1 : 1;
        }
        return this;
    }
    paginate() {
        if (this.query.page) {
            this.page = parseInt(this.query.page, 10) || 1;
        }
        if (this.query.limit) {
            this.limit = parseInt(this.query.limit, 10) || 10;
        }
        return this;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            let query = this.model.find(this.queryObj);
            const queryParams = {};
            if (this.query.userId) {
                queryParams.userId = this.query.userId;
                query = this.model.find(queryParams);
            }
            if (this.query.sortField) {
                let sortObj = {};
                sortObj[this.query.sortField] = this.sortOrder;
                query = query.sort(sortObj);
            }
            const skip = (this.page - 1) * this.limit;
            query = query.skip(skip).limit(this.limit);
            return yield query.exec();
        });
    }
    getPaginationResult() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {};
            // If userId exists in the query, add it to the query object
            if (this.query.userId) {
                query.userId = this.query.userId;
            }
            const totalDocuments = yield this.model.countDocuments(query).exec();
            const totalPage = Math.ceil(totalDocuments / this.limit);
            return {
                totalDocuments,
                limitPage: this.limit,
                currentPage: this.page,
                totalPage: totalPage
            };
        });
    }
}
exports.default = QueryHandler;
