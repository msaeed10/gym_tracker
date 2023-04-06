import { Dimensions, StyleSheet, View } from "react-native"
import AddRegion from "./AddRegion"
import RegionList from "./RegionList"

const Regions = () => {
    return (
        <View>
            <RegionList />
            <AddRegion />
        </View>
    )
}

export default Regions;