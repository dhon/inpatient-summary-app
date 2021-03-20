import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '@app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$ = this.authenticationService.currentUser.pipe(map(user => user ? true : false));

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
