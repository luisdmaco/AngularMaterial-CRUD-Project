import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table'

import { Student } from '../models/student.model';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { NgForm } from '@angular/forms';
import { HttpDataService } from '../services/http-data.service';

import * as _ from "lodash";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  @ViewChild('studentForm', {static: false})
  studentForm!: NgForm;

  studentData!: Student;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'age', 'mobile', 'email', 'address']

  @ViewChild(MatPaginator, {static:true})
  paginator!: MatPaginator;
  isEditMode = false;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private HttpDataServices: HttpDataService){
    this.studentData ={} as Student;
  }

  ngOnInit(): void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllStudents();
  }

  //document this method
  onSumit(){
    if(this.studentForm.form.valid){
      console.log("Valid.");
      if(this.isEditMode){
        console.log("Update.");
        this.updateStudent();
      }else{
        console.log("Create");
        this.addStudent();
      }
      this.cancelEdit();
    }else{
      console.log("Invalid data.");
    }
  }

  getAllStudents(){
    this.HttpDataServices.getList().subscribe((response: any) =>{
      this.dataSource.data = response;
    });
  }

  editItem(element: any){
    this.studentData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit(){
    this.isEditMode = false;
    this.studentForm.resetForm();
  }

  deleteItem(id: string){
    this.HttpDataServices.deleteItem(id).subscribe((response: any) =>{
      this.dataSource.data = this.dataSource.data.filter((o:any)=>{
        return o.id !== id ? o : false;
      });
      console.log(this.dataSource.data);
    })
  }

  addStudent(){
    this.studentData.id = 0;
    this.HttpDataServices.createItem(this.studentData).subscribe((response: any) =>{
      this.dataSource.data.push({...response})
      this.dataSource.data = this.dataSource.data.map((o: any)=>{
        return 0;
      });
    });
  }

  updateStudent(){
    this.HttpDataServices.updateItem(this.studentData.id, this.studentData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: any)=>{
        if(o.id == response.id){
          o = response;
        }
        return 0;
      })
    })
  }
}
