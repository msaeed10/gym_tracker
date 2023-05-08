import Realm from 'realm';
import {createRealmContext} from '@realm/react';

export class Region extends Realm.Object<Region> {
    _id!: Realm.BSON.ObjectId;
    address!: string;
    city!: string;
    state!: string;
    zipCode!: string;
    meters!: string;
    user?: string;
  
    static schema = {
        name: "Region",
        properties: {
            _id: "string",
            address: "string",
            city: "string",
            state: "string",
            zipCode: "string",
            meters: "string",
            user: "string"
        },
        primaryKey: "_id"
    };
}

const regionConfig: Realm.Configuration = {
    schema: [Region],
};

export default createRealmContext(regionConfig)