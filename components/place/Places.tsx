import { StyleSheet, View } from "react-native"
import { useState } from 'react'
import "react-native-get-random-values";
import PlacesList from './PlacesList'
import AddPlaceButton from './AddPlaceButton'
import AddPlaceForm from './AddPlaceForm'
import RealmContext, { Place, Geofence } from "../../db/PlaceDatabase"
import { SearchResultModel } from "../../model/SearchResultModel";
import createFence from "../geofencing/createFence";

const { useQuery, useRealm } = RealmContext;

const Regions = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const places = useQuery(Place).filtered("user == $0", "testUser");
    const realm = useRealm();

    const handleSavePlaces = (places: Array<SearchResultModel>) => {
        places.forEach(place => {
            savePlace(place)
        });
    }

    const savePlace = (place: SearchResultModel) => {
        let computedGeofences = createFence({
            meters: 150, 
            latitude: place.geometry.latitude,
            longitude: place.geometry.longitude
        });

        realm.write(() => {
            let geofenceList: Array<Geofence> = [];
            computedGeofences.forEach((geofence) =>
                geofenceList.push(
                    realm.create('Geofence', {
                        _id: new Realm.BSON.ObjectId(),
                        latitude: geofence.latitude,
                        longitude: geofence.longitude
                    })
                )
            );
            realm.create('Place', {
                _id: place.placeId,
                location: place.location,
                name: place.name,
                latitude: place.geometry.latitude,
                longitude: place.geometry.longitude,
                geofence: geofenceList,
            });
        });
    }

    const handleRemovePlace = (placeId: string) => {
        let place = places.filtered('_id == $0', placeId)[0];
        realm.write(() => {
            place.geofence.map(geofence => {
                realm.delete(geofence);
            });
            realm.delete(place);
        });
    }

    const triggerModalOpen = () => {
        setIsModalOpen(!isModalOpen);
    } 

    return (
        <View style={styles.container}>
            {
            isModalOpen ? 
                <AddPlaceForm 
                    savedPlaces={places}
                    handleSavePlaces={handleSavePlaces}
                    triggerModalOpen={triggerModalOpen} /> 
                :
                <>
                    <PlacesList 
                        places={places} 
                        handleRemovePlace={handleRemovePlace} />
                    
                    <AddPlaceButton triggerModalOpen={triggerModalOpen} />
                </> 
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})

export default Regions;