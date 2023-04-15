import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//importamos student component
import { StudentComponent } from './student/student.component';

//hacemos ruteo
const routes: Routes = [
{path:'', redirectTo:'/students', pathMatch:'full'},
{path:'students', component: StudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
