import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table'

import { Student } from '../models/student.model';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { NgForm } from '@angular/forms';

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

  cancelEdit(){
    this.isEditMode = false;
    this.studentForm.resetForm();
  }

  //document this method
  onSumit(){
    if(this.studentForm.form.valid){
      console.log("Valid.");
      if(this.isEditMode){
        console.log("Update.");
        //this.updateStudent();
      }else{
        console.log("Create");
        //this.addStudent();
      }
      this.cancelEdit();
    }else{
      console.log("Invalid data.");
    }
  }
}
