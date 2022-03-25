import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SortDirection } from './role-sortable.directive';
import { Role, SearchResult } from './role.model';
import { usersData } from '../users/data';


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
 * @param role Table field value
 * @param column Fetch the column
 * @param direction Sort direction Ascending or Descending
 */
function sort(role: Role[], column: string, direction: string): Role[] {
    if (direction === '') {
        return role;
    } else {
        return [...role].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

/**
 * Table Data Match with Search input
 * @param role Table field value fetch
 * @param term Search the value
 */
function matches(role: Role, term: string, pipe: PipeTransform) {
    return role.idrole.toLowerCase().includes(term)
        || role.titre.toLowerCase().includes(term)
        || role.description.toLowerCase().includes(term);
}

@Injectable({
    providedIn: 'root'
})

export class Roleservice {
    readonly APIUrl="http://localhost:53535/api";
    // tslint:disable-next-line: variable-name
    private _loading$ = new BehaviorSubject<boolean>(true);
    // tslint:disable-next-line: variable-name
    private _search$ = new Subject<void>();
    // tslint:disable-next-line: variable-name
    private _role$ = new BehaviorSubject<Role[]>([]);
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

    constructor(private pipe: DecimalPipe, private http: HttpClient) {
        this._search$.pipe(
            tap(() => this._loading$.next(true)),
            debounceTime(200),
            switchMap(() => this._search()),
            delay(200),
            tap(() => this._loading$.next(false))
        ).subscribe(result => {
            this._role$.next(result.role);
            this._total$.next(result.total);
        });

        this._search$.next();
    }

    /**api */
    getroleList():Observable<any[]>{
        return this.http.get<any>(this.APIUrl+'/role');
    }
    
    addrole(val:any){
        return this.http.post(this.APIUrl+'/role',val);
    }
    
    updaterole(val:any){
        return this.http.put(this.APIUrl+'/role',val);
    }
    
    deleterole(val:any){
        return this.http.delete(this.APIUrl+'/role/'+val);
    }

      getAllrole():Observable<any[]>{
        return this.http.get<any[]>(this.APIUrl+'/role/GetAllrole');
      }
    /**
     * Returns the value
     */
    get role$() { return this._role$.asObservable(); }
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
        let role = sort(usersData, sortColumn, sortDirection);

        // 2. filter
        role = role.filter(table => matches(table, searchTerm, this.pipe));
        const total = role.length;

        // 3. paginate
        this.totalRecords = role.length;
        this._state.startIndex = (page - 1) * this.pageSize;
        this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
        if (this.endIndex > this.totalRecords) {
            this.endIndex = this.totalRecords;
        }
        role = role.slice(this._state.startIndex, this._state.endIndex);

        return of(
            { role, total }
        );
    }
}
