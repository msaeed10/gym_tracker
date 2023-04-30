import React from "react";
import { Pressable, StyleSheet, Text, View} from 'react-native';

interface AddRegionButtonProps {
    triggerModalOpen: () => void;
}
const AddRegionButton:React.FC<AddRegionButtonProps> = ({triggerModalOpen}) => {    

    return (
        <View style={styles.add_container}>
            <Pressable 
                onPress={() => triggerModalOpen()}
                style={styles.add_button}>
                    <Text>Click Here</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    add_container: {
        position: 'absolute', 
        left: 0, 
        right: 0,
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: 20,
    },
    add_button: {
        backgroundColor: '#A95252',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 100,
        borderRadius: 100,
        borderWidth: 0.2,
        borderColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2
    }
})
export default AddRegionButton;