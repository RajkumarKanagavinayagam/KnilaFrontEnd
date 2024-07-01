import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isOpen = false;
  isDropdownOpen = false;
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader = event.url !== '/Signin';
      }
    });
  }
  title = 'KnilaFrontEnd';
  contentData: string = 'List Users';
  token: any = null;
  showHeader: boolean = true;
  isSidebarExpanded: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute) {}
  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }

  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }

  toggleDropDown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  isSignInPage(): boolean {
    // Check if the current route is the login page
    return this.router.url === '/Signin' || this.router.url === '/'; // Adjust the route path as needed
  }
  signOut() {
    this.router.navigate(['/Signin']);
  }
}
