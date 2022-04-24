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
  showAdd !: boolean
  showUpdate !: boolean

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

  clickAddUser() {
    this.formValue.reset()
    this.showAdd = true
    this.showUpdate = false
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
        this.getAllUsers()
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

  deleteUser(user: any) {
    this.api.deleteUser(user.id)
      .subscribe(res => alert("Пользователь удалён!"))
    this.getAllUsers()
  }

  onEdit(user: any) {
    this.showAdd = false
    this.showUpdate = true
    this.userObj.id = user.id
    this.formValue.controls['lastName'].setValue(user.lastName)
    this.formValue.controls['firstName'].setValue(user.firstName)
    this.formValue.controls['fathersName'].setValue(user.fathersName)
    this.formValue.controls['address'].setValue(user.address)
  }


  updateUserDetails() {

    this.userObj.lastName = this.formValue.value.lastName
    this.userObj.firstName = this.formValue.value.firstName
    this.userObj.fathersName = this.formValue.value.fathersName
    this.userObj.address = this.formValue.value.address
    this.api.updateUser(this.userObj, this.userObj.id)
      .subscribe(res => alert('Успешно обновлён'))
    let ref = document.getElementById('cancel')
    ref?.click()
    this.formValue.reset()
    this.getAllUsers()
  }

}
