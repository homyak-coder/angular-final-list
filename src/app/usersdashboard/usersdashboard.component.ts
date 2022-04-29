import {Component, NgZone, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "../user";
import {ApiService} from "../shared/api.service";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {filter, pairwise, throttleTime} from "rxjs";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-usersdashboard',
  templateUrl: './usersdashboard.component.html',
  styleUrls: ['./usersdashboard.component.scss']
})

export class UsersdashboardComponent {
  @ViewChild(CdkVirtualScrollViewport) private _scroller!: CdkVirtualScrollViewport;

  public formValue = new FormGroup({
    lastName: new FormControl(null,
      Validators.compose([Validators.required, Validators.minLength(2)])),
  firstName: new FormControl(null,
    Validators.compose([Validators.required, Validators.minLength(2)])),
  fathersName: new FormControl(null,
    Validators.compose([Validators.required, Validators.minLength(2)])),
  address: new FormControl(null, [Validators.required])
})

  public submitted: boolean = false
  public userObj: User = new User()
  public userData !: any
  public userCounter : number = 20
  public showAdd !: boolean
  public showUpdate !: boolean


  constructor(private api: ApiService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.getAllUsers()
  }


  ngAfterViewInit(): void{
    this._scroller.elementScrolled().pipe(
      map(() => this._scroller.measureScrollOffset("bottom")),
      pairwise(), // y1 y2
      filter(([y1, y2]) => (y2 < y1) && (y2 < 140)),
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


  fetchMore() {
    this.api.getUser().subscribe(res => {
      this.userData = this.userData.concat(res.slice(this.userCounter, this.userCounter + 15))
    })
    // this.userCounter = (this.userData.length - 10)
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

  updateUserData(e: any): void {
      this.userData = e
      console.log(this.userData)
  }

}
