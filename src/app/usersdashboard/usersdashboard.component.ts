import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-usersdashboard',
  templateUrl: './usersdashboard.component.html',
  styleUrls: ['./usersdashboard.component.scss']
})
export class UsersdashboardComponent implements OnInit {

  formValue!: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
       lastName: [''],
       firstName: [''],
       fathersName: [''],
       address: ['']
    })
  }

}
