import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


// Pass in props for reusablility on an edit event
const AddRegionForm = () => {
    const [address, onAddress] = useState("");
    const [city, onCity] = useState("");
    const [state, onState] = useState("");
    const [zip, onZipCode] = useState("");
    const [meters, onMeters] = useState("");

    return(
        <ScrollView contentContainerStyle={styles.modal_container}>
            <SafeAreaView style={styles.modal}>
                <View style={styles.input_container}>
                    <TextInput
                        style={[styles.address, styles.input]}
                        onChangeText={onAddress}
                        value={address}
                        placeholder="Location"
                        keyboardType="numeric"
                    />
                    <View style={styles.regional_information}>
                    <TextInput
                        style={[styles.city, styles.input]}
                        onChangeText={onCity}
                        value={city}
                        placeholder="City"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.state, styles.input]}
                        onChangeText={onState}
                        value={state}
                        placeholder="State"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.zip, styles.input]}
                        onChangeText={onZipCode}
                        value={zip}
                        placeholder="Zip Code"
                        keyboardType="numeric"
                    />
                    </View>
                    <TextInput
                        style={[styles.meter, styles.input]}
                        onChangeText={onMeters}
                        value={meters}
                        placeholder="Meters"
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.action}>
                    <Pressable
                        style={styles.button}
                        onPress={() => {}}>
                            <Text>Save</Text>
                    </Pressable>
                    <Pressable
                        style={styles.button}
                        onPress={() => {}}>
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
        height: 100,
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
        height: 100,
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