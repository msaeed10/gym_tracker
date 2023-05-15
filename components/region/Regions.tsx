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
    const [regionToEdit, setRegionToEdit] = useState<Region>();
    const regions = useQuery(Region).filtered("user == $0", "testUser");
    const realm = useRealm();

    const handleSaveRegion = (region: RegionModel) => {
        // make api call to google to verify address

        // if not valid dont save and drop down notifying user
        
        // if valid continue
        if(region.id == undefined) {
            saveRegion(region);
        } else {
            updateRegion(region);
        }
    }

    const saveRegion = (region: RegionModel) => {
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

    const updateRegion = (region: RegionModel) => {
        let existingRegion = regions.filtered("_id == $0", region.id)[0];

        realm.write(() => {
            existingRegion.address = region.address;
            existingRegion.city = region.city;
            existingRegion.state = region.state;
            existingRegion.zipCode = region.zipCode;
            existingRegion.meters = region.meters;
        });
    }

    const handleRemoveRegion = (regionId: string) => {
        let region = regions.filtered('_id == $0', regionId)[0];

        realm.write(() => {
            realm.delete(region);
        });
    }

    const triggerModalOpen = (region?: Region) => {
        setRegionToEdit(region);
        setIsModalOpen(!isModalOpen);
    } 

    return (
        <View style={styles.container}>
            {
            isModalOpen ? 
                <AddRegionForm 
                    handleSaveRegion={handleSaveRegion}
                    triggerModalOpen={triggerModalOpen} 
                    region={regionToEdit}
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