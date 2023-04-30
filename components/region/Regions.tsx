import { StyleSheet, View } from "react-native"
import AddRegionButton from "./AddRegionButton"
import RegionList from "./RegionList"
import AddRegionForm from "./AddRegionForm"
import { useState } from "react"
import { Region } from "../../model/Region"

const Regions = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [regions, setRegions] = useState<Array<Region>>([{
        id: 1,
        address: "this is the location",
        city: "city",
        state: "state",
        zipCode: "504324",
        meters: "200"
    }]);
    const [regionToEdit, setRegionToEdit] = useState<Region>();

    const getRandomNumber = () => {
        const randomNumber = Math.floor(Math.random() * 10000) + 1;
        return randomNumber;
    }

    const handleSaveRegion = (region: Region) => {
        if(region.id == undefined) {
            region.id = getRandomNumber();
            setRegions([...regions, region])
        } else {
            let regionIndex = regions.findIndex((item) => item.id === region.id);
            let updatedRegions = regions;
            updatedRegions[regionIndex] = region;
            setRegions(updatedRegions)
        }
    }

    const handleEditRegion = (region: Region) => {
        triggerModalOpen();
        setRegionToEdit(region);
    }

    const handleRemoveRegion = (regionId: number) => {
        let updatedRegions = regions.filter((item, index) => index !== regionId)
        // TODO: update api call when backend is complete
        setRegions(updatedRegions);
    }

    const triggerModalOpen = () => {
        setIsModalOpen(!isModalOpen);
        setRegionToEdit(undefined);
    } 

    return (
        <View style={styles.container}>
            {
            isModalOpen ? 
                <AddRegionForm 
                    handleSaveRegion={handleSaveRegion}
                    triggerModalOpen={triggerModalOpen} 
                    regionToEdit={regionToEdit} 
                /> 
                :
                <>
                    <RegionList 
                        regions={regions} 
                        handleRemoveRegion={handleRemoveRegion} 
                        handleEditRegion={handleEditRegion} />
                    
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