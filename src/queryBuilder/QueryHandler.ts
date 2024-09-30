/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Document, FilterQuery } from 'mongoose';


export interface IPaginationResult<> {

    totalDocuments: number;
    limitPage: number;
    currentPage: number;
    totalPage: number
}



interface IQuery {
    searchTerm?: string;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
    page?: string;
    limit?: string;
    userId?: string;
}

class QueryHandler<T extends Document> {
    // default value
    private query: IQuery;
    private queryObj: FilterQuery<T> = {};
    private sortField: string | null = null;
    private sortOrder: 1 | -1 | null = -1;
    private page: number = 1;
    private limit: number = 5;
    private model: Model<T>;


    constructor(query: IQuery, model: Model<T>) {
        this.query = query;
        this.model = model;
    }

    search(fields: (keyof T)[]): this {
        if (this.query.searchTerm) {
            this.queryObj.$or = fields.map(field => ({
                [field]: { $regex: this.query.searchTerm, $options: 'i' }
            })) as FilterQuery<T>[];
        }
        return this;
    }

    sort(): this {
        if (this.query.sortField && this.query.sortOrder) {


            this.sortField = this.query.sortField;
            this.sortOrder = this.query.sortOrder === 'desc' ? -1 : 1;
        }
        return this;
    }

    paginate(): this {
        if (this.query.page) {
            this.page = parseInt(this.query.page, 10) || 1;
        }
        if (this.query.limit) {
            this.limit = parseInt(this.query.limit, 10) || 10;
        }
        return this;
    }

    async execute(): Promise<T[]> {
        let query = this.model.find(this.queryObj);

        const queryParams: { userId?: string } = {};
        if (this.query.userId) {
            queryParams.userId = this.query.userId;
            query = this.model.find(queryParams)
        }

        if (this.query.sortField) {
            let sortObj: Record<string, any> = {};

            sortObj[this.query.sortField] = this.sortOrder;
            query = query.sort(sortObj);
        }
        const skip = (this.page - 1) * this.limit;
        query = query.skip(skip).limit(this.limit);

        return await query.exec();
    }
    async getPaginationResult(): Promise<IPaginationResult> {
        const query: { userId?: string } = {};

        // If userId exists in the query, add it to the query object
        if (this.query.userId) {
            query.userId = this.query.userId;
        }
        const totalDocuments = await this.model.countDocuments(query).exec();

        const totalPage = Math.ceil(totalDocuments / this.limit);
        return {
            totalDocuments,
            limitPage: this.limit,
            currentPage: this.page,
            totalPage: totalPage
        };
    }
}

export default QueryHandler;