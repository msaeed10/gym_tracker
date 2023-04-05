import { useState } from "react";
import { Agenda } from "react-native-calendars";
import { StyleSheet, View } from 'react-native';

const CalendarTracker = () => {
    const [datesGone, setDatesGone] = useState({'2023-03-25': {marked: true, dotColor: 'green'}});

    return (
        <View style={styles.calendarWrapper}>
            <Agenda
                // The list of items that have to be displayed in agenda. If you want to render item as empty date
                // the value of date key has to be an empty array []. If there exists no value for date key it is
                // considered that the date in question is not yet loaded
                // items={}

                // Callback that gets called when items for a certain month should be loaded (month became visible)
                loadItemsForMonth={() => {
                    console.log('trigger items loading');
                }}

                // Callback that fires when the calendar is opened or closed
                onCalendarToggled={(calendarOpened: any) => {
                    console.log(calendarOpened);
                }}

                // Callback that gets called on day press
                onDayPress={() => {
                    console.log('day pressed');
                }}

                // Callback that gets called when day changes while scrolling agenda list
                onDayChange={() => {
                    console.log('day changed');
                }}

                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={50}

                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={50}

                // Specify how each item should be rendered in agenda
                renderItem={() => {
                    return <View />;
                }}

                // Specify how each date should be rendered. day can be undefined if the item is not first in that day
                renderDay={() => {
                    return <View />;
                }}

                // Specify how empty date content with no items should be rendered
                renderEmptyDate={() => {
                    return <View />;
                }}

                // Specify how agenda knob should look like
                renderKnob={() => {
                    return <View />;
                }}
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