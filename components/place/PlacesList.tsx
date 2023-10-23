import { View, ScrollView, Text, StyleSheet, Pressable } from 'react-native';
import CardInformation from '../card/CardInformation';
import NotFound from './NotFound';
import { useState } from 'react';
import DeleteModal from './DeleteModal';

interface RegionListProps {
    places: ReadonlyArray<any>;
    handleRemovePlace: (regionId: string) => void;
}

const PlacesList:React.FC<RegionListProps> = ({places, handleRemovePlace}) => {  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [regionToDelete, setRegionToDelete] = useState("");

    const handleDelete = (doDelete: boolean) => {
        if(doDelete) {
            handleRemovePlace(regionToDelete);
        }
        setIsModalOpen(!isModalOpen);
    }

    const onDelete = (placeId: string) => {
        setRegionToDelete(placeId)
        setIsModalOpen(true)
    }

    const generatCards = () => {
    
        return places.map((place, index) => {
            return (
                <View key={index} style={styles.card}>
                    <CardInformation place={place} />
                    <View style={styles.action}>
                        <Pressable 
                            onPress={() => {onDelete(place._id)}} 
                            style={[styles.button, styles.delete]}><Text>Delete</Text></Pressable> 
                    </View>
                </View>
            )});
    }


    return(
        <ScrollView contentContainerStyle={styles.card_container}>
            <DeleteModal handleDelete={handleDelete} isVisible={isModalOpen} />
            {
                places.length === 0 ?  
                <NotFound message="No places were found. Please add a place." /> :
                generatCards()
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card_container: {
        height: '100%',
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 10,
        marginRight: 10
    },
    card: {
        height: 100,
        marginTop: 10,
        backgroundColor: '#F9F5F4',
        borderRadius: 5,
        borderColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2
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
    delete: {
        backgroundColor: '#FB7878'
    }
});

export default PlacesList;
