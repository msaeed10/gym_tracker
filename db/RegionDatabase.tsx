import Realm from 'realm';
import {createRealmContext} from '@realm/react';

export class Region extends Realm.Object<Region> {
    _id!: string;
    location!: string;
    name!: string;
    latitude!: number;
    longitude!: number;
    meters!: string;
    user?: string;
  
    static schema = {
        name: "Region",
        properties: {
            _id: "string",
            location: "string",
            latitude: "float",
            longitude: "float",
            name: "string",
            meters: "int",
            user: "string"
        },
        primaryKey: "_id"
    };
}

const regionConfig: Realm.Configuration = {
    schema: [Region],
    deleteRealmIfMigrationNeeded: true
};

export default createRealmContext(regionConfig)