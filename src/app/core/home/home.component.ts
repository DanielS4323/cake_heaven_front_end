import { Component, OnInit } from "@angular/core";
import { Slide } from "src/app/model/slide";
import { CakeService } from "src/app/service/cake.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private service: CakeService) {}

  slides: Slide[] = [];

  bakeryImage: string = "https://cakes-server.onrender.com/image/slideshow/bakery.jpg"

  cakesImage: string = "https://cakes-server.onrender.com/image/slideshow/cakes.jpg"

  world: string = "https://cakes-server.onrender.com/image/slideshow/world.jpg"

  ngOnInit(): void {
    this.getSlide();
  }

  getSlide() {
    this.service.getSlide().subscribe((slides: Slide[]) => {
      this.slides = slides;
    });
  }
}
