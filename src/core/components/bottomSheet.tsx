// BottomSheetDateTimePicker.tsx

import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Modalize } from 'react-native-modalize';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment-timezone';

const BottomSheetDateTimePicker = React.forwardRef(({ onSave, title, description }, ref) => {
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const getMicrosoftFormattedDate = (selectedDate) => {
    return moment(selectedDate).tz('Etc/UTC').format('YYYY-MM-DDTHH:mm:ssZ'); // Microsoft format
  };

  const handleSave = () => {
    const formattedDate = getMicrosoftFormattedDate(date);
    onSave(formattedDate);
    ref.current?.close(); // Close Modalize Bottom Sheet
  };

  return (
    <Modalize ref={ref} adjustToContentHeight>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
        <Text style={{ marginVertical: 10 }}>{description}</Text>

        <Button title="Pick Date & Time" onPress={showDatePicker} />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <Text style={{ marginVertical: 10 }}>
          Selected Date & Time: {moment(date).format('MMMM Do YYYY, h:mm a')}
        </Text>

        <Button title="Save" onPress={handleSave} />
      </View>
    </Modalize>
  );
});

export default BottomSheetDateTimePicker;