import { Component, OnInit } from '@angular/core';
import { LocationServiceService } from 'src/app/services/Location/location-service.service';
import { Chart, registerables } from 'chart.js';
import { r } from 'chart.js/dist/chunks/helpers.core';
Chart.register(
  ...registerables
)
@Component({
  selector: 'app-graphas',
  templateUrl: './graphas.component.html',
  styleUrls: ['./graphas.component.css']
})
export class GraphasComponent implements OnInit {

  locationCount: object[] = [{
    'id': 0,
    'location': '',
    'count': 0,
  },
  ];

  locataionList: any;
  locations: string[] = [];
  counts: number[] = [];
  colorsData: string[] = [];
  colors: string[] = ['red', 'yellow', 'green', 'blue'];

  constructor(private locationService: LocationServiceService,) { }

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations() {
    this.locationService.getAllLocations().subscribe(
      (response: any) => {
        this.locationCount = response;
        this.locataionList = response;
        for (var obj of response) {
          this.locations.push(obj.location);
          this.counts.push(obj.count);
          if (obj.count <= 2) this.colorsData.push(this.colors[0]);
          else if (obj.count >= 2 && obj.count <= 5) this.colorsData.push(this.colors[1]);
          else if (obj.count >= 5 && obj.count <= 8) this.colorsData.push(this.colors[2]);
          else this.colorsData.push(this.colors[3])
        }
        this.RenderChart();
      },
      (error: any) => {
        console.log(error);
        console.log('error in Locations List Fetching !!')
      }
    )
  }

  RenderChart() {
    const myChart = new Chart('bar', {
      type: 'bar',
      data: {
        labels: this.locations,
        datasets: [{
          label: 'of Bookings',
          data: this.counts,
          backgroundColor: this.colorsData,
          borderColor: [
            'white'
          ],
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    })
  }
}
