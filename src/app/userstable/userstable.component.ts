import {Component, NgZone, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "../user";
import {ApiService} from "../shared/api.service";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {filter, pairwise, throttleTime} from "rxjs";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-userstable',
  templateUrl: './userstable.component.html',
  styleUrls: ['./userstable.component.scss']
})

export class UserstableComponent {
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
      throttleTime(800),
    ).subscribe(() => {
      this.ngZone.run(() => {
        this.getMore()
      })
    })
  }

  public clickAddUser() {
    this.formValue.reset()
    this.showAdd = true
    this.showUpdate = false
  }


  public getMore() {
    this.api.getUser().subscribe(res => {
      this.userData = this.userData.concat(res.slice(this.userCounter, this.userCounter + 15))
    })
    this.userCounter = this.userData.length
  }

  public getAllUsers() {
    this.api.getUser().subscribe(res => {
      this.userData = res.slice(0, this.userCounter)
    })
  }

  public deleteUser(user: any) {
    this.api.deleteUser(user.id)
      .subscribe(res =>{
      alert("???????????????????????? ????????????!")
        this.getAllUsers()
      })
  }

  public onEdit(user: any) {
    this.showAdd = false
    this.showUpdate = true
    this.userObj.id = user.id
    this.formValue.controls['lastName'].setValue(user.lastName)
    this.formValue.controls['firstName'].setValue(user.firstName)
    this.formValue.controls['fathersName'].setValue(user.fathersName)
    this.formValue.controls['address'].setValue(user.address)
  }

  public updateUserData(e: any): void {
      this.userData = e
  }

}
