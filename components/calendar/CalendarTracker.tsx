import { CalendarList } from "react-native-calendars";
import { StyleSheet, View } from 'react-native';
import useTracking from "../tracking/useTracking";
import RealmContext, { Dates } from  "../../db/PlaceDatabase";

interface StringToMarkingDictionary {
    [date: string]: Marking;
}
interface Marking {
    marked: boolean,
    dotColor: string
}

const { useQuery, useRealm } = RealmContext;

const CalendarTracker = () => {
    const dates = useQuery(Dates);
    const realm = useRealm();

    const saveDate = (date: string) => {
        console.log(`Saving date ${date}`);
        realm.write(() => {
            realm.create('Dates', {
                _id: new Realm.BSON.ObjectId(),
                date: date
            })
        });
    }

    useTracking(saveDate);

    const formateDates = (): StringToMarkingDictionary => {
        let datesWithMark: StringToMarkingDictionary = {};
        dates.map((date) => {
            datesWithMark[date.date] = {marked: true, dotColor: 'green'}
        });

        return datesWithMark
    }

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

                markedDates = {formateDates()}
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