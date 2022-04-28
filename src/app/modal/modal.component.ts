import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {DadataConfig, DadataType} from "@kolkov/ngx-dadata"
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() public item!: FormGroup
  @Input() public userObj: any
  @Input() public userData !: any
  @Input() public showAdd !: boolean
  @Input() public showUpdate !: boolean

  public userCounter = 1

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  get f () {
    return this.item.controls
  }

  postUserDetails() {
    this.userObj.lastName = this.item.value.lastName
    this.userObj.firstName = this.item.value.firstName
    this.userObj.fathersName = this.item.value.fathersName
    this.userObj.address = this.item.value.address

    this.api.postUser(this.userObj)
      .subscribe(() => {
          alert("Пользователь добавлен")
          let cancel = document.getElementById('cancel')
          cancel?.click()
          this.item.reset()
          this.getAllUsers()
        },
        err => {
          alert('Ошибка!')
        })
  }

  updateUserDetails() {
    this.userObj.lastName = this.item.value.lastName
    this.userObj.firstName = this.item.value.firstName
    this.userObj.fathersName = this.item.value.fathersName
    this.userObj.address = this.item.value.address
    this.api.updateUser(this.userObj, this.userObj.id)
      .subscribe(res => {
        alert('Успешно обновлён')
        let ref = document.getElementById('cancel')
        ref?.click()
        this.item.reset()
        this.getAllUsers()
      })
  }

  getAllUsers() {
    this.api.getUser().subscribe(res => {
      this.userData = res.slice(0, this.userCounter)
    })
  }

  ifAllInput(): boolean {
    return (this.f['lastName'].getError('required') === null
      && this.f['lastName'].getError('minlength') === null
      && this.f['firstName'].getError('required') === null
      && this.f['firstName'].getError('minlength') === null
      && this.f['fathersName'].getError('required') === null
      && this.f['fathersName'].getError('minlength') === null
      && this.f['address'].getError('required') ) === null
  }

  configAddress: DadataConfig = {
    apiKey: 'aa8c5699de39bdf635d07cf8ff4da923a0ae4431 ',
    type: DadataType.address
  }

}
