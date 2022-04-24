import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {User} from "../user";
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-usersdashboard',
  templateUrl: './usersdashboard.component.html',
  styleUrls: ['./usersdashboard.component.scss']
})
export class UsersdashboardComponent implements OnInit {

  formValue!: FormGroup
  userObj: User = new User()
  userData !: any

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
       lastName: [''],
       firstName: [''],
       fathersName: [''],
       address: ['']
    })
    this.getAllUsers()
  }

  postUserDetails() {
    this.userObj.lastName = this.formValue.value.lastName
    this.userObj.firstName = this.formValue.value.firstName
    this.userObj.fathersName = this.formValue.value.fathersName
    this.userObj.address = this.formValue.value.address

    this.api.postUser(this.userObj)
      .subscribe(res => {
        console.log(res)
        alert("Пользователь добавлен")
        let ref = document.getElementById('cancel')
        ref?.click()
        this.formValue.reset()
      },
        err => {
        alert('Ошибка!')
        })
  }

  getAllUsers() {
    this.api.getUser().subscribe(
      res => this.userData= res
    )
  }

}
