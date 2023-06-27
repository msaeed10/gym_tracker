import { CoordsModel } from "../../model/CoordsModel";
import { Place } from "../../db/PlaceDatabase"

// use Haversine formula to figure out whats the closest place
export const getClosestFence = (coord: CoordsModel, places: ReadonlyArray<Place>): Place | undefined => {
    const toRadian = (angle: number) => (Math.PI / 180) * angle;
    const distance = (a: number, b: number) => (Math.PI / 180) * (a - b);
    const RADIUS_OF_EARTH_IN_KM = 6371; 

    let closestDistance = Number.MAX_VALUE;
    let closestPlace: Place | undefined = undefined;

    places.forEach(place => {
        let latDiff = distance(place.latitude, coord.latitude);
        let longDiff = distance(place.longitude, coord.longitude);
        
        const a = Math.pow(Math.sin(latDiff / 2), 2) +
            Math.pow(Math.sin(longDiff / 2), 2) * 
            Math.cos(toRadian(coord.latitude)) * Math.cos(toRadian(place.latitude));

        const c = 2 * Math.asin(Math.sqrt(a));

        let finalDistance = RADIUS_OF_EARTH_IN_KM * c;
        
        if(finalDistance < closestDistance) {
            closestDistance = finalDistance;
            closestPlace = place;
        }
    });

    return closestPlace;
}