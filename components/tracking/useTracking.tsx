import React, { useEffect, useState } from 'react';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import { CoordsModel } from '../../model/CoordsModel';
import { getClosestFence } from '../geofencing/getClosestFence';
import RealmContext, { Place } from "../../db/PlaceDatabase"
import isWithinPlace from '../geofencing/isWithinPlace';

const { useQuery } = RealmContext;

const useTracking = () => {
    const [timer, setTimer] = useState(0);
    const [isInCurrentPlace, setIsInCurrentPlace] = useState(false);
    const places: ReadonlyArray<Place> = useQuery(Place);
    let totalEstimatedTime = 0;

    useEffect(() => {
        console.log("configuring tracking")
        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.MEDIUM_ACCURACY,
            stationaryRadius: 50,
            distanceFilter: 50,
            debug: false,
            stopOnTerminate: true,
            locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
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
            const closestPlace: Place | undefined = getClosestFence(coordLocation, places);

            if(isWithinPlace(coordLocation, closestPlace!.geofence) && !isInCurrentPlace) {
                console.log("is in the place");
                setTimer(Date.now());
                setIsInCurrentPlace(true);
            };
            if(isInCurrentPlace && !isWithinPlace(coordLocation, closestPlace!.geofence)) {
                totalEstimatedTime = timer - Date.now();
                console.log(`is not in the place ${totalEstimatedTime}`);
            }
        });
        BackgroundGeolocation.checkStatus(status => {
            console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
            console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
            console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);
        
            if (!status.isRunning) {
                console.log('[INFO] BackgroundGeolocation starting');
                BackgroundGeolocation.start(); //triggers start on start event
            }
        });
    }, []);
}

export default useTracking;