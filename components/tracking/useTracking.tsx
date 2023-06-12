import React, { useEffect, useState } from 'react';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import { CoordsModel } from '../../model/CoordsModel';
import { getClosestFence } from '../geofencing/getClosestFence';
import RealmContext, { Place } from "../../db/PlaceDatabase"
import isWithinPlace from '../geofencing/isWithinPlace';

const { useQuery } = RealmContext;

const useTracking = (setDate: (date: string) => void) => {
    const places: ReadonlyArray<Place> = useQuery(Place);
    let totalEstimatedTime = 0;
    let startTime = 0;
    let isInCurrentPlace = false

    useEffect(() => {
        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.MEDIUM_ACCURACY,
            stationaryRadius: 10,
            distanceFilter: 10,
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
            console.log(location);
            const coordLocation: CoordsModel = {
                latitude: location.latitude, 
                longitude: location.longitude
            }
            const closestPlace: Place | undefined = getClosestFence(coordLocation, places);

            console.log(closestPlace)
            if(isWithinPlace(coordLocation, closestPlace!.geofence) && !isInCurrentPlace) {
                startTime = Date.now();
                isInCurrentPlace = true;
                console.log(`is in the place ${startTime}`);
            };

            console.log(isInCurrentPlace, !isWithinPlace(coordLocation, closestPlace!.geofence))
            if(isInCurrentPlace && !isWithinPlace(coordLocation, closestPlace!.geofence)) {
                console.log(`is in the place ${startTime}`);
                totalEstimatedTime = (Date.now() - startTime) / 1000;
                console.log(`is not in the place ${totalEstimatedTime}`);
                if(totalEstimatedTime >= 5) {
                    let date = new Date().toISOString().split('T')[0];
                    setDate(date);                
                }
                startTime = 0;
                isInCurrentPlace = false;
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