import {Component, OnInit, VERSION} from '@angular/core';
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit{
  name = 'Angular ' + VERSION.major;
  div = 'viewDiv';


  ngOnInit() {
    this.initMapWithMapImageLayer();

  }

  private initMapWithMapImageLayer(){
    const url = 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer'; // wkid 4269 fails
    // const url = 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer'; // wkid 4326 works
    const mapView = new MapView({
        container: this.div,
        map: new Map({
            layers: [new MapImageLayer({url: url})]
        })
    });
    mapView.when(() => {
          mapView.ui.add(new ScaleBar({view: mapView}), 'bottom-right');
        });
  }

  private initMapWithBaseMap(){
        const map = new Map({
          basemap: "topo-vector"
        });
        const mapView = new MapView({
          container: this.div,
          map: map,
        });

        const scalebar = new ScaleBar({
          view: mapView
        });
        mapView.ui.add(scalebar, 'bottom-right');
  }
}
