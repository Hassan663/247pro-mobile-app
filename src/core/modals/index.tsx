export type StringIndexer<T> = {
    [key: string]: any;
};

type IBaseModel = any

export interface Page<T extends IBaseModel> {
    list: T[];
    pageSize?: number;
    pageIndex?: number;
    totalRecords: number;
    totalPages?: number; sort?: string;
    sortDirection?: string; hasPreviousPage?: boolean; hasNextPage?: boolean;

}


export type IResponse<T> = {
    isSuccess?: boolean;
    resultMessage?: string;
    statusCode?: string | number;
    validationErrors?: string[];
    resultData?: T | T[] | Page<T>;
};




