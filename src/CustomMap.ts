import { Loader } from '@googlemaps/js-api-loader';

export interface Mappable {
  location: { lat: number; lng: number };
  markerContent(): string;
  color: string;
}

export class CustomMap {
  private googleMap: google.maps.Map;
  private isInitialized: boolean = false;

  constructor(divId: string) {
    this.initializeMap(divId);
  }

  private async initializeMap(divId: string): Promise<void> {
    if (this.isInitialized) return;

    try {
      const loader = new Loader({
        apiKey: 'AIzaSyAXwRNFksnxRXxiGVTLeQGaWOyJ7qJzH8M',
        version: 'weekly',
        libraries: ['places', 'geometry'],
      });

      await loader.load();

      const { Map } = (await google.maps.importLibrary(
        'maps'
      )) as google.maps.MapsLibrary;
      this.googleMap = new Map(document.getElementById('map') as HTMLElement, {
        zoom: 1,
        center: { lat: 0, lng: 0 },
      });

      this.isInitialized = true;
    } catch (error) {
      console.error('Error loading Google Maps marker library:', error);
      throw error;
    }
  }

  /**
   * Adds a marker to the map for the given mappable object.
   * @param mappable An object that has a location property with lat and lng.
   */
  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
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

  get isMapInitialized(): boolean {
    return this.isInitialized;
  }
}
