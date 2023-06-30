import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SearchResultModel } from '../../model/SearchResultModel';
import DisplayCard from './DisplayCard';

interface DisplaySearchResultProps {
    places: Array<SearchResultModel>;
    handleSelect: (searchResultModel: SearchResultModel) => void;
    handleUnselect: (placeId : string) => void;
}

const DisplaySearchResult:React.FC<DisplaySearchResultProps> = ({places, handleSelect, handleUnselect}) => {
    const generatCards = () => {
        return places.map((place, index) => {
            return (
                <View key={index} style={styles.card}>
                    <DisplayCard place={place} 
                        handleSelect={handleSelect} 
                        handleUnselect={handleUnselect} />
                </View>
            )});
    }

    return (
        <ScrollView contentContainerStyle={styles.card_container}>
            {generatCards()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card_container: {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 10,
        marginRight: 10
    },
    card: {
        height: 100,
        marginTop: 5,
        backgroundColor: '#F9F5F4',
        borderRadius: 5,
        borderColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 5
    },
    content: {
        height: 50
    },
    content_text: {
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5
    },
    action: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    button: {
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
    edit: {
        backgroundColor: '#8ED3E4'
    },
    delete: {
        backgroundColor: '#FB7878'
    }
});

export default DisplaySearchResult;