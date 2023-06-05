import React, { useEffect, useState } from 'react';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import { CoordsModel } from '../../model/CoordsModel';
import { getClosestFence } from '../geofencing/getClosestFence';
import RealmContext, { Place } from "../../db/PlaceDatabase"
import isWithinPlace from '../geofencing/isWithinPlace';

const { useQuery } = RealmContext;

const useTracking = () => {
    const [timer, setTimer] = useState(0);
    const [currentLocation, setCurrentLocation] = useState<CoordsModel>();
    const places: ReadonlyArray<Place> = useQuery(Place).filtered("user == $0", "testUser");


    useEffect(() => {
        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
            stationaryRadius: 50,
            distanceFilter: 50,
            notificationTitle: 'Background tracking',
            notificationText: 'enabled',
            debug: true,
            startOnBoot: false,
            stopOnTerminate: true,
            locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
            interval: 10000,
            fastestInterval: 5000,
            activitiesInterval: 10000,
            stopOnStillActivity: false,
            url: 'http://192.168.81.15:3000/location',
            httpHeaders: {
              'X-FOO': 'bar'
            },
            // customize post properties
            postTemplate: {
              lat: '@latitude',
              lon: '@longitude',
            }
        });

        BackgroundGeolocation.on('location', (location) => {
            const coordLocation: CoordsModel = {
                latitude: location.latitude, 
                longitude: location.longitude
            }
            setCurrentLocation(coordLocation);

            const closestPlace: Place | undefined = getClosestFence(coordLocation, places);

            if(isWithinPlace(coordLocation, closestPlace!.geofence)) {
                setTimer(Date.now())
            };
        });
    });
}

export default useTracking;