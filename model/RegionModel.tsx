export type RegionModel = {
    id: Realm.BSON.ObjectId | undefined;
    address: string; 
    city: string;
    state: string;
    zipCode: string;
    meters: string;
};