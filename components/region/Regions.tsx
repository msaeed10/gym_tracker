import { StyleSheet, View } from "react-native"
import { useState } from 'react'
import "react-native-get-random-values";
import AddRegionButton from './AddRegionButton'
import RegionList from './RegionList'
import AddRegionForm from './AddRegionForm'
import { RegionModel } from "../../model/RegionModel"
import RealmContext, { Region } from "../../db/RegionDatabase"
import { SearchResultModel } from "../../model/SearchResultModel";

const { useQuery, useRealm } = RealmContext;

const Regions = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const regions = useQuery(Region).filtered("user == $0", "testUser");
    const realm = useRealm();

    // remove the places from the search result
    const handleSavePlaces = (places: Array<SearchResultModel>) => {
        places.forEach(place => {
            savePlace(place)
        });
    }

    const savePlace = (place: SearchResultModel) => {
        realm.write(() => {
            realm.create('Region', {
                _id: place.placeId,
                location: place.location,
                name: place.name,
                latitude: place.geometry.latitude,
                longitude: place.geometry.longitude,
                meters: 100,
                user: "testUser"
            });
        });
    }

    const updateRegion = (region: RegionModel) => {
        // let existingRegion = regions.filtered("_id == $0", region.id)[0];

        // realm.write(() => {
        //     existingRegion.address = region.address;
        //     existingRegion.city = region.city;
        //     existingRegion.state = region.state;
        //     existingRegion.zipCode = region.zipCode;
        //     existingRegion.meters = region.meters;
        // });
    }

    const handleRemoveRegion = (regionId: string) => {
        let region = regions.filtered('_id == $0', regionId)[0];

        realm.write(() => {
            realm.delete(region);
        });
    }

    const triggerModalOpen = () => {
        setIsModalOpen(!isModalOpen);
    } 

    return (
        <View style={styles.container}>
            {
            isModalOpen ? 
                <AddRegionForm 
                    savedPlaces={regions}
                    handleSavePlaces={handleSavePlaces}
                    triggerModalOpen={triggerModalOpen} 
                /> 
                :
                <>
                    <RegionList 
                        regions={regions} 
                        handleRemoveRegion={handleRemoveRegion}
                        handleUpdateRegion={triggerModalOpen}
                    />
                    
                    <AddRegionButton triggerModalOpen={triggerModalOpen} />
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