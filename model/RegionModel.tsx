export type RegionModel = {
    id: Realm.BSON.ObjectId | undefined;
    address: string | undefined; 
    city: string | undefined;
    state: string | undefined;
    zipCode: string | undefined;
    meters: string | undefined;
};