export interface Customers {
    date: string;
    type: string;
    coin: string;
    value: string;
    usd: string;
    status: string;
}

// Search Data
export interface SearchResult {
    customers: Customers[];
    total: number;
}
