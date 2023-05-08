import { useState } from "react";
import { Agenda } from "react-native-calendars";
import { StyleSheet, Text, View } from 'react-native';

const CalendarTracker = () => {
    const [datesGone, setDatesGone] = useState({'2023-03-25': {marked: true, dotColor: 'green'}});

    return (
        <View style={styles.calendarWrapper}>
        </View>
    )
}

const styles = StyleSheet.create({
    calendarWrapper: {
        padding: 0,
        margin: 0,
        height: '100%',
        width: '100%',
        justifyContent: 'center'
    }
});

export default CalendarTracker;