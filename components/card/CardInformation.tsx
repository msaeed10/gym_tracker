import { Text, View } from 'react-native';
import { SearchResultModel } from "../../model/SearchResultModel";


interface CardInformationProps {
    place: SearchResultModel;
}

const CardInformation:React.FC<CardInformationProps>  = ({place}) => {
    return (
        <View style={styles.content}>
            <Text style={styles.name}>{place.name}</Text>
            <Text style={styles.address}>{place.location}</Text>
        </View>
    )
}

const styles = {
    content: {
        paddingTop: 5,
        paddingLeft:15,
        paddingRight:15,
        paddingBottom:15,
        height: 50
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    address: {
    }
}

export default CardInformation;