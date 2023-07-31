import { View, StyleSheet, Text } from 'react-native';

interface NotFoundProps {
    message: string;
}

const NotFound:React.FC<NotFoundProps> = ({message}) => {
    return(
        <View style={styles.message_container}>
            <Text>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    message_container: {
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default NotFound;