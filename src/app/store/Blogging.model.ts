export interface BloggingObj {
    id: number;
    createdDate: string;
    type: string;
    heading: string;
    para: string;
    author: string;
}

export interface AppState {
    readonly product: BloggingObj[];
}
