import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { AddressModel } from '../shared/models/address-model';
import { AddressService } from '../shared/services/address.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  submitted: boolean = false;
  addressId: number = 0;
  addressList?: AddressModel[];

  AddressForm: FormGroup = new FormGroup({
    addressId: new FormControl(''),
    house: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
    zipCode: new FormControl(''),
    type: new FormControl(''),
  });
  UserId: number = Number(localStorage.getItem('userId'));
  OrderId: number = 0;


  constructor(public AddressService: AddressService,
    private formBuilder: FormBuilder,
    public route: ActivatedRoute) { }


  get f(): { [key: string]: AbstractControl } {
    return this.AddressForm.controls;
  }


  onReset(): void {
    this.submitted = false;
    this.AddressForm.reset();
  }


  async onSubmit(formValues: any) {
    debugger
    this.submitted = true;
    if (this.AddressForm.invalid) {
      return;
    }
    const formValue = { ...formValues };

    var AddressDetails: InModel = new InModel();
    AddressDetails.In.house = formValue.house;
    AddressDetails.In.street = formValue.street;
    AddressDetails.In.city = formValue.city;
    AddressDetails.In.state = formValue.state;
    AddressDetails.In.country = formValue.country;
    AddressDetails.In.zipCode = formValue.zipCode;
    AddressDetails.In.addressType = formValue.type;

    this.route.paramMap.subscribe(async params => {
      var id = Number(params.get('id'));
      AddressDetails.In.orderId = id;
    });

    AddressDetails.In.userId = Number(localStorage.getItem("userId"));
    if (this.addressId == 0 || this.addressId == null) {
      await this.AddressService.add(AddressDetails).subscribe({
        next: (_) => {
          document.getElementById("success-alert")!.style.display = "block";
          document.getElementById("danger-alert")!.style.display = "none";
          document.getElementById("success-alert")!.innerHTML = "added successfully";
        },
        error: (err: HttpErrorResponse) => {
          document.getElementById("danger-alert")!.style.display = "block";
          document.getElementById("danger-alert")!.innerHTML = "something went wrong";
        }
      })
    }
    else {
      AddressDetails.In.id = Number(this.addressId);
      await this.AddressService.update(AddressDetails).subscribe({
        next: (_) => {
          document.getElementById("success-alert")!.style.display = "block";
          document.getElementById("danger-alert")!.style.display = "none";
          document.getElementById("success-alert")!.innerHTML = "updated successfully";
        },
        error: (err: HttpErrorResponse) => {
          document.getElementById("danger-alert")!.style.display = "block";
          document.getElementById("danger-alert")!.innerHTML = "something went wrong";
        }
      })
    }
  }


  async setValuesInForm(res: any) {
    debugger
    this.AddressForm.controls["addressId"].setValue(res.id);
    this.AddressForm.controls["house"].setValue(res.productSubcategoryId);
    this.AddressForm.controls["street"].setValue(res.discountId);
    this.AddressForm.controls["city"].setValue(res.name);
    this.AddressForm.controls["state"].setValue(res.description);
    this.AddressForm.controls["country"].setValue(res.price);
    this.AddressForm.controls["zipCode"].setValue(res.brand);
    this.AddressForm.controls["addressType"].setValue(res.brand);
    this.addressId = res.id;
  }


  async initialValues(addressId: number) {
    await this.AddressService.getById(addressId).subscribe(
      async res => {
        await this.setValuesInForm(res);
      }
    )
  }


  async addressesOfUser(userId: number) {
    this.AddressService.getAllByUserId(userId).subscribe(res => {
      this.addressList = res;
    });
  }


  async onClickShowAddress(addressId: number) {
    debugger
    await this.AddressService.getById(addressId).subscribe(async res => {
      await this.setValuesInForm(res);
    })
  }


  ngOnInit(): void {
    this.AddressForm = this.formBuilder.group({
      house: ['', [Validators.required]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
    this.addressesOfUser(this.UserId);
  }
}


class InModel {
  In: AddressModel = new AddressModel();
}