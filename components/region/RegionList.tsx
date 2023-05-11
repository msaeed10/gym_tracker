import { View, ScrollView, Text, StyleSheet, Pressable } from 'react-native';
import { Region } from '../../db/RegionDatabase';

interface RegionListProps {
    regions: ReadonlyArray<any>;
    handleRemoveRegion: (regionId: string) => void;
    handleUpdateRegion: (region? : Region) => void;
}

const RegionList:React.FC<RegionListProps> = ({regions, handleUpdateRegion, handleRemoveRegion}) => {
    const generatCards = () => {
        return regions.map((item, index) => {
            return (
                <View key={index} style={styles.card}>
                    <View style={styles.content}>
                        <Text style={styles.content_text}>{item.address}, {item.city}, {item.state}, {item.zipCode}</Text>
                        <Text style={styles.content_text}>meters: {item.meters}</Text>
                    </View>
                    <View style={styles.action}>
                        <Pressable 
                            onPress={() => {handleUpdateRegion(item)}}
                            style={[styles.button, styles.edit]}><Text>Edit</Text></Pressable>
                        <Pressable 
                            onPress={() => {handleRemoveRegion(item._id)}} 
                            style={[styles.button, styles.delete]}><Text>Delete</Text></Pressable> 
                    </View>
                </View>
            )});
    }

    return(
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
    edit: {
        backgroundColor: '#8ED3E4'
    },
    delete: {
        backgroundColor: '#FB7878'
    }
});

export default RegionList;
