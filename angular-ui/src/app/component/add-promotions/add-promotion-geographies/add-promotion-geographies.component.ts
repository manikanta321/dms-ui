import { Component, OnInit } from '@angular/core';


export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}
@Component({
  selector: 'app-add-promotion-geographies',
  templateUrl: './add-promotion-geographies.component.html',
  styleUrls: ['./add-promotion-geographies.component.css']
})
export class AddPromotionGeographiesComponent implements OnInit {
  task: Task = {
    name: 'malaysia(3/4)',
    completed: false,
    subtasks: [
      {name: 'Kedah', completed: false,},
      {name: 'Penang', completed: false, },
      {name: 'Batu Refringi', completed: false,},
      {name:'Georgetown' , completed:false}
    ],
  }
  indtasks: any = ['karnataka','AndhraPradesh','kerala','maharastra']
  allComplete: boolean = false;
  completed : boolean = false
  constructor() { }

  ngOnInit(): void {
  }
  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }
}
