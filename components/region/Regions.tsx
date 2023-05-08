import { StyleSheet, View } from "react-native"
import AddRegionButton from "./AddRegionButton"
import RegionList from "./RegionList"
import AddRegionForm from "./AddRegionForm"
import { useState } from "react"
import { RegionModel } from "../../model/RegionModel"
import { deleteRegion, updateRegion, saveRegion, getRegions } from "../../db/RegionDatabaseHandler"
import { Region } from "../../db/RegionDatabase"


const Regions = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [regions, setRegions] = useState<ReadonlyArray<any>>(getRegions("testUser"));

    const handleSaveRegion = (region: RegionModel) => {
        saveRegion(region);
        // if(region.id == undefined) {
        //     region.id = getRandomNumber();
        //     setRegions([...regions, region]);
        // } else {
        //     let regionIndex = regions.findIndex((item) => item.id === region.id);
        //     let updatedRegions = regions;
        //     updatedRegions[regionIndex] = region;
        //     setRegions(updatedRegions)
        // }
    }

    const handleUpdateRegion = (region: Region) => {
        updateRegion(region);
    }

    const handleRemoveRegion = (regionId: string) => {
        let updatedRegions = regions.filter((item) => item._id !== regionId)
        setRegions(updatedRegions);
        deleteRegion(regionId);
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