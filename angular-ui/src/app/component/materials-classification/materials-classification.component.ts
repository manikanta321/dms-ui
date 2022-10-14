import { Component, OnInit } from '@angular/core';
import { ClassificationserviseService } from 'src/app/services/classificationservise.service';

@Component({
  selector: 'app-materials-classification',
  templateUrl: './materials-classification.component.html',
  styleUrls: ['./materials-classification.component.css']
})
export class MaterialsClassificationComponent implements OnInit {

  catgname:any=[];
  subname: any=[];
  typename:any=[];
  addcat:any=''
  addcatcode:any='';
  toprint:boolean=false;
  addButton:boolean =false;
  removelist:boolean =false;
  toggle:boolean=true;
  selectedItem = null;
  LoginId:any;
  numberValue:any;
  // clData: string[] = ['Type TP 1', 'Type TP 2', 'Type TP 3','Type TP 4'];
  // subcat: string[] = ['sub category', 'sub category 2',];
  constructor(
    private calssification:ClassificationserviseService,

  ) { }

  ngOnInit() {
    this.LoginId=localStorage.getItem("logInId");
    this.numberValue = Number(this.LoginId);


this.getclassification()

  }
  getclassification(){
  
this.calssification.getclassification().subscribe((res)=>{
  let data=res.response;
  this.catgname=data.allOtherCats
  console.log('data',data.firstCat)
  let char=[]
  this.subname=data.firstCat.subCAts.allOtherSubCAts;
  this.typename=data.firstCat.subCAts.firstSubCat.types;
 console.log('typename',this.typename)
  console.log('char',this.subname);
 //  this.subname = char.map((data: { subCatId: any; subCatName: any; }) => {
 //    debugger
 //   return { subCatId: data.subCatId, subCatName: data.subCatName };
   
 //   console.log('subname',this.subname)
 
 // });
 })
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
  addCategory(){
    this.addButton =true;
  }
  removecatg(index):void{
    this.catgname.splice(index, 1);
  }
  removesub(index){
    this.subname.splice(index, 1);
  }
  removetype(index){
    this.typename.splice(index, 1);
  }
  addcatagory(){
    let data={
        CategoryName:this.addcat,
        CategoryCode:this.addcatcode,
        CreatedById:this.numberValue
    };
    this.calssification.addCatagory(data).subscribe((res)=>{
      
    })
  }
oclicksub(item){
  console.log('item1',item)
  let subCatId=item.subCatId;
  this.calssification.onclicksubcat(subCatId).subscribe((res)=>{
    console.log(res)
    let data=res.response;
    this.typename=res.response;
    console.log(this.typename)


  })

}

  onClick(item) {
    this.selectedItem = item;
console.log('item',item)

let itemId=item.catId;
this.calssification.onclickcat(itemId).subscribe((res)=>{
console.log(res)
let data=res.response;
this.subname=data.allOtherSubCAts;
if(data.firstSubCat==null){
  this.typename=[]
}
else{
  this.typename=data.firstSubCat.types;
}
});

  }
}
