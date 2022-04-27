import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {User} from "../user";
import {ApiService} from "../shared/api.service";
import {DadataConfig, DadataType} from "@kolkov/ngx-dadata"
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {filter, pairwise, throttleTime} from "rxjs";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-usersdashboard',
  templateUrl: './usersdashboard.component.html',
  styleUrls: ['./usersdashboard.component.scss']
})
// export class UsersdashboardComponent implements OnInit {
export class UsersdashboardComponent {
  @ViewChild(CdkVirtualScrollViewport) private _scroller!: CdkVirtualScrollViewport;

  formValue!: FormGroup
  userObj: User = new User()
  userData !: any
  userCounter : any = 20
  showAdd !: boolean
  showUpdate !: boolean

  constructor(private formBuilder: FormBuilder, private api: ApiService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.formValue = new FormGroup({
       lastName: new FormControl('', Validators.requiredTrue),
       firstName: new FormControl('', Validators.requiredTrue),
       fathersName: new FormControl('', Validators.requiredTrue),
       address: new FormControl('', Validators.requiredTrue)
    })
    this.getAllUsers()
  }

  ngAfterViewInit(): void{
    this._scroller.elementScrolled().pipe(
      map(() => this._scroller.measureScrollOffset("bottom")),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1) && (y1 < 140)),
      throttleTime(200),
    ).subscribe(() => {
      this.ngZone.run(() => {
        this.fetchMore()
      })
    })
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

  fetchMore() {
    this.api.getUser().subscribe(res => {
      this.userData = this.userData.concat(res.slice(this.userCounter, this.userCounter + 25))
      console.log(this.userData)
    })
    this.userCounter = this.userData.length
  }

  getAllUsers() {
    this.api.getUser().subscribe(res => {
      this.userData = res.slice(0, this.userCounter)
    })
  }

  deleteUser(user: any) {
    this.api.deleteUser(user.id)
      .subscribe(res =>{
      alert("Пользователь удалён!")
        this.getAllUsers()
      })
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
      .subscribe(res => {
        alert('Успешно обновлён')
        let ref = document.getElementById('cancel')
        ref?.click()
        this.formValue.reset()
        this.getAllUsers()
      })
  }

  configAddress: DadataConfig = {
    apiKey: 'aa8c5699de39bdf635d07cf8ff4da923a0ae4431 ',
    type: DadataType.address
  }


}
