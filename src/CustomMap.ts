export interface Mappable {
  location: { lat: number; lng: number };
  markerContent(): string;
  color: string;
}

export class CustomMap {
  private googleMap: google.maps.Map;
  private isInitialized: boolean = false;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(
      document.getElementById(divId) as HTMLElement,
      {
        zoom: 1,
        center: { lat: 0, lng: 0 },
      }
    );
  }

  /**
   * Adds a marker to the map for the given mappable object.
   * @param mappable An object that has a location property with lat and lng.
   */
  addMarker(mappable: Mappable): void {
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent(),
      });
      infoWindow.open(this.googleMap, marker);
    });
  }
}
