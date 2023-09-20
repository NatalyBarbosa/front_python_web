export interface TodoGet {
    id: string;
    nome: string;
    decricao: string;
    created: string;
    __v: number;
    feito: boolean;
}
export interface TodoPost {
    nome: string;
    feito?: boolean;
}

export interface TodoState {

    list: TodoGet[];
    isLoading: boolean;
}

export type ReturnType<T> = {
    data: T;
    message?: string;
};