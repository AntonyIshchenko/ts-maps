import { User } from './User';
import { Company } from './Company';
import { CustomMap } from './CustomMap';

const user = new User();
console.log(user);

const company = new Company();
console.log(company);

const customMap = new CustomMap('map');

const initMarkers = async () => {
  while (!customMap.isMapInitialized) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  customMap.addMarker(user);
  customMap.addMarker(company);
};

initMarkers();
