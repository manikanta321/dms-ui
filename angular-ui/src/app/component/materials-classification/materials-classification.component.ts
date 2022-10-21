import { Component, OnInit } from '@angular/core';
import { ClassificationserviseService } from 'src/app/services/classificationservise.service';
import { interval } from 'rxjs';
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
  sucatnameCode:any='';
  sucatname:any=''
  typeCode:any='';
  type:any=''
  toprint:boolean=false;
  addButton:boolean =false;
  addTypeButton:boolean=false;
  addSubButton:boolean=false;
  removelist:boolean =false;
  toggle:boolean=true;
  selectedItem = null;
  selectedsubItem=null;
  LoginId:any;
  numberValue:any;
  itemId:any;
  subCatId:any='';
  coutCatagory='';
  catagoryroouting='';
  subcatRoouting='';
  selectedtypeItem='';
  subcatcount='';
  typecount='';
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
  this.coutCatagory=res.totalRecords;
  this.catgname=data.allOtherCats
  this.catagoryroouting=data.firstCat.catName;
  this.selectedItem=data.allOtherCats[0];
  this.subcatRoouting=data.firstCat.subCAts.firstSubCat.subCatName;
  this.subcatcount=data.firstCat.subCatsCount;
  this.typecount=data.firstCat.subCAts.firstSubCat.typeCount;
  console.log('data',data.firstCat)
  let char=[]
  this.subname=data.firstCat.subCAts.allOtherSubCAts;
  this.selectedsubItem=data.firstCat.subCAts.allOtherSubCAts[0];
  this.typename=data.firstCat.subCAts.firstSubCat.types;
  this.selectedtypeItem=data.firstCat.subCAts.firstSubCat.types[0];
  this.itemId=data.firstCat.catId
  this.subCatId=data.firstCat.subCAts.firstSubCat.subCatId;
 
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
  addSubCategory(){
    this.addSubButton=true;
  }
  addTypeCategory(){
    this.addTypeButton=true;

  }


  removecatg(item):void{
    // this.catgname.splice(index, 1);
  alert(item.catId);
let data={
  CategoryId:item.catId,
}
this.calssification.deletecatagory(item.catId).subscribe((res)=>{
  console.log(res)
})

this.calssification.getclassification().subscribe((res)=>{
  let data=res.response;
  this.coutCatagory=res.totalRecords;
  this.catgname=data.allOtherCats
  this.catagoryroouting=data.firstCat.catName;
  this.selectedItem=data.allOtherCats[0];
  this.subcatRoouting=data.firstCat.subCAts.firstSubCat.subCatName;
  this.subcatcount=data.firstCat.subCatsCount;
  this.typecount=data.firstCat.subCAts.firstSubCat.typeCount;
  console.log('data',data.firstCat)
  let char=[]
  this.subname=data.firstCat.subCAts.allOtherSubCAts;
  this.selectedsubItem=data.firstCat.subCAts.allOtherSubCAts[0];
  this.typename=data.firstCat.subCAts.firstSubCat.types;
  this.selectedtypeItem=data.firstCat.subCAts.firstSubCat.types[0];
  this.itemId=data.firstCat.catId
  this.subCatId=data.firstCat.subCAts.firstSubCat.subCatId;
 
 console.log('typename',this.typename)
  console.log('char',this.subname);
 //  this.subname = char.map((data: { subCatId: any; subCatName: any; }) => {
 //    debugger
 //   return { subCatId: data.subCatId, subCatName: data.subCatName };
   
 //   console.log('subname',this.subname)
 
 // });
 })


// this.calssification.getclassification().subscribe((res)=>{
//   let data=res.response;
//   this.catgname=data.allOtherCats
// //   console.log('data',data.firstCat)
// //   let char=[]
// //   this.subname=data.firstCat.subCAts.allOtherSubCAts;
// //   this.typename=data.firstCat.subCAts.firstSubCat.types;
// //   this.itemId=data.firstCat.catId
// //   this.subCatId=data.firstCat.subCAts.firstSubCat.subCatId;
 
// //  console.log('typename',this.typename)
// //   console.log('char',this.subname);
//  //  this.subname = char.map((data: { subCatId: any; subCatName: any; }) => {
//  //    debugger
//  //   return { subCatId: data.subCatId, subCatName: data.subCatName };
   
//  //   console.log('subname',this.subname)
 
//  // });
//  })

  }
  removesub(item){
    // this.subname.splice(index, 1);
    let data={

      subCategoryId:item.subCatId,
    }
    this.calssification.daleteSubcatagory(item.subCatId).subscribe((res)=>{
      console.log(res)
    })
    setTimeout(function () {
      
  }, 10000);



    this.calssification.onclickcat(this.itemId).subscribe((res)=>{
      console.log(res)
      let data=res.response;
      this.subname=data.allOtherSubCAts;
      if(data.firstSubCat==null){
        this.typename=[];
        this.typecount='0'
      }
      else{
        this.typename=data.firstSubCat.types;
        this.subcatcount=res.totalRecords;
     this.typecount=data.firstSubCat.typeCount;
      }
      });

  // this.calssification.onclickcat(this.itemId).subscribe((res)=>{
  //   console.log(res)
  //   let data=res.response;
  //   this.subname=data.allOtherSubCAts;
  //   if(data.firstSubCat==null){
  //     this.typename=[];
  //     this.typecount='0'
  //   }
  //   else{
  //     this.typename=data.firstSubCat.types;
  //     this.subcatcount=res.totalRecords;
  //  this.typecount=data.firstSubCat.typeCount;
  //   }
  //   });

  }
  removetype(item){
    console.log(item.typeId)
    this.calssification.deleteType(item.typeId).subscribe((res)=>{
      console.log(res)
    })
    this.calssification.onclicksubcat(this.subCatId).subscribe((res)=>{
      console.log(res)
      let data=res.response;
      this.typename=res.response;
      console.log(this.typename)
      this.typecount=res.totalRecords;

  
    })
    // this.typename.splice(index, 1);

  }
  addcatagory(){
    let data={
        CategoryName:this.addcat,
        CategoryCode:this.addcatcode,
        CreatedById:this.numberValue
    };
    this.calssification.addCatagory(data).subscribe((res)=>{
      this.addcat='';
      this.addcatcode='';
    })
    this.calssification.getclassification().subscribe((res)=>{
      let data=res.response;
      this.coutCatagory=res.totalRecords;
      this.catgname=data.allOtherCats;
      this.subcatcount=data.firstCat.subCatsCount;
      this.typecount=data.firstCat.subCAts.firstSubCat.typeCount;
    //   console.log('data',data.firstCat)
    //   let char=[]
    //   this.subname=data.firstCat.subCAts.allOtherSubCAts;
    //   this.typename=data.firstCat.subCAts.firstSubCat.types;
    //   this.itemId=data.firstCat.catId
    //   this.subCatId=data.firstCat.subCAts.firstSubCat.subCatId;
     
    //  console.log('typename',this.typename)
    //   console.log('char',this.subname);
    //  //  this.subname = char.map((data: { subCatId: any; subCatName: any; }) => {
    //  //    debugger
    //  //   return { subCatId: data.subCatId, subCatName: data.subCatName };
       
    //  //   console.log('subname',this.subname)
     
    //  // });
     })
  }

addsubCat(){
  let data={
    subCategoryName:this.sucatname,
    subCategoryCode:this.sucatnameCode,
    categoryid:this.itemId,
    CreatedById:this.numberValue
};
this.calssification.addsubCatagory(data).subscribe((res)=>{
  this.sucatname='';
  this.sucatnameCode='';
  })  
  // alert(this.itemId)

  setTimeout(()=>{                           // <<<---using ()=> syntax
    this.calssification.onclickcat(this.itemId).subscribe((res)=>{
      console.log(res)
      let data=res.response;
      this.subname=data.allOtherSubCAts;
      if(data.firstSubCat==null){
        this.typename=[]
        this.typecount='0'
      }
      else{
        // this.typename=res.response;
        this.selectedtypeItem=res.response[0];
        this.typename=data.firstSubCat.types;
        this.subcatcount=res.totalRecords;
        this.typecount=data.firstSubCat.typeCount;
        // this.selectedtypeItem=res.response[0];
  
      }
      });}, 1000);
 
}


addtypes(){
  let data={
    typeName:this.type,
    typeCode:this.typeCode,
    subcategoryid:this.subCatId,
    CreatedById:this.numberValue
};
this.calssification.addtypes(data).subscribe((res)=>{
  this.type='';
  this.typeCode='';
})  



setTimeout(()=>{                           // <<<---using ()=> syntax
 

  this.calssification.onclicksubcat(this.subCatId).subscribe((res)=>{
    console.log(res)
    let data=res.response;
    this.typename=res.response;
    console.log(this.typename)
    this.typecount=res.totalRecords;
  
  
  })
  


}, 1000);


}

oclicksub(item){
  this.selectedsubItem=item;
  console.log('item1',item)
   this.subCatId=item.subCatId;
   this.subcatRoouting=item.subCatName;
  this.calssification.onclicksubcat(this.subCatId).subscribe((res)=>{
    console.log(res)
    let data=res.response;
    this.typename=res.response;
    this.selectedtypeItem=res.response[0];
    this.typecount=res.totalRecords;
    console.log(this.typename)


  })

}

  onClick(item) {
    this.selectedItem = item;
console.log('item',item)

 this.itemId=item.catId;
 this.catagoryroouting=item.catName;
this.calssification.onclickcat(this.itemId).subscribe((res)=>{
console.log(res)

let data=res.response;
this.subcatcount=res.totalRecords;
this.typecount=data.firstSubCat.typeCount;
this.subname=data.allOtherSubCAts;
this.selectedsubItem=data.allOtherSubCAts[0]
if(data.firstSubCat==null){
  this.typename=[]
  this.subcatRoouting='No Sub-Category'
}
else{
  this.subcatRoouting=data.firstSubCat.subCatName;
  this.typename=data.firstSubCat.types;
  this.selectedtypeItem=data.firstSubCat.types[0];
}
});

  }
  typeselect(item){
    this.selectedtypeItem=item;
  }
}
