import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import OutlinedTextInput from '/Users/mac/Desktop/Muzammil/247pro-mobile-app/src/core/components/outlined-textInput.component';
import moment from 'moment';

export type FilterBottomSheetProps = {
  isVisible: boolean;
  onClose: () => void;
  onApply: (startDate: string, endDate: string) => void;
  defaultStartDate: string;
  defaultEndDate: string;
};

const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({
  isVisible,
  onClose,
  onApply,
  defaultStartDate,
  defaultEndDate,
}) => {
  const [filterOption, setFilterOption] = useState('monthly');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [tempStartDate, setTempStartDate] = useState(defaultStartDate); // Temp storage for date picker
  const [tempEndDate, setTempEndDate] = useState(defaultEndDate); // Temp storage for date picker
  const [activeField, setActiveField] = useState<string | null>(null); // Track active field for focus

  // Function to apply filters and send dates in Microsoft format
  const handleApply = () => {
    console.log("Applying dates:", startDate, endDate);
    
    // Set the start date to 00:00:00 and end date to 23:59:59
    const formattedStartDate = moment(startDate).startOf('day').toISOString(); // Set 00:00:00 (0 hour)
    const formattedEndDate = moment(endDate).endOf('day').toISOString(); // Set 23:59:59 (24 hour)
    
    console.log("Start Date (Microsoft format):", formattedStartDate);
    console.log("End Date (Microsoft format):", formattedEndDate);

    // Pass the formatted dates to the parent component
    onApply(formattedStartDate, formattedEndDate);
    onClose();
  };

  const handleFieldFocus = (field: string) => {
    setActiveField(field); // Set the focused field to manage the active state
  };

  const handleBlur = () => {
    setActiveField(null); // Remove focus when field is blurred
  };

  const renderOutlinedTextInput = (title: string, value: string | null, onPress: () => void, fieldKey: string) => (
    <View style={{ position: 'relative' }}>
      <TouchableOpacity onPress={() => handleFieldFocus(fieldKey)}>
        <OutlinedTextInput
          title={title}
          placeHolder={title}
          val={value ? new Date(value).toLocaleDateString() : ''}
          editable={false} // make it non-editable
          onChange={() => {}} // No onChange needed
          height={60}
          onFocus={() => handleFieldFocus(fieldKey)} // Set focus when the input is clicked
          onBlur={handleBlur} // Handle when the input loses focus
          autoFocus={false}
          style={[
            styles.textInputContainer,
            activeField === fieldKey ? styles.inputActive : {}, // Apply orange border when focused
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPress} // Open calendar modal
        style={[
          styles.iconContainer,
          activeField === fieldKey && styles.iconActive, // Apply focus styling to icon
        ]}
      >
        <Feather
          name="calendar"
          size={20}
          color={activeField === fieldKey ? '#FFA500' : 'grey'} // Change icon color on focus
        />
      </TouchableOpacity>
    </View>
  );

  const handleStartDateConfirm = () => {
    console.log("Selected Start Date:", tempStartDate);
    setStartDate(tempStartDate); // Set the start date when pressing OK
    setShowStartDatePicker(false); // Close the modal
  };

  const handleEndDateConfirm = () => {
    console.log("Selected End Date:", tempEndDate);
    setEndDate(tempEndDate); // Set the end date when pressing OK
    setShowEndDatePicker(false); // Close the modal
  };

  const handleMonthlySelection = () => {
    setFilterOption('monthly');
    
    // One month ago from today, with start and end times
    const oneMonthAgo = moment().subtract(1, 'month').startOf('day').toISOString(); // 00:00:00
    const today = moment().endOf('day').toISOString(); // 23:59:59

    setStartDate(oneMonthAgo);
    setEndDate(today);

    console.log("Monthly date range:", oneMonthAgo, today);
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.bottomSheet}>
          <Text style={styles.title}>Filter date range</Text>

          {/* Radio Buttons */}
          <View style={styles.radioButtonColumn}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleMonthlySelection}
              style={styles.radioWrapper}
            >
              <Fontisto
                name={filterOption !== 'monthly' ? 'radio-btn-passive' : 'radio-btn-active'}
                style={styles.radioIcon}
                color={filterOption === 'monthly' ? '#FFA500' : '#666'}
                size={22}
              />
              <Text style={styles.radioText}>By monthly</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setFilterOption('custom')}
              style={styles.radioWrapper}
            >
              <Fontisto
                name={filterOption !== 'custom' ? 'radio-btn-passive' : 'radio-btn-active'}
                style={styles.radioIcon}
                color={filterOption === 'custom' ? '#FFA500' : '#666'}
                size={22}
              />
              <Text style={styles.radioText}>Custom date range</Text>
            </TouchableOpacity>
          </View>

          {/* Custom Date Range Input Fields */}
          {filterOption === 'custom' && (
            <>
              {renderOutlinedTextInput('Date from', startDate, () => setShowStartDatePicker(true), 'startDate')}

              {renderOutlinedTextInput('Date to', endDate, () => {
                if (startDate) setShowEndDatePicker(true);
              }, 'endDate')}
            </>
          )}

          {/* Apply Filter Button */}
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>APPLY FILTERS</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity> */}

          {/* Start Date Picker */}
          {showStartDatePicker && (
            <Modal
              visible={showStartDatePicker}
              animationType="fade"
              transparent={true}
              onRequestClose={() => setShowStartDatePicker(false)}
            >
              <View style={styles.calendarModal}>
                <View style={styles.calendarContainer}>
                  <Text style={styles.calendarTitle}>Select Start Date</Text>
                  <Calendar
                    onDayPress={(day) => setTempStartDate(day.dateString)} // Store temp start date
                    markedDates={{
                      [tempStartDate]: { selected: true, selectedColor: '#FFA500' },
                    }}
                    theme={calendarTheme}
                    style={styles.calendarStyle}
                  />
                  <View style={styles.calendarButtons}>
                    <Pressable onPress={() => setShowStartDatePicker(false)}>
                      <Text style={styles.cancelButtonText}>CANCEL</Text>
                    </Pressable>
                    <Pressable onPress={handleStartDateConfirm}>
                      <Text style={styles.okButtonText}>OK</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          )}

          {/* End Date Picker */}
          {showEndDatePicker && (
            <Modal
              visible={showEndDatePicker}
              animationType="fade"
              transparent={true}
              onRequestClose={() => setShowEndDatePicker(false)}
            >
              <View style={styles.calendarModal}>
                <View style={styles.calendarContainer}>
                  <Text style={styles.calendarTitle}>Select End Date</Text>
                  <Calendar
                    onDayPress={(day) => setTempEndDate(day.dateString)} // Store temp end date
                    minDate={startDate}
                    markedDates={{
                      [tempEndDate]: { selected: true, selectedColor: '#FFA500' },
                    }}
                    theme={calendarTheme}
                    style={styles.calendarStyle}
                  />
                  <View style={styles.calendarButtons}>
                    <Pressable onPress={() => setShowEndDatePicker(false)}>
                      <Text style={styles.cancelButtonText}>CANCEL</Text>
                    </Pressable>
                    <Pressable onPress={handleEndDateConfirm}>
                      <Text style={styles.okButtonText}>OK</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </View>
      </View>
    </Modal>
  );
};

const calendarTheme = {
  textDayFontSize: 16,
  todayTextColor: '#000',
  arrowColor: '#FFA500',
  monthTextColor: '#FFA500',
  selectedDayBackgroundColor: '#FFA500',
  selectedDayTextColor: '#fff',
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 24,
    color: '#000',
  },
  radioButtonColumn: {
    flexDirection: 'column',
    marginBottom: 15,
  },
  radioWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioIcon: {
    marginRight: 10,
    
  },
  radioText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '400',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  iconActive: {
    color: '#FFA500', // Apply orange color on focus
  },
  applyButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  cancelButton: {
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  cancelButtonText: {
    color: '#000',
    fontSize: 16,
  },
  calendarModal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignSelf: 'center',
  },
  
  calendarStyle: {
    paddingHorizontal: 20,
  },
  calendarTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 10,
    color: '#000',
  },
  calendarButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30,
  },
  okButtonText: {
    color: '#FFA500',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 30,
  },
});

export default FilterBottomSheet;