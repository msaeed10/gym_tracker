import React from "react";
import { Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface AddRegionButtonProps {
    triggerModalOpen: () => void;
}
const AddRegionButton:React.FC<AddRegionButtonProps> = ({triggerModalOpen}) => {    

    return (
        <View style={styles.add_container}>
            <Pressable 
                onPress={() => triggerModalOpen()}>
                    <Icon 
                        style={styles.add_button}
                        name="add-circle"
                        size={110}
                    />
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
        color: '#8ED3E4',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2
    }
})
export default AddRegionButton;