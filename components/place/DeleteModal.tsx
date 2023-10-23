import { View, Text, Modal, TouchableHighlight, StyleSheet, Pressable } from 'react-native';

interface DeleteModalProps {
    handleDelete: (doDelete: boolean) => void;
    isVisible: boolean;
}
const DeleteModal:React.FC<DeleteModalProps>  = ({ handleDelete, isVisible }) => {
    const onConfirmEvent = () => {
        handleDelete(true);
    }

    const onCancelEvent = () => {
        handleDelete(false);
    }

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Are you sure?</Text>
                    <View style={styles.actionsContainer}>
                        <Pressable
                            style={[styles.button, styles.cancelButton]}
                            onPress={() => onCancelEvent()}>
                            <Text style={styles.textStyle}>No</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.confirmButton]}
                            onPress={() => onConfirmEvent()}>
                            <Text style={styles.textStyle}>Yes</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },

    modalView: {
        height: '15%',
        width: '70%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },

    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 10
    },

    button: {
        borderRadius: 5,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        elevation: 2,
        margin: 5
    },

    confirmButton: {
        backgroundColor: '#8ED3E4',
    },

    cancelButton: {
        backgroundColor: '#FB7878',
    },

    textStyle: {
        textAlign: 'center',
    },

    modalText: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 18
    }
});

export default DeleteModal;