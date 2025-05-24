import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfigService } from '../services/config.service';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { BookingService } from './booking.service';
import { exhaustMap } from 'rxjs';
import { CustomValidator } from './validators/custom-validator';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'hinv-booking',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatDatepickerModule, MatButtonModule, MatExpansionModule, MatIconModule, MatCheckboxModule, HttpClientModule, MatSnackBarModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit{
  bookingForm !: FormGroup;
  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }
  constructor(private configService: ConfigService, private fb:FormBuilder, private bookingService: BookingService, private route:ActivatedRoute) {}
  ngOnInit(): void {
    const roomID=this.route.snapshot.paramMap.get('roomid');
    this.bookingForm=this.fb.group({
      roomId:new FormControl({value:roomID, disabled:true},{validators:[Validators.required]}),
      guestEmail:['', {updateOn:'blur', validators: [Validators.required, Validators.email]}],
      checkinDate:[''],
      checkoutDate:[''],
      bookingStatus:[''],
      bookingAmount:[''],
      bookingDate:[''],
      mobileNumber:['', {updateOn:'blur'}],
      guestName:['',[Validators.required,Validators.minLength(5),CustomValidator.ValidateName, CustomValidator.ValidateSpecialChar('*')]],
      address: this.fb.group({
        addressLine:['', {validators:[Validators.required]}],
        addressLine2:[''],
        city:['', {validators:[Validators.required]}],
        state:['', {validators:[Validators.required]}],
        country:[''],
        zipCode:[''],
      }),
      guests: this.fb.array([
        this.fb.group({guestName:[''],age:new FormControl('')})
      ]),
      tnc: new FormControl(false, { validators: [Validators.requiredTrue]})
    },{updateOn:'blur', validators:[CustomValidator.Validatedate]});
    this.getBookingData();
    // this.bookingForm.valueChanges.subscribe((data)=>{
    //   this.bookingService.bookRoom(data).subscribe((data)=>{})
    // })
    this.bookingForm.valueChanges.pipe(
      exhaustMap((data)=>this.bookingService.bookRoom(data))
    ).subscribe((data)=>console.log(data));
  }
  addBooking() {
    console.log(this.bookingForm.getRawValue());
    // this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data)=>{console.log(data)})
    this.bookingForm.reset({
      roomId:'2',
      guestEmail:'',
      checkinDate:'',
      checkoutDate:'',
      bookingStatus:'',
      bookingAmount:'',
      bookingDate:'',
      mobileNumber:'',
      guestName:'',
      address: this.fb.group({
        addressLine:'',
        addressLine2:'',
        city:'',
        state:'',
        country:'',
        zipCode:'',
      }),
      guests: [],
      tnc: false
    });
  }
  addGuests() {
    this.guests.push(this.addGuestControl());
  }
  addGuestControl() {
    return this.fb.group({guestName: ['', { validators: [Validators.required]}], age: new FormControl('')});
  }
  addPassport() {
    this.bookingForm.addControl('passport',new FormControl(''));
  }
  deletePassport() {
    if(this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }
  removeGuest(i:number) {
    this.guests.removeAt(i)
  }
  getBookingData() {
    this.bookingForm.patchValue({
      guestEmail:'test@gmail.com',
      checkinDate:new Date('20-May-2025'),
      bookingStatus:'',
      bookingAmount:'',
      bookingDate:'',
      mobileNumber:'',
      guestName:'',
      address: this.fb.group({
        addressLine:'',
        addressLine2:'',
        city:'',
        state:'',
        country:'',
        zipCode:'',
      }),
      guests: [],
      tnc: false
    })
  }
}
