import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Region } from "../../model/Region";

interface AddRegionFormProps {
    triggerModalOpen: () => void;
    handleSaveRegion: (region: Region) => void;
    regionToEdit: Region | undefined;
}

// Pass in props for reusablility on an edit event
const AddRegionForm:React.FC<AddRegionFormProps> = ({triggerModalOpen, handleSaveRegion, regionToEdit}) => {
    const [address, onAddress] = useState(regionToEdit?.address);
    const [city, onCity] = useState(regionToEdit?.city);
    const [state, onState] = useState(regionToEdit?.state);
    const [zip, onZipCode] = useState(regionToEdit?.zipCode);
    const [meters, onMeters] = useState(regionToEdit?.meters);

    const createRegionObjectFromState = () => {
        return {
            id: regionToEdit?.id,
            address: address,
            city: city,
            state: state,
            zipCode: zip,
            meters: meters
        };
    }
    
    const handleSave = () => {
        // handle input validation (all fields are mandatory)

        // send api call to google maps to validate address exists

        // close modal
        handleSaveRegion(createRegionObjectFromState())
        triggerModalOpen()
    }

    return(
        <ScrollView contentContainerStyle={styles.modal_container}>
            <SafeAreaView style={styles.modal}>
                <View style={styles.input_container}>
                    <TextInput
                        style={[styles.address, styles.input]}
                        onChangeText={onAddress}
                        value={address}
                        placeholder="Location"
                    />
                    <View style={styles.regional_information}>
                    <TextInput
                        style={[styles.city, styles.input]}
                        onChangeText={onCity}
                        value={city}
                        placeholder="City"
                    />
                    <TextInput
                        style={[styles.state, styles.input]}
                        onChangeText={onState}
                        value={state}
                        placeholder="State"
                    />
                    <TextInput
                        style={[styles.zip, styles.input]}
                        onChangeText={onZipCode}
                        value={zip}
                        placeholder="Zip Code"
                    />
                    </View>
                    <TextInput
                        style={[styles.meter, styles.input]}
                        onChangeText={onMeters}
                        value={meters}
                        placeholder="Meters"
                    />
                </View>
                <View style={styles.action}>
                    <Pressable
                        style={styles.button}
                        onPress={handleSave}>
                            <Text>Save</Text>
                    </Pressable>
                    <Pressable
                        style={styles.button}
                        onPress={triggerModalOpen}>
                            <Text>Cancel</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    modal_container: {
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
    },
    modal: {
        top: 20,
        position: 'absolute',
        backgroundColor: 'yellow',
        borderRadius: 15,
        borderWidth: 0.2,
        borderColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2
    },
    input_container: {
        height: 150,
    },
    input: {
        height: 30,
        borderWidth: 0.2,
        padding: 5,
        borderRadius: 5,
    },
    meter: {
        margin: 12,
        width: 60,
    },
    address: {
        margin: 12,
        width: 300
    },
    regional_information: {
        margin: 7,
        flexDirection: 'row',
    },
    city: {
        margin: 5,
        padding: 0,
        width: 95
    },
    state: {
        margin: 5,
        padding: 0,
        width: 90
    },
    zip: {
        margin: 5,
        padding: 0,
        width: 95
    },
    action: {
        margin: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: "flex-end",
    },
    button: {
        backgroundColor: '#FF2D00',
        width: 60,
        height: 30,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 0.2,
        borderColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2
    },
});


export default AddRegionForm;