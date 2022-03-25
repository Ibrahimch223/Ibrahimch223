export interface Deliveryman {
    date: string;
    type: string;
    coin: string;
    value: string;
    usd: string;
    status: string;
}

// Search Data
export interface SearchResult {
    deliveryman: Deliveryman[];
    total: number;
}
