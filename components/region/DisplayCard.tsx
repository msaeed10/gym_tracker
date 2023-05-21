import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SearchResultModel } from "../../model/SearchResultModel";
import CardInformation from "../card/CardInformation";

interface DisplayCardProps {
    place: SearchResultModel;
    handleSelect: (searchResultModel: SearchResultModel) => void;
    handleUnselect: (placeId : string) => void;
}

const DisplayCard:React.FC<DisplayCardProps>  = ({place, handleSelect, handleUnselect}) => {
    const [selected, setSelected] = useState(false);

    const handleSelection = (place: SearchResultModel) => {
        setSelected(!selected);
        if(!selected) {
            handleSelect(place);
        } else {
            handleUnselect(place.placeId)
        }
    }

    return (
        <>
            <CardInformation place={place}/>
            <View style={styles.action}>
                {
                selected ?
                    <Pressable 
                        onPress={() => {handleSelection(place)}}
                        style={[styles.button, styles.unselect]}><Text>Unselect</Text></Pressable> 
                    :
                    <Pressable 
                        onPress={() => {handleSelection(place)}}
                        style={[styles.button, styles.select]}><Text>Select</Text></Pressable>
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    action: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    button: {
        width: 80,
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
    select: {
        backgroundColor: '#8ED3E4'
    },
    unselect: {
        backgroundColor: '#FB7878'
    }
});

export default DisplayCard;