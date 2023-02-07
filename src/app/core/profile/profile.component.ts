import { Component, OnInit } from "@angular/core";
import { User } from "src/app/model/user.model";
import { CakeService } from "src/app/service/cake.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  constructor(private service: CakeService) {}

  user: User[] = [];
  editBtn: boolean = false;

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.service.getUser().subscribe((user: User[]) => {
      this.user = user;
    });
  }

  onSubmit(userId: number) {
    if (
      !this.user[0].firstName ||
      !this.user[0].lastName ||
      !this.user[0].email
    ) {
      return;
    }

    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.user[0].email)
    ) {
      return;
    }
    this.service.putUser(userId, this.user[0]).subscribe((data: User) => {});
    this.editBtn = false;
  }
  onOff() {
    this.editBtn = !this.editBtn;
  }
}
