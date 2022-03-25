import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortDirection } from './category-sortable.directive';
import { Category, SearchResult } from './category.model';
import { categoryData } from './data';
import { HttpClient } from '@angular/common/http';


interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: string;
    sortDirection: SortDirection;
    startIndex: number;
    endIndex: number;
    totalRecords: number;
}

function compare(v1, v2) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

/**
 * Sort the table data
 * @param category Table field value
 * @param column Fetch the column
 * @param direction Sort direction Ascending or Descending
 */
function sort(category: Category[], column: string, direction: string): Category[] {
    if (direction === '') {
        return category;
    } else {
        return [...category].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

/**
 * Table Data Match with Search input
 * @param category Table field value fetch
 * @param term Search the value
 */
function matches(category: Category, term: string, pipe: PipeTransform) {
    return category.status.toLowerCase().includes(term)
        || category.date.toLowerCase().includes(term)
        || category.type.toLowerCase().includes(term)
        || category.coin.toLowerCase().includes(term)
        || category.value.toLowerCase().includes(term)
        || category.usd.toLowerCase().includes(term);
}

@Injectable({
    providedIn: 'root'
})

export class CategoryService {
    readonly APIUrl="http://localhost:53535/api";
    // tslint:disable-next-line: variable-name
    private _loading$ = new BehaviorSubject<boolean>(true);
    // tslint:disable-next-line: variable-name
    private _search$ = new Subject<void>();
    // tslint:disable-next-line: variable-name
    private _category$ = new BehaviorSubject<Category[]>([]);
    // tslint:disable-next-line: variable-name
    private _total$ = new BehaviorSubject<number>(0);

    // tslint:disable-next-line: variable-name
    private _state: State = {
        page: 1,
        pageSize: 10,
        searchTerm: '',
        sortColumn: '',
        sortDirection: '',
        startIndex: 1,
        endIndex: 10,
        totalRecords: 0
    };

    constructor(private pipe: DecimalPipe,private http: HttpClient) {
        this._search$.pipe(
            tap(() => this._loading$.next(true)),
            debounceTime(200),
            switchMap(() => this._search()),
            delay(200),
            tap(() => this._loading$.next(false))
        ).subscribe(result => {
            this._category$.next(result.category);
            this._total$.next(result.total);
        });

        this._search$.next();
    }

    /**api */
    getcategoryList():Observable<any[]>{
        return this.http.get<any>(this.APIUrl+'/category');
    }
    
    addcategory(val:any){
        return this.http.post(this.APIUrl+'/category',val);
    }
    
    updatecategory(val:any){
        return this.http.put(this.APIUrl+'/category',val);
    }
    
    deletecategory(val:any){
        return this.http.delete(this.APIUrl+'/category/'+val);
    }
    
    getAllcategory():Observable<any[]>{
        return this.http.get<any[]>(this.APIUrl+'/category/GetAllcategory');
    }

    getAllrole():Observable<any[]>{
        return this.http.get<any[]>(this.APIUrl+'/role/GetAllrole');
    }

    /**
     * Returns the value
     */
    get category$() { return this._category$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }
    get startIndex() { return this._state.startIndex; }
    get endIndex() { return this._state.endIndex; }
    get totalRecords() { return this._state.totalRecords; }

    /**
     * set the value
     */
    // tslint:disable-next-line: adjacent-overload-signatures
    set page(page: number) { this._set({ page }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set pageSize(pageSize: number) { this._set({ pageSize }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    // tslint:disable-next-line: adjacent-overload-signatures
    set startIndex(startIndex: number) { this._set({ startIndex }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set endIndex(endIndex: number) { this._set({ endIndex }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set totalRecords(totalRecords: number) { this._set({ totalRecords }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
    set sortColumn(sortColumn: string) { this._set({ sortColumn }); }
    set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    /**
     * Search Method
     */
    private _search(): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

        // 1. sort
        let category = sort(categoryData, sortColumn, sortDirection);

        // 2. filter
        category = category.filter(table => matches(table, searchTerm, this.pipe));
        const total = category.length;

        // 3. paginate
        this.totalRecords = category.length;
        this._state.startIndex = (page - 1) * this.pageSize;
        this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
        if (this.endIndex > this.totalRecords) {
            this.endIndex = this.totalRecords;
        }
        category = category.slice(this._state.startIndex, this._state.endIndex);

        return of(
            { category, total }
        );
    }
}
