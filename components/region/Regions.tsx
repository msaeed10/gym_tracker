import { StyleSheet, View } from "react-native"
import { useState } from 'react'
import "react-native-get-random-values";
import AddRegionButton from './AddRegionButton'
import RegionList from './RegionList'
import AddRegionForm from './AddRegionForm'
import { RegionModel } from "../../model/RegionModel"
import RealmContext, { Region } from "../../db/RegionDatabase"

const { useQuery, useRealm } = RealmContext;

const Regions = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const regions = useQuery(Region).filtered("user == $0", "testUser");
    const realm = useRealm();

    const handleSaveRegion = (region: RegionModel) => {
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

    const handleUpdateRegion = (region: Region) => {
        realm.write(() => {
            region.address;
            region.city;
            region.state;
            region.zipCode;
            region.meters;
        });
    }

    const handleRemoveRegion = (regionId: string) => {
        let existingRegion = realm.objects("Region").filtered('_id == $0', regionId)[0];

        realm.write(() => {
            realm.delete(existingRegion);
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
                    handleSaveRegion={handleSaveRegion}
                    triggerModalOpen={triggerModalOpen} 
                /> 
                :
                <>
                    <RegionList 
                        regions={regions} 
                        handleRemoveRegion={handleRemoveRegion} 
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