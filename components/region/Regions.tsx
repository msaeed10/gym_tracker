import { StyleSheet, View } from "react-native"
import AddRegionButton from "./AddRegionButton"
import RegionList from "./RegionList"
import AddRegionForm from "./AddRegionForm"
const Regions = () => {
    return (
        <View style={styles.container}>
            {/* <RegionList />
            <AddRegionButton /> */}
            <AddRegionForm />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})

export default Regions;