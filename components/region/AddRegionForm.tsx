import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RegionModel } from '../../model/RegionModel';
import { Region } from '../../db/RegionDatabase';
import { REACT_APP_ADDRESS_VALIDATION, REACT_APP_ADDRESS_VALIDATION_KEY } from "@env";

interface AddRegionFormProps {
    triggerModalOpen: () => void;
    handleSaveRegion: (region: RegionModel) => void;
    region?: Region;
}

// Pass in props for reusablility on an edit event
const AddRegionForm:React.FC<AddRegionFormProps> = ({region, triggerModalOpen, handleSaveRegion}) => {
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
        fetch(`${REACT_APP_ADDRESS_VALIDATION}key=${REACT_APP_ADDRESS_VALIDATION_KEY}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    address: {
                        regionCode: "US",
                        addressLines: [address, `${city}, ${state}, ${zip}`]
                    },
                }
            )
        })
        .then(response => response.json())
        .then(json => {
          console.log(json);
        })
        .catch(error => {
          console.error(error);
        });
        // close modal
        handleSaveRegion(createRegionObjectFromState())
        triggerModalOpen()
    }

    return(
        <View style={styles.form_container}>
            <ScrollView contentContainerStyle={styles.input_container}>
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
            </ScrollView>
            <View style={styles.action}>
                <Pressable
                    style={[styles.button, styles.save]}
                    onPress={handleSave}>
                        <Text>Save</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, styles.cancel]}
                    onPress={triggerModalOpen}>
                        <Text>Cancel</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form_container: {
        height: '100%',
    },
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
        width: '100%',
        position: 'absolute', 
        left: 0, 
        right: 0,
        bottom: 0, 
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 20
    },
    button: {
        backgroundColor: '#8ED3E4',
        width: '40%',
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
    save: {
        backgroundColor: '#8ED3E4'
    },
    cancel: {
        backgroundColor: '#FB7878'
    }
});


export default AddRegionForm;