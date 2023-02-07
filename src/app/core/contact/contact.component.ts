import { Message } from "../../model/message.model";
import { Component, OnInit } from "@angular/core";
import { User } from "src/app/model/user.model";
import { CakeService } from "src/app/service/cake.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  user: User[] = [];
  userMSg: Message = new Message();

  constructor(private service: CakeService, private router: Router) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.service.getUser().subscribe((user: User[]) => {
      this.user = user;
    });
  }

  onSubmit() {
    this.userMSg.name = this.user[0].firstName + " " + this.user[0].lastName;
    this.userMSg.email = this.user[0].email;
    if (!this.userMSg.name || !this.userMSg.email || !this.userMSg.message) {
      alert('Proverite Unos!')
      return;
    }
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userMSg.email)
    ) {
      alert("Proverite unos email-a.");
      return;
    }

    this.service.postMessage(this.userMSg).subscribe((data: Message) => {
      this.router.navigate(["/cakes"]);
    });
  }
}
