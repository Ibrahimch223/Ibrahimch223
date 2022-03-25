export interface Role {
    titre: string;
    description: string;
    idrole: string;
    
}

// Search Data
export interface SearchResult {
    role: Role[];
    total: number;
}
