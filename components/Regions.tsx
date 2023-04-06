import { Dimensions, StyleSheet, View } from "react-native"
import AddRegion from "./AddRegion"
import RegionList from "./RegionList"

const Regions = () => {
    return (
        <View style={styles.container}>
            <RegionList />
            <AddRegion />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    }
})

export default Regions;