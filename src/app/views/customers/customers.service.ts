import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortDirection } from './customers-sortable.directive';
import { Customers, SearchResult } from './customers.model';
import { customersData } from './data';
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
 * @param customers Table field value
 * @param column Fetch the column
 * @param direction Sort direction Ascending or Descending
 */
function sort(customers: Customers[], column: string, direction: string): Customers[] {
    if (direction === '') {
        return customers;
    } else {
        return [...customers].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

/**
 * Table Data Match with Search input
 * @param customers Table field value fetch
 * @param term Search the value
 */
function matches(customers: Customers, term: string, pipe: PipeTransform) {
    return customers.status.toLowerCase().includes(term)
        || customers.date.toLowerCase().includes(term)
        || customers.type.toLowerCase().includes(term)
        || customers.coin.toLowerCase().includes(term)
        || customers.value.toLowerCase().includes(term)
        || customers.usd.toLowerCase().includes(term);
}

@Injectable({
    providedIn: 'root'
})

export class CustomersService {
    readonly APIUrl="http://localhost:53535/api";
    // tslint:disable-next-line: variable-name
    private _loading$ = new BehaviorSubject<boolean>(true);
    // tslint:disable-next-line: variable-name
    private _search$ = new Subject<void>();
    // tslint:disable-next-line: variable-name
    private _customers$ = new BehaviorSubject<Customers[]>([]);
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
            this._customers$.next(result.customers);
            this._total$.next(result.total);
        });

        this._search$.next();
    }

    /**api */
    getcustomersList():Observable<any[]>{
        return this.http.get<any>(this.APIUrl+'/customers');
    }
    
    addcustomers(val:any){
        return this.http.post(this.APIUrl+'/customers',val);
    }
    
    updatecustomers(val:any){
        return this.http.put(this.APIUrl+'/customers',val);
    }
    
    deletecustomers(val:any){
        return this.http.delete(this.APIUrl+'/customers/'+val);
    }

    /**
     * Returns the value
     */
    get customers$() { return this._customers$.asObservable(); }
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
        let customers = sort(customersData, sortColumn, sortDirection);

        // 2. filter
        customers = customers.filter(table => matches(table, searchTerm, this.pipe));
        const total = customers.length;

        // 3. paginate
        this.totalRecords = customers.length;
        this._state.startIndex = (page - 1) * this.pageSize;
        this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
        if (this.endIndex > this.totalRecords) {
            this.endIndex = this.totalRecords;
        }
        customers = customers.slice(this._state.startIndex, this._state.endIndex);

        return of(
            { customers, total }
        );
    }
}
