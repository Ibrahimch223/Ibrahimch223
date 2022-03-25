import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { CategorySortableService, SortEvent } from '../category-sortable.directive';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';
import { Addcategory } from './addcategory.model';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css'],
  providers: [CategoryService, DecimalPipe]

})
export class ListCategoryComponent implements OnInit {

  @Input() category:any;
  idcategory:string;
  title:string;
  role:string;
  description:string;

  @Input() crole:any;
  titre:string;

// bread crumb items
formData: FormGroup; 
submitted = false;
AddcategoryData: Addcategory[];
CategoryList:any=[];
rolelist:any=[];
term: any;

// page
currentpage: number;
 // breadcrumb items
 breadCrumbItems: Array<{}>;

 categoryData: Category[];
 selectValue = [];

 category$: Observable<Category[]>;
 total$: Observable<number>;
 model: NgbDateStruct;
 @ViewChildren(CategorySortableService) headers: QueryList<CategorySortableService>;

 

 constructor(public service: CategoryService,private modalService: NgbModal, private formBuilder: FormBuilder,private http: HttpClient) {
   this.category$ = service.category$;
   this.total$ = service.total$;
 }

 ngOnInit(): void {
   this.breadCrumbItems = [{ label: 'Category' }, { label: 'List-Category', active: true }];

   this.categoryData = this.categoryData;
   
   this.selectValue = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado' ]
   
   this.formData = this.formBuilder.group({
    title: ["", Validators.required],
    role: ["", Validators.required],
    description: ["", Validators.required]
  });

  this.currentpage = 1;

  /**
   * Fetches the data
   */
  this._fetchData();
  this.refreshcategoryList();
  this.loadcategoryList();
 }

 
 loadcategoryList(){
  this.service.getAllrole().subscribe((data:any)=>{
    this.rolelist=data;

    this.titre=this.crole.titre;
  });
}

//---------add--------
addcategory(){
  var val = {idcategory:this.idcategory,
              title:this.title,
              role:this.role,
              description:this.description};

    this.service.addcategory(val).subscribe(res=>{
      Swal.fire('Add success', 'You clicked the button!', 'success');
      this.refreshcategoryList();
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
      this.service.deletecategory(item.idcategory).subscribe(data=>{
        this.refreshcategoryList();
      })
      Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
    }
  });
}
//---------list--------

 refreshcategoryList(){
  this.service.getcategoryList().subscribe(data=>{
    this.CategoryList=data;
  });
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
    this.AddcategoryData = this.AddcategoryData;
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
    const currentDate = new Date();
    if (this.formData.valid) {
     const title = this.formData.get('title').value;
     const role = this.formData.get('role').value;
     const description = this.formData.get('description').value;

      this.AddcategoryData.push({
        id: this.AddcategoryData.length + 1,
        title,
        role,
        description
      });
      this.modalService.dismissAll()
    }
    this.submitted = true
  }

}
