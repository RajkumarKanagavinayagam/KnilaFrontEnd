import { Component, ElementRef } from '@angular/core';
import { GridList, UserLists } from '../Model/UserLists';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent {
  hide: any;
  private subject = new Subject<boolean>();
  userHasRole: boolean = false;
  token: any = null;
  userRole: any;
  // sorting column
  firstName: string = 'fa fa-chevron-down sort_button';
  lastname: string = 'fa fa-chevron-down sort_button';
  address: string = 'fa fa-chevron-down sort_button';
  emailID: string = 'fa fa-chevron-down sort_button';
  // DialogData
  selectedformValue: any = [];
  selectedrouteValue: any = [];
  filterSearchKeyword: string = '';
  filterDailogString: string = '';

  data: UserLists[] = [];
  searchKeyword: string = '';
  paginationInfo: string = '';
  sortingName: string = '';
  sortingType: string = 'DESC';
  // Total number of pages

  filterArray: GridList[] = [];
  config: any;
  constructor(
    private router: Router,
    private service: UserService,
    //public dialog: MatDialog,
    private http: HttpClient,
    private toastr: ToastrService,
    private elementRef: ElementRef,
    public dialog: MatDialog
  ) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 5,
      totalItems: 0,
    };
    this.token = sessionStorage.getItem('AccessToken');
    if (this.token !== null) {
      this.token = sessionStorage.getItem('AccessToken');
      let decodedJWT = JSON.parse(
        window.atob(this.token?.toString().split('.')[1])
      );
      this.userRole = decodedJWT.UserRole;
    }
  }
  ngOnInit(): void {
    debugger;
    this.fetchData(this.searchKeyword, this.filterDailogString);
  }
  fetchData(searchKeyword: string, filterDailogString: string) {
    var search =
      this.filterSearchKeyword == '' || this.filterSearchKeyword == null
        ? this.searchKeyword
        : this.filterSearchKeyword;

    this.service
      .getUserList(
        search,
        filterDailogString,
        this.sortingName,
        this.sortingType
      )
      .subscribe({
        next: (response) => {
          debugger;
          this.data = response.listResult;
        },

        error: (error) => {
          this.toastr.error('Something went wrong !');
        },
      });
  }

  filterData(value: string): void {
    // Current active page
    this.searchKeyword = value;
    this.fetchData(this.searchKeyword, this.filterDailogString);
  }

  changePageSize(event: Event): void {
    const target = event.target as HTMLSelectElement;
    debugger;
    this.fetchData(this.searchKeyword, this.filterDailogString);
  }

  toggleDropdown(event: MouseEvent): void {
    const dropdown = (event.currentTarget as HTMLElement).querySelector(
      '.dropdown-content'
    );

    // Close all other dropdowns
    const allDropdowns = document.querySelectorAll('.dropdown-content');
    allDropdowns.forEach((d) => {
      if (d !== dropdown) {
        d.classList.remove('show');
      }
    });

    // Toggle the dropdown of the clicked element
    dropdown?.classList.toggle('show');

    // Prevent event bubbling
    event.stopPropagation();
  }
  OpenContact(event: any) {
    this.router.navigate(['/AddContact']);
  }

  navigateToEdit(event: Event, contactID?: number) {
    debugger;
    event.preventDefault();
    // Navigate to the editpatient component
    this.router.navigate(['/edituser', contactID]);
  }

  removeUser(ContactID?: number): void {
    if (typeof ContactID !== 'number') {
      this.toastr.error('Invalid contact ID!');
      return;
    }
    this.service.removeuserDetails(ContactID).subscribe(
      (response: any) => {
        if (response.isSuccess) {
          this.toastr.success('User has been successfully deleted.');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          this.toastr.warning(response.result);
        }
      },
      (error: any) => {
        this.toastr.error('Something went wrong!');
      }
    );
  }

  confirm(message: string): Observable<boolean> {
    this.toastr.info(message, 'Confirmation', {
      timeOut: 5000,
      tapToDismiss: false,
      toastClass: 'ngx-toastr confirm',
      onActivateTick: true,
    });

    return this.subject.asObservable();
  }

  confirmResult(result: boolean): void {
    this.subject.next(result);
    this.subject.complete();
  }
}
