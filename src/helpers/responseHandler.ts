import { Response } from "express";
import { IPaginationResult } from "../queryBuilder/QueryHandler";

type GenericResProps<T> = {
    status: number;
    success: boolean;
    message: string;
    data: T;
    accessToken?: string;
    metaData?: IPaginationResult

}

const sendResponse = <T>(res: Response, props: GenericResProps<T>) => {
    return res.status(props.status).json(props);
}

export default sendResponse