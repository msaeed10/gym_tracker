import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RegionModel } from '../../model/RegionModel';
import { Region } from '../../db/RegionDatabase';

interface AddRegionFormProps {
    triggerModalOpen: () => void;
    handleSaveRegion: (region: RegionModel) => void;
    region?: Region;
}

// Pass in props for reusablility on an edit event
const AddRegionForm:React.FC<AddRegionFormProps> = ({region, triggerModalOpen, handleSaveRegion}) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [address, onAddress] = useState(region?.address);
    const [city, onCity] = useState(region?.city);
    const [state, onState] = useState(region?.state);
    const [zip, onZipCode] = useState(region?.zipCode);
    const [meters, onMeters] = useState(region?.meters);

    const createRegionObjectFromState = () => {
        return {
            id: region?._id,
            address: address!,
            city: city!,
            state: state!,
            zipCode: zip!,
            meters: meters!
        };
    }

    const handleSave = () => {
        // handle input validation (all fields are mandatory)

        // close modal
        handleSaveRegion(createRegionObjectFromState())
        triggerModalOpen()
    }

    return(
        <ScrollView>
            <View style={styles.input_container}>
                <TextInput
                    mode="outlined"
                    label="Address"
                    style={styles.address}
                    value={address}
                    onChangeText={onAddress}
                />

                <TextInput
                    mode="outlined"
                    label="City"
                    style={styles.city}
                    onChangeText={onCity}
                    value={city}
                />
                <View style={styles.regional_information}>
                    <TextInput
                        mode="outlined"
                        label="State"
                        onChangeText={onState}
                        style={styles.state}
                        value={state}
                    />
                    <TextInput
                        mode="outlined"
                        label="Zip Code"
                        style={styles.zip}
                        onChangeText={onZipCode}
                        value={zip}
                    />
                </View>
                <View style={styles.meter_container}>
                    <TextInput
                        mode="outlined"
                        label="Meters"
                        style={styles.meter}
                        onChangeText={onMeters}
                        value={meters}
                    />
                </View>
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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    input_container: {
        height: '100%',
        width: '100%',
        alignItems: 'center'
    },
    address: {
        margin: 6,
        width: '90%'
    },
    city: {
        margin: 6,
        width: '90%'
    },
    regional_information: {
        margin: 6,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    state: {
        width: '48%'
    },
    zip: {
        width: '48%'
    },
    meter_container: {
        width: '90%',
        marginTop: 5,
        alignItems: 'flex-start'
    },
    meter: {
        width: '25%',
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