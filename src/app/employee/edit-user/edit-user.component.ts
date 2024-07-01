import { Component } from '@angular/core';
import { UserModel } from '../Model/user-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent {
  userData: UserModel = new UserModel();
  contactId?: number;
  userForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    debugger;
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      email: [''],
      password: [''],
      address: [''],
      country: [''],
      state: [''],
      postalCode: [''],
      city: [''],
    });
    // Call getPatientDetails here
    this.route.paramMap.subscribe((params) => {
      const contactIdString = params.get('contactID');
      this.contactId = contactIdString !== null ? +contactIdString : 0;
      if (this.contactId) {
        this.getuserDetails();
      } else {
        console.error('userRefID is null');
      }
    });
  }
  closeDialog() {
    this.router.navigate(['/ListUser']);
  }

  getuserDetails(): void {
    debugger;
    if (typeof this.contactId === 'number') {
      this.userService.getuserDetails(this.contactId).subscribe(
        (response) => {
          if (response.isSuccess === true) {
            debugger;
            this.userForm.patchValue({
              firstName: response.result.firstName,
              lastName: response.result.lastName,
              phoneNumber: response.result.phoneNumber,
              email: response.result.email,
              password: response.result.password,
              address: response.result.address,
              country: response.result.country,
              state: response.result.state,
              postalCode: response.result.postalCode,
              city: response.result.city,
            });
            console.log(this.userForm);
          } else {
            this.toastr.warning('Data not fetched');
          }
        },
        (error) => {
          this.toastr.error('Something went wrong!');
        }
      );
    } else {
      // Handle case where this.contactId is undefined or not a number
      this.toastr.error('Invalid contactId');
    }
  }
  onKeyPress(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);
    // Allow digits (0-9) and "+" symbol at the beginning of the input
    if (!/^(\+?[0-9]*)$/.test(inputChar) && event.charCode !== 43) {
      event.preventDefault();
    }
  }
  maxLength: number = 100;
  onKeyUpChar(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length > this.maxLength) {
      input.value = input.value.slice(0, this.maxLength);
    }
  }
  onKeyDownChar(event: KeyboardEvent): void {
    // Allow only alphabetic characters and spaces
    if (!event.key.match(/^[a-zA-Z\s]*$/)) {
      event.preventDefault();
    }
  }

  onSubmit(): void {
    debugger;
    // Assuming you have a PatientViewEntity model with the same properties as your form
    const editedPatient: UserModel = this.userForm.value;

    editedPatient.ContactID = this.contactId;

    this.userService.adduserData(editedPatient).subscribe(
      (response) => {
        console.log(response);
        debugger;
        if (response.isSuccess == true) {
          this.toastr.success('User Details Successfully Updated !');
          this.router.navigate(['/ListUser']);
        } else {
          this.toastr.warning('Oops! Users Not Updated');
        }
      },
      (error) => {
        this.toastr.error('Something went wrong !');
      }
    );
  }
}
