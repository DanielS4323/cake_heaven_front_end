import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cake } from 'src/app/model/cake.model';
import { CakeService } from 'src/app/service/cake.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  cakeId: number = 0
  cake: Cake = new Cake()
  images: string = 'https://cakes-server.onrender.com/image/cakes'

  constructor(private route: ActivatedRoute,
    private service: CakeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.cakeId = routeParams['id']
      this.getDetails()

    })
  }

  getDetails() {
    this.service.getDetails(this.cakeId).subscribe((cake: Cake) => {
      this.cake = cake
      
  })
  }

}
