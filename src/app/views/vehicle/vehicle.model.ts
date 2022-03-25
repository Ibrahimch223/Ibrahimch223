export interface Vehicle {
  id:number;
  brand:string;
  mileage:string;
  registrationnumber:string;
  state:string;
  costoftechnicalvisit:string;
  costofinsurance:string;
  typeofvehicle:string;
}

// Search Data
export interface SearchResult {
    vehicle: Vehicle[];
    total: number;
}
