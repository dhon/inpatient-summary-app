import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { AuthenticationService } from "@app/services";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$ = this.authenticationService.currentUser.pipe(
    map((user) => (user ? true : false))
  );

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
