import { useState } from "react";
import { CalendarList } from "react-native-calendars";
import { StyleSheet, Text, View } from 'react-native';
import useTracking from "../tracking/useTracking";


interface StringToMarkingDictionary {
    [date: string]: Marking;
}
interface Marking {
    marked: boolean,
    dotColor: string
}

const CalendarTracker = () => {
    const [datesGone, setDatesGone] = useState<any>({'2023-06-25': {marked: true, dotColor: 'green'}});

    const setDate = (date: string) => {
        // save date in db
        let updatedDatesGone: StringToMarkingDictionary = datesGone;
        updatedDatesGone[date] = {marked: true, dotColor: 'green'}
        console.log(updatedDatesGone);
        setDatesGone(updatedDatesGone);
    }

    useTracking(setDate);

    return (
        <View style={styles.calendarWrapper}>
            <CalendarList
                // Callback which gets executed when visible months change in scroll view. Default = undefined
                onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={50}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={50}
                // Enable or disable scrolling of calendar list
                scrollEnabled={true}
                // Enable or disable vertical scroll indicator. Default = false
                showScrollIndicator={true}

                markedDates = {datesGone}
            />
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