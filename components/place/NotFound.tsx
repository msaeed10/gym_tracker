import { View, StyleSheet, Text } from 'react-native';

interface NotFoundProps {
    message: string;
}

const NotFound:React.FC<NotFoundProps> = ({message}) => {
    return(
        <View style={styles.message_container}>
            <Text style={styles.message}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    message_container: {
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    message: {
        fontStyle: 'italic',
        color: 'rgba(0,0,0,0.5)'
    }
});

export default NotFound;