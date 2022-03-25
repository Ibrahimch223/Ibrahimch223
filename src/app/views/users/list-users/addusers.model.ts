export interface Addusers {
    iduser: number;
    username: string;
    lastname: string;
    userrole: string;
    email:string;
    image:string;
}
// Search Data
export interface SearchResult {
    users: Addusers[];
    total: number;
}