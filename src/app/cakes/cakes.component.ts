import { Component, OnInit } from "@angular/core";
import { Cake } from "../model/cake.model";
import { CakeService } from "../service/cake.service";

@Component({
  selector: "app-cakes",
  templateUrl: "./cakes.component.html",
  styleUrls: ["./cakes.component.css"],
})
export class CakesComponent implements OnInit {
  constructor(private service: CakeService) {}

  cakes: Cake[] = [];
  images: string = "https://cakes-server.onrender.com/image/cakes";
  ingredients: [] = [];

  params = {
    sort: "name",
    sortDirection: "asc",
    filter: {
      ingredients: "",
    },
  };

  ngOnInit(): void {
    this.getCakes();
    this.getIngred();
  }

  getCakes() {
    this.service.getCakes(this.params).subscribe((cakes: Cake[]) => {
      this.cakes = cakes;
    });
  }

  getIngred() {
    this.service.getIngredients().subscribe((ingredients: []) => {
      this.ingredients = ingredients;
    });
  }

  getDetails() {}
}
