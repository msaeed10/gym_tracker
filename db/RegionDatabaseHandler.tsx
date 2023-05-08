import { RegionModel } from "../model/RegionModel";
import RealmContext, { Region } from "./RegionDatabase";
import 'react-native-get-random-values';

const {useRealm} = RealmContext;
const realm = useRealm();

export const getRegions = (user: string) => {
    return realm.objects("Region").filtered('user == $0', 'testUser')
}

export const saveRegion = (region: RegionModel) => {
    realm.write(() => {
        realm.create('Region', {
            _id: new Realm.BSON.ObjectId().toHexString(),
            address: region.address,
            city: region.city,
            state: region.state,
            zipCode: region.zipCode,
            meters: region.meters,
            user: "testUser"
        });
    });
}

export const updateRegion = (region: Region) => {
    let existingRegion = realm.objects("Region").filtered('_id == $0', region._id)[0];

    realm.write(() => {
        existingRegion.address = region.address;
        existingRegion.city = region.city;
        existingRegion.state = region.state;
        existingRegion.zipCode = region.zipCode;
        existingRegion.meters = region.meters;
    });
}

export const deleteRegion = (regionId: string, ) => {
    let existingRegion = realm.objects("Region").filtered('_id == $0', regionId)[0];

    realm.write(() => {
        realm.delete(existingRegion);
    });
}