import { CoordsModel } from "./CoordsModel";

export type SearchResultModel = {
    placeId: string,
    location: string,
    geometry: CoordsModel,
    name: string
};