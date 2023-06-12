import Realm from 'realm';
import {createRealmContext} from '@realm/react';

export class Geofence extends Realm.Object<Place> {
    _id!: Realm.BSON.ObjectId;
    latitude!: number;
    longitude!: number;

    static schema = {
        name: "Geofence",
        properties: {
            _id: "objectId",
            latitude: "float",
            longitude: "float",
        },
        primaryKey: "_id"
    };
}

export class Place extends Realm.Object<Place> {
    _id!: string;
    location!: string;
    name!: string;
    latitude!: number;
    longitude!: number;
    geofence!: Array<Geofence>;
  
    static schema = {
        name: "Place",
        properties: {
            _id: "string",
            location: "string",
            latitude: "float",
            longitude: "float",
            name: "string",
            geofence: {
                type: "list",
                objectType: "Geofence"
            },
        },
        primaryKey: "_id"
    };
}

const placeConfig: Realm.Configuration = {
    schema: [Place, Geofence],
    deleteRealmIfMigrationNeeded: true
};

export default createRealmContext(placeConfig)