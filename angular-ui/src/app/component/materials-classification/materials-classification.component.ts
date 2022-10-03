import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-materials-classification',
  templateUrl: './materials-classification.component.html',
  styleUrls: ['./materials-classification.component.css']
})
export class MaterialsClassificationComponent implements OnInit {

  catgname: string[] = ['Category 1 (Ct1)', 'Category 1 (Ct2)','Category 3 (Ct3)','Category 4 (Ct4)',];
  subname: string[] = ['Sub category 1', 'Sub category 2',];
  typename: string[] = ['Type TP 1', 'Type TP 2', 'Type TP 3','Type TP 4'];
  toprint:boolean=false;

  toggle:boolean=true;
  // clData: string[] = ['Type TP 1', 'Type TP 2', 'Type TP 3','Type TP 4'];
  // subcat: string[] = ['sub category', 'sub category 2',];
  constructor() { }

  ngOnInit(): void {
  }
  cname1(cname:string,i:any){
    
    if(cname=='Eectronics'){
      // this.Sname= ['mobile', 'earphone','mouse'];
    }
    if(cname!='Eectronics'){
      // this.Sname= ['fan','fridge'];
    

    }
  }
  printvalue(valueofprint:boolean){
    this.toprint=valueofprint;
  }
  
}
