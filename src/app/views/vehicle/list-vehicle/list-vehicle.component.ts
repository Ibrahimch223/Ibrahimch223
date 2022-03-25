import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { SortEvent, VehicleSortableService } from '../vehicle-sortable.directive';
import { Vehicle } from '../vehicle.model';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-list-vehicle',
  templateUrl: './list-vehicle.component.html',
  styleUrls: ['./list-vehicle.component.css'],
  providers: [VehicleService, DecimalPipe]
})
export class ListVehicleComponent implements OnInit {

  @Input() vehicle:any;
  idvehicle:number;
  brand:string;
  miealage:string;
  registrationnumber:string;
  state:string;
  costoftechnicalvisit:number;
  costofinsurance:number;
  typeofvehicle:string;

  @Input() category:any;
  title:string;

 // bread crumb items
formData: FormGroup; 
submitted = false;
AddvehicleData: Vehicle[];
VehicleList:any=[];
categorylist:any=[];
categoryzlist:any=[];
ActivateAddEditEmpComp:boolean=true;
vehicl:any;
term: any;
 //recherche
 vehicleIdFilter:string="";
 vehicleNameFilter:string="";
 vehicleListWithoutFilter:any=[];

// page
currentpage: number;
 // breadcrumb items
 breadCrumbItems: Array<{}>;

 vehicleData: Vehicle[];


 vehicle$: Observable<Vehicle[]>;
 total$: Observable<number>;
 model: NgbDateStruct;
 @ViewChildren(VehicleSortableService) headers: QueryList<VehicleSortableService>;

 

 constructor(public service: VehicleService,private modalService: NgbModal, private formBuilder: FormBuilder,private http: HttpClient) {
   this.vehicle$ = service.vehicle$;
   this.total$ = service.total$;
 }

 ngOnInit(): void {
   this.breadCrumbItems = [{ label: 'Vehicle' }, { label: 'List-Vehicle', active: true }];

   this.vehicleData = this.vehicleData;
   
   this.formData = this.formBuilder.group({
    brand: ["", Validators.required],
    mileage: ["", Validators.required],
    registrationnumber: ["", Validators.required],
    state : ["", Validators.required],
    costoftechnicalvisit: ["", Validators.required],
    costofinsurance: ["", Validators.required],
    typeofvehicle: ["", Validators.required],
  });

  this.currentpage = 1;
  this.refreshvehicleList();
  this.loadvehicleList();
  this.loadvehiclezList();

  /**
   * Fetches the data
   */
  this._fetchData();
 }

 loadvehicleList(){
  this.service.getAllcategory().subscribe((data:any)=>{
    this.categorylist=data;

    this.title=this.category.title;
  });
 }

 loadvehiclezList(){
  this.service.getAllcategoryz().subscribe((data:any)=>{
    this.categoryzlist=data;

    this.title=this.category.title;
  });
 }

//---------add--------
addvehicle(){
  var val = {idvehicle:this.idvehicle,
              brand:this.brand,
              miealage:this.miealage,
              registrationnumber:this.registrationnumber,
              state:this.state,
              costoftechnicalvisit:this.costoftechnicalvisit,
              costofinsurance:this.costofinsurance,
              typeofvehicle:this.typeofvehicle};
  if(val!=null){
    this.service.addvehicle(val).subscribe(res=>{
      Swal.fire('Add success', 'You clicked the button!', 'success');
      this.refreshvehicleList();
    });
  }else{
    this.saveCustomer();
  }
  
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
      this.service.deletevehicle(item.idvehicle).subscribe(data=>{
        this.refreshvehicleList();
      })
      Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
    }
  });
}
//---------list--------

 refreshvehicleList(){
  this.service.getvehicleList().subscribe(data=>{
    this.VehicleList=data;
  });
 }

updatevehicle(){
  var val = {idvehicle:this.idvehicle,
    brand:this.brand,
    miealage:this.miealage,
    registrationnumber:this.registrationnumber,
    state:this.state,
    costoftechnicalvisit:this.costoftechnicalvisit,
    costofinsurance:this.costofinsurance,
    typeofvehicle:this.typeofvehicle
  };

  this.service.updatevehicle(val).subscribe(res=>{
    Swal.fire('Add success', 'You clicked the button!', 'success');
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
    this.AddvehicleData = this.AddvehicleData;
  }
  get form() {
    return this.formData.controls;
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.vehicl={
      idvehicle:0,
      brand:"",
      miealage:"",
      registrationnumber:"",
      state:"",
      costoftechnicalvisit:"",
      costofinsurance:"",
      typeofvehicle:""
    }
    this.modalService.open(content,{ size: 'xl', centered: true });
    this.ActivateAddEditEmpComp=true;
  }

  editClick(item){
    console.log(item);
    this.vehicl=item;
    this.modalService.open(item,{ size: 'xl', centered: true });
    this.ActivateAddEditEmpComp=true;
  }

  saveCustomer() {
    const currentDate = new Date();
    if (this.formData.valid) {
     const brand = this.formData.get('brand').value;
     const mileage = this.formData.get('mileage').value;
     const registrationnumber = this.formData.get('registrationnumber').value;
     const state = this.formData.get('state').value;
     const costoftechnicalvisit = this.formData.get('costoftechnicalvisit').value;
     const costofinsurance = this.formData.get('costofinsurance').value;
     const typeofvehicle = this.formData.get('typeofvehicle').value;

      this.AddvehicleData.push({
        id: this.AddvehicleData.length + 1,
        brand,
        mileage,
        registrationnumber,
        state,
        costoftechnicalvisit,
        costofinsurance,
        typeofvehicle 
      })
      this.modalService.dismissAll()
    }
    this.submitted = true
  }

}
