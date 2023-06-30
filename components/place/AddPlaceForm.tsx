import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import DisplaySearchResult from './DisplaySearchResult';
import { Place } from '../../db/PlaceDatabase';
import { CoordsModel } from '../../model/CoordsModel';
import { SearchResultModel } from '../../model/SearchResultModel';
import { REACT_APP_PLACES_API, REACT_APP_RADIUS, REACT_APP_TYPE, REACT_APP_PLACES_API_KEY } from "@env";

interface AddRegionFormProps {
    triggerModalOpen: () => void;
    handleSavePlaces: (places: Array<SearchResultModel>) => void;
    savedPlaces: ReadonlyArray<Place>;
}

const AddRegionForm:React.FC<AddRegionFormProps> = ({savedPlaces, triggerModalOpen, handleSavePlaces}) => {
    const [location, setLocation] = useState("");
    const [coords, setCoords] = useState<CoordsModel>();
    const [searchResults, setSearchResults] = useState<Array<SearchResultModel>>([]);
    const [selectedPlaces, setSelectedPlaces] = useState<Array<SearchResultModel>>([]);

    useEffect(() => {
        Geolocation.getCurrentPosition(info => 
            setCoords({latitude: info.coords.latitude, longitude: info.coords.longitude})
        )
    }, [])

    const handleSave = () => {
        handleSavePlaces(selectedPlaces);
        triggerModalOpen();
    }

    const placeAlreadySaved = (place: any): boolean => {
        let foundPlace = savedPlaces.filter(savedPlace => savedPlace._id === place.place_id);
        return foundPlace.length > 0 ? true : false
    }

    const handleSearch = () => {
        const cleanLocation = location.trim().split(" ").join('+');
        fetch(`${REACT_APP_PLACES_API}keyword=${cleanLocation}&location=${coords!.latitude}%2C${coords!.longitude}&radius=${REACT_APP_RADIUS}&type=${REACT_APP_TYPE}&key=${REACT_APP_PLACES_API_KEY}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(json => {
            let results: Array<SearchResultModel> = [];
            json.results.map((place: any) => {
                if(!placeAlreadySaved(place)) {
                    results.push(
                        {
                            placeId: place.place_id,
                            location: place.vicinity,
                            geometry: {
                                latitude: place.geometry.location.lat,
                                longitude: place.geometry.location.lng
                            },
                            name: place.name
                        }
                    );
                }
            });
            
            setSearchResults(results);
        })
        .catch(error => {
          console.error(error);
        });
    }

    const handleSelect = (place: SearchResultModel) => {
        setSelectedPlaces([...selectedPlaces, place]);
    }

    const handleUnselect = (placeId: string) => {
        let updatedPlacces = selectedPlaces.filter(place => place.placeId != placeId);
        setSelectedPlaces([...updatedPlacces]);
    }

    return(
        <View style={styles.form_container}>
            <View style={styles.input_container}>
                <TextInput
                    mode="outlined"
                    label="Location Search"
                    style={styles.location}
                    value={location}
                    onChangeText={setLocation}
                />
                <Pressable
                    style={[styles.button, styles.search]}
                    onPress={handleSearch}>
                        <Text>Search</Text>
                </Pressable>
            </View>
            <View>
                <DisplaySearchResult 
                    places={searchResults} 
                    handleSelect={handleSelect} 
                    handleUnselect={handleUnselect} />
            </View>
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
        backgroundColor: 'white',
        height: 80,
        paddingTop: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
    },
    location: {
        justifyContent: 'center',
        maxHeight: 45,
        width: '70%',
    },
    search: {
        height: 30,
        width: '20%',
        backgroundColor: '#FB7878'
    },
    action: {
        backgroundColor: 'white',
        height: 60,
        width: '100%',
        position: 'absolute', 
        bottom: 0, 
        justifyContent: 'center',
        flexDirection: 'row',
        borderTopWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
    },
    button: {
        backgroundColor: '#8ED3E4',
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
        width: '40%',
        height: 30,
        backgroundColor: '#8ED3E4'
    },
    cancel: {
        width: '40%',
        height: 30,
        backgroundColor: '#FB7878'
    }
});


export default AddRegionForm;