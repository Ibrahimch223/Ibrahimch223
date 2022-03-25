import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { RoleSortableService, SortEvent } from '../role-sortable.directive';
import { Role } from '../role.model';
import { Roleservice } from '../role.service';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css'],
  providers: [Roleservice, DecimalPipe]
})
export class ListRoleComponent implements OnInit {

  
  @Input() user:any;
  idrole:string;
  titre:string;
  description:string;
 
// bread crumb items
formData: FormGroup; 
submitted = false;
AddroleData: Role[];
roleList:any=[];

term: any;
ModalTitle:string;
ActivateAddEditEmpComp:boolean=false;
role:any;

// page
currentpage: number;
 // breadcrumb items
 breadCrumbItems: Array<{}>;

 roleData: Role[];
 //recherche
 roleIdFilter:string="";
 roleNameFilter:string="";
 roleListWithoutFilter:any=[];

 role$: Observable<Role[]>;
 total$: Observable<number>;
 model: NgbDateStruct;
 @ViewChildren(RoleSortableService) headers: QueryList<RoleSortableService>;

 

 constructor(public service: Roleservice,private modalService: NgbModal, private formBuilder: FormBuilder,private http: HttpClient) {
   this.role$ = service.role$;
   this.total$ = service.total$;
 }

 ngOnInit(): void {
   this.breadCrumbItems = [{ label: 'Role' }, { label: 'List-Role', active: true }];

   this.roleData = this.roleData;
   this.refreshuserList();
   
   this.formData = this.formBuilder.group({
    titre: ["", Validators.required],
    description: ["", Validators.required],
  });

  this.currentpage = 1;

  /**
   * Fetches the data
   */
  this._fetchData();
 }

//---------add--------
addrole(){
  var val = {idrole:this.idrole,
              titre:this.titre,
              description:this.description,
              };

  this.service.addrole(val).subscribe(res=>{
    Swal.fire('Add success', 'You clicked the button!', 'success');
    this.refreshuserList();
  });
}
//---------delete--------

deleteClick(item){
  Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#34c38f',
    cancelButtonColor: '#f46a6a',
    confirmButtonText: 'Yes, delete it!'
  }).then(result => {
    if (result.value) {
      this.service.deleterole(item.idrole).subscribe(data=>{
        this.refreshuserList();
      })
      Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
    }
  });
}
//---------list--------

 refreshuserList(){
  this.service.getroleList().subscribe(data=>{
    this.roleList=data;
  });
}

 
editClick(item){
  console.log(item);
  this.role=item;
  this.ActivateAddEditEmpComp=true;
}

 /**
 * Sort table data
 * @param param0 sort the column
 *
 */
 onSort({ column, direction }: SortEvent) {
 
   // resetting other headers
   this.headers.forEach(header => {
     if (header.sortable !== column) {
       header.direction = '';
     }
   });
   this.service.sortColumn = column;
   this.service.sortDirection = direction;
 }

 /**
   * Customers data fetches
   */
  private _fetchData() {
    this.AddroleData = this.AddroleData;
  }
  get form() {
    return this.formData.controls;
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalService.open(content,{ size: 'xl', centered: true });
  }

  saveCustomer() {
    this.submitted = true;
    const formData = new FormData();
    formData.append('titre', this.formData.get('titre').value);
    formData.append('description', this.formData.get('description').value);

  }

  FilterFn(){
    var roleIdFilter = this.roleIdFilter;
    var roleNameFilter = this.roleNameFilter;

    this.roleList = this.roleListWithoutFilter.filter(function (el){
        return el.titre.toString().toLowerCase().includes(
          roleIdFilter.toString().trim().toLowerCase()
        )&&
        el.description.toString().toLowerCase().includes(
          roleNameFilter.toString().trim().toLowerCase()
        )
    });
  }


}
