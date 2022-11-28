import { Component, OnInit } from '@angular/core';
import { ClassificationserviseService } from 'src/app/services/classificationservise.service';
import { interval } from 'rxjs';
import { AddCatComponent } from '../add-cat/add-cat.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared-services.service';
import { AddSubCatComponent } from '../add-sub-cat/add-sub-cat.component';
import { AddTypesPopupComponent } from '../add-types-popup/add-types-popup.component';
import { SharedServiceAddSubService } from 'src/app/services/shared-service-add-sub.service';
import { SharedServiceAddTypesService } from 'src/app/services/shared-service-add-types.service';
import { DeactivateClassificationPopUpComponent } from '../deactivate-classification-pop-up/deactivate-classification-pop-up.component';
import { DeactiveSubcategoryCompoComponent } from '../deactive-subcategory-compo/deactive-subcategory-compo.component';
import { DeactiveTypeCompoComponent } from '../deactive-type-compo/deactive-type-compo.component';

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
  selected:boolean=false;
  LoginId:any;
  numberValue:any;
  itemId:any;
  subCatId:any='';
  coutCatagory:any;
  catagoryroouting='';
  subcatRoouting='';
  selectedtypeItem='';
  subcatcount:any;
  typecount:any;
  // clData: string[] = ['Type TP 1', 'Type TP 2', 'Type TP 3','Type TP 4'];
  // subcat: string[] = ['sub category', 'sub category 2',];
  constructor(
    private dialog: MatDialog,
    private calssification:ClassificationserviseService,
    private sharedService: SharedService,
    private sharedServiceaddsub:SharedServiceAddSubService,
    private sharedServiceaddtype:SharedServiceAddTypesService,



  ) {
    this.sharedService.listen().subscribe((m: any) => {
      console.log(m)
this.getclassification();
    })
    this.sharedServiceaddsub.listen().subscribe((m: any) => {
      console.log(m)
this.addsubCat();
    })

    this.sharedServiceaddtype.listen().subscribe((m: any) => {
      console.log(m)
this.addtypes();
    })

   }

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

  if(data.firstCat.isActive==true){
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
    localStorage.setItem('Catidset',this.itemId)
  
    this.subCatId=data.firstCat.subCAts.firstSubCat.subCatId;
    localStorage.setItem('Subcatidset',this.subCatId)



  }

  
else{
  this.catagoryroouting='';
  
  // this.selectedItem=data.allOtherCats[0];
  this.subcatRoouting='';
  this.subcatcount=0;
  this.typecount=0;
  console.log('data',data.firstCat)
  let char=[]
  this.subname=[];
  // this.selectedsubItem=data.firstCat.subCAts.allOtherSubCAts[0];
  this.typename=[];
  // this.selectedtypeItem=data.firstCat.subCAts.firstSubCat.types[0];
  this.itemId=''
  localStorage.setItem('Catidset',this.itemId)

  this.subCatId='';
  localStorage.setItem('Subcatidset',this.subCatId)
}
 
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
    let catsetName='Add Category'
     localStorage.setItem('catsetName',catsetName)

    this.dialog.open(AddCatComponent,{height:'320px'});
      // this.addButton =true;
   
  }


  editcategory(item){
    let catsetName='Edit Category'
 
console.log('item to edit',item)
localStorage.setItem('catsetName',catsetName)
localStorage.setItem('activeCatId',item.catId);

    this.dialog.open(AddCatComponent,{height:'320px'});

  }

  deativateCat(item){
        console.log('itemin cat',item)
        localStorage.setItem('activeCatId',item.catId);
        localStorage.setItem('activeCatName',item.catName)
        localStorage.setItem('activeCatIsActive',item.isActive)




    this.dialog.open(DeactivateClassificationPopUpComponent);
    localStorage.setItem('Catidset',this.itemId)





  }

  removeaddformcat(){
    this.addButton =false;

  }
  addSubCategory(){
    let subcatsetName='Add Sub-Category'
     localStorage.setItem('subcatsetName',subcatsetName)
    this.dialog.open(AddSubCatComponent,{height:'320px'});

    // this.addSubButton=true;
  }
  editSubcategory(item){
    let subcatsetName='Edit Sub-Category'
 
    console.log('item to edit',item)
    localStorage.setItem('subcatsetName',subcatsetName)
    localStorage.setItem('activeSubCatId',item.subCatId);
    this.dialog.open(AddSubCatComponent,{height:'320px'});

  }

  removeaddformSubcat(){
    this.addSubButton=false;

  }

  deactivate(item){
    console.log('itemin Subcat',item)
    localStorage.setItem('activeSubCatId',item.subCatId);
    localStorage.setItem('activeSubCatName',item.subCatName)
    localStorage.setItem('activeSubCatIsActive',item.isActive)
    this.dialog.open(DeactiveSubcategoryCompoComponent);

  }


  addTypeCategory(){
    let TypeName='Add Types'
      localStorage.setItem('TypeName',TypeName)
    this.dialog.open(AddTypesPopupComponent,{height:'320px'});

    // this.addTypeButton=true;

  }

  edittype(item){
    let TypeName='Edit Types'
  
    console.log('item to edit',item)
    localStorage.setItem('TypeName',TypeName)
    localStorage.setItem('activeTypeId',item.typeId);
    localStorage.setItem('activeTypeId',item.typeId);

    this.dialog.open(AddTypesPopupComponent,{height:'320px'});

  }

  deactivateType(item){
    console.log('itemin type',item)
    localStorage.setItem('activeTypeId',item.typeId);
    localStorage.setItem('activeTypeName',item.typeName)
    localStorage.setItem('activeTypeIsActive',item.isActive)
    this.dialog.open(DeactiveTypeCompoComponent);
    



  }

  removeaddformtype(){
    this.addTypeButton=false;

  }

  removecatg(item):void{
    console.log('item to check',item)
    // this.catgname.splice(index, 1);
let data={
  CategoryId:item.catId,
}
this.calssification.deletecatagory(item.catId).subscribe((res)=>{
  console.log(res)
})


setTimeout(()=>{                           // <<<---using ()=> syntax
 
  this.calssification.getclassification().subscribe((res)=>{
    let data=res.response;
    this.coutCatagory=res.totalRecords;
    this.catgname=data.allOtherCats
    this.catagoryroouting=data.firstCat;
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
    localStorage.setItem('Catidset',this.itemId)
    this.subCatId=data.firstCat.subCAts.firstSubCat.subCatId;
    localStorage.setItem('Subcatidset',this.subCatId)

   
   console.log('typename',this.typename)
    console.log('char',this.subname);
   //  this.subname = char.map((data: { subCatId: any; subCatName: any; }) => {
   //    debugger
   //   return { subCatId: data.subCatId, subCatName: data.subCatName };
     
   //   console.log('subname',this.subname)
   
   // });
   })

}, 1000);






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
   

    setTimeout(()=>{                           // <<<---using ()=> syntax
 
      this.calssification.onclickcat(this.itemId).subscribe((res)=>{
        console.log(res)
        let data=res.response;
        this.subname=data.allOtherSubCAts;
        this.selectedsubItem=data.allOtherSubCAts[0];
        this.subcatcount=res.totalRecords;


        if(res.response.firstSubCat == null){
          this.typename=[];
          this.typecount='0';
          this.subcatRoouting='No Sub-Category';
          debugger

        }
        else{
          this.subcatRoouting=data.firstSubCat.subCatName; 
          this.selectedtypeItem=data.firstSubCat.types[0];
          this.typename=data.firstSubCat.types;
          this.subcatcount=res.totalRecords;
       this.typecount=data.firstSubCat.typeCount;
        }
        });
    
    }, 1000);
    


   

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

    setTimeout(()=>{                           // <<<---using ()=> syntax
 
      this.calssification.onclicksubcat(this.subCatId).subscribe((res)=>{
        console.log(res)
        let data=res.response;
        this.typename=res.response;
        console.log(this.typename)
        this.typecount=res.totalRecords;
        this.selectedtypeItem=res.response[0];

  
    
      })
    
    }, 1000);
    


    // this.typename.splice(index, 1);

  }
  addcatagory(){
    // let data={
    //     CategoryName:this.addcat,
    //     CategoryCode:this.addcatcode,
    //     CreatedById:this.numberValue
    // };
    // this.calssification.addCatagory(data).subscribe((res)=>{
    //   this.addcat='';
    //   this.addcatcode='';
    // })
    

    this.calssification.getclassification().subscribe((res)=>{
      let data=res.response;
      this.coutCatagory=res.totalRecords;
      this.catgname=data.allOtherCats;
      if(data.firstCat.isActive == true){
      this.subcatcount=data.firstCat.subCatsCount;
      this.typecount=data.firstCat.subCAts.firstSubCat.typeCount;
      this.selectedItem=data.allOtherCats[0];
      }
      else{

      }
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
     this.addButton =false;
  }
  tickmark(){
    this.selected = true;
  }

addsubCat(){
//   let data={
//     subCategoryName:this.sucatname,
//     subCategoryCode:this.sucatnameCode,
//     categoryid:this.itemId,
//     CreatedById:this.numberValue
// };
// this.calssification.addsubCatagory(data).subscribe((res)=>{
//   this.sucatname='';
//   this.sucatnameCode='';
//   })  
  // alert(this.itemId)

  setTimeout(()=>{                           // <<<---using ()=> syntax
    this.calssification.onclickcat(this.itemId).subscribe((res)=>{
      console.log(res)
      let data=res.response;
      this.subname=data.allOtherSubCAts;
      // this.selectedsubItem=data.allOtherSubCAts[0]

      if(data.firstSubCat==null){
        this.typename=[];
        this.typecount='0';

      }
      else{
        // this.typename=res.response;
        if(data.firstSubCat.isActive==true){
          this.selectedtypeItem=data.firstSubCat.types[0];
          this.subcatRoouting=data.firstSubCat.subCatName;
  
          // this.selectedtypeItem=res.response[0];
          this.typename=data.firstSubCat.types;
          this.subcatcount=res.totalRecords;
          this.typecount=data.firstSubCat.typeCount;
        }
        else
        {
          // this.selectedtypeItem=data.firstSubCat.types[0];
          this.subcatRoouting='';
  
          this.selectedtypeItem='';
          this.typename=[];
          this.subcatcount=res.totalRecords;
          this.typecount=0;
        }
       
        // this.selectedtypeItem=res.response[0];
  
      }
      });}, 1000);
 this.addSubButton =false;
}


addtypes(){
setTimeout(()=>{                          
 
  this.calssification.onclicksubcat(this.subCatId).subscribe((res)=>{
    console.log(res)
    let data=res.response;
    this.typename=res.response;
    console.log(this.typename)
    this.typecount=res.totalRecords;
    if(res.response[0].isActive==true)
    {
      this.selectedtypeItem=res.response[0];
    }
 else
 {
  this.selectedtypeItem='';

 }
  })
  
}, 1000);

this.addTypeButton=false;
}

oclicksub(item){
  this.selectedsubItem=item;
  console.log('item1',item)
   this.subCatId=item.subCatId;
   localStorage.setItem('Subcatidset',this.subCatId);
   this.subcatRoouting=item.subCatName;
  this.calssification.onclicksubcat(this.subCatId).subscribe((res)=>{
    console.log(res)
    let data=res.response;
  this.typename=res.response;
  this.selectedtypeItem=res.response[0];
  this.typecount=res.totalRecords;
  console.log(this.typename)
// }
//    else{
//     this.typename=[];
//     this.selectedtypeItem='';
//     this.typecount=0;
//     console.log(this.typename)
//    }




  })

}

  onClick(item) {
    this.selectedItem = item;
console.log('item',item)

 this.itemId=item.catId;
 localStorage.setItem('Catidset',this.itemId)
 this.catagoryroouting=item.catName;
this.calssification.onclickcat(this.itemId).subscribe((res)=>{
console.log(res)
let data=res.response;
this.subcatcount=res.totalRecords;
this.typecount=data.firstSubCat?.typeCount;
this.subname=data.allOtherSubCAts;
if(data.firstSubCat?.isActive==true){
  this.selectedsubItem=data.allOtherSubCAts[0]
}else{

}

if(data.firstSubCat == null){
  this.typename=[]
  this.subcatRoouting='No Sub-Category'
}
else{
if(data.firstSubCat.isActive==true){
  this.subCatId=data.firstSubCat.subCatId
  localStorage.setItem('Subcatidset',this.subCatId)
  this.subcatRoouting=data.firstSubCat.subCatName;
  if(data.firstSubCat.types[0].isActive==true ){
    this.typename=data.firstSubCat.types;
    this.selectedtypeItem=data.firstSubCat.types[0];
  }
  else{
    this.typename=data.firstSubCat.types;
    this.selectedtypeItem='';

  }


}
 else{
  


  this.subCatId=data.firstSubCat.subCatId
  localStorage.setItem('Subcatidset',this.subCatId)
  this.subcatRoouting='';
  this.typename=[];
  this.selectedtypeItem=' ';
 }

}
});

  }
  typeselect(item){
    this.selectedtypeItem=item;
  }
}
