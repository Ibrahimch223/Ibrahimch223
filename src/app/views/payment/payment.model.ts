export interface Payment {
    date: string;
    type: string;
    coin: string;
    value: string;
    usd: string;
    status: string;
}

// Search Data
export interface SearchResult {
    payment: Payment[];
    total: number;
}
