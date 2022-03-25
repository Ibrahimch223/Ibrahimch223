export interface Category {
    date: string;
    type: string;
    coin: string;
    value: string;
    usd: string;
    status: string;
}

// Search Data
export interface SearchResult {
    category: Category[];
    total: number;
}
