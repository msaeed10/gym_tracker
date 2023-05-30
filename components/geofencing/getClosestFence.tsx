import { CoordsModel } from "../../model/CoordsModel";
import { Place } from "../../db/PlaceDatabase"

export const getClosestFence = (coord: CoordsModel, places: ReadonlyArray<Place>): Place => {

    // use Haversine formula to figure out whats the closest distance
    return places[0];
}