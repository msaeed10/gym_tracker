import { Geofence } from "../../db/PlaceDatabase";
import { CoordsModel } from "../../model/CoordsModel";

const isWithinPlace = (point: CoordsModel, geofence: ReadonlyArray<Geofence>): boolean => {
    let j = 0;
    let edges = geofence;
    let numSides = geofence.length;
    let oddNodes = false;
    for(let i = 0; i < numSides; i++) {
        j++;
        if(j == numSides){
            j = 0;
        }
        if( 
            ((edges[i].latitude < point.latitude) && (edges[j].latitude >= point.latitude)) || 
            ((edges[j].latitude < point.latitude) && (edges[i].latitude >= point.latitude))
            ) {
                if(edges[i].longitude + (point.latitude - edges[i].latitude) / (edges[j].latitude - edges[i].latitude) * (edges[j].longitude - edges[i].longitude) < point.longitude) {
                    oddNodes = !oddNodes;
                }
            }
    }
    return oddNodes;
}

export default isWithinPlace;