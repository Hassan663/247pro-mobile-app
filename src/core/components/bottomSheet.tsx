
import moment from 'moment';
import { min } from 'moment-timezone';
import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Modal,
    StyleSheet,
    Pressable
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { TimePicker } from 'react-native-simple-time-picker';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../styles/colors';
import { Toast, useToast } from 'react-native-toast-notifications';



export type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dateTime: { date: string;  }) => void;
  description: string;
  title: string;
  clockInDate: string;
  clockInTime: string;
};

const BottomSheetDateTimePicker: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  description,
  title,
  clockInDate,
  clockInTime
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tempSelectedDate, setTempSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectedHour, setSelectedHour] = useState(new Date().getHours());
  const [selectedMinute, setSelectedMinute] = useState(new Date().getMinutes());
  const [tempSelectedHour, setTempSelectedHour] = useState(new Date().getHours());
  const [tempSelectedMinute, setTempSelectedMinute] = useState(new Date().getMinutes());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);  // To store the error message
  const [activeField, setActiveField] = useState<string | null>(null);
console.log("the time is ",clockInTime,clockInDate)
let formattedClockInTime = null;

  // Check if both clockInDate and clockInTime are valid and format them
  if (clockInDate && clockInTime) {
    formattedClockInTime = `${clockInDate} ${clockInTime}`;
    console.log("Formatted Clock In Time:", formattedClockInTime);
  } else {
    console.log("Clock In Date or Time is missing!");
  }

  // Handle invalid or missing DateTime
  let clockInDateTime = null;
  if (formattedClockInTime) {
    clockInDateTime = moment(formattedClockInTime, );
    if (clockInDateTime.isValid()) {
      console.log("Clock In DateTime is valid:", clockInDateTime.format());
    } else {
      console.log("Clock In DateTime is invalid.",formattedClockInTime,clockInDateTime);
    }
  }

  // If clockInDateTime is still invalid, log the issue
  if (!clockInDateTime || !clockInDateTime.isValid()) {
    console.log("Invalid or missing Clock In DateTime.");
  }
  const calendarRef = useRef(null);
  const [isPrevMonthDisabled, setPrevMonthDisabled] = useState(false);
  
  useEffect(() => {
    const currentMonth = moment().month();
    const clockInMonth = moment(clockInDate).month();
    
    // Disable the previous month button if we're in the clockInDate month
    if (currentMonth === clockInMonth) {
      setPrevMonthDisabled(true);
    } else {
      setPrevMonthDisabled(false);
    }
  }, [clockInDate]);
const handleSave = () => {
    const combinedDateTime = moment(selectedDate)
      .hours(selectedHour)
      .minutes(selectedMinute)
      .format(); // Microsoft ISO format
    onSave({ date: combinedDateTime });
    onClose();
  };
  // Format time for display
  const getFormattedTime = () => {
    // Use moment to format time correctly
    const time = moment()
      .hours(tempSelectedHour)
      .minutes(tempSelectedMinute);
    return time.format('hh:mm A'); // Converts to 12-hour format with AM/PM
  };
const toast = useToast();
const formatDateToLocal = (date) => {
  // Format the date to YYYY-MM-DD in the local timezone
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const parts = formatter.formatToParts(date);
  const formattedDate = `${parts.find(p => p.type === 'year').value}-${
    parts.find(p => p.type === 'month').value}-${
    parts.find(p => p.type === 'day').value}`;

  return formattedDate;
};
  const handleDateConfirm = () => {
    setSelectedDate(tempSelectedDate);
    setShowDatePicker(false);
  };

  // const handleTimeConfirm = () => {
  //   setSelectedHour(tempSelectedHour);
  //   setSelectedMinute(tempSelectedMinute);
  //   setShowTimePicker(false);
  // };

  

  const handleTimeConfirm = () => {
    const selectedDateTime = moment(tempSelectedDate)
      .hours(tempSelectedHour)
      .minutes(tempSelectedMinute);
  
    const normalizedClockInDateTime = moment(clockInDateTime);
  
    if (selectedDateTime.isBefore(normalizedClockInDateTime)) {
      // Set error message when time is invalid
     
      setErrorMessage(`Invalid time selected! Please select a time after ${normalizedClockInDateTime.format('YYYY-MM-DD hh:mm A')}`);
      console.error('Selected time is before the clock-in date and time.');
      
      // Reset the selected time to the current time if it's invalid
      const currentTime = moment();
      setTempSelectedHour(currentTime.hours());
      setTempSelectedMinute(currentTime.minutes());
      
      return;  // Prevent further logic
    }
  
    // Clear the error message if the time is valid
    setErrorMessage(null);
  
    // Proceed to set the time as normal if valid
    setSelectedHour(tempSelectedHour);
    setSelectedMinute(tempSelectedMinute);
    setShowTimePicker(false);
  };
  useEffect(() => {
  if (showTimePicker) {
    setTempSelectedHour(selectedHour || 12); // Default to 12 if no value is set
    setTempSelectedMinute(selectedMinute || 0); // Default to 0 if no value is set
  }
}, [showTimePicker]);

  const handleFocus = (field: string) => {
    setActiveField(field);
  };
  

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.bottomSheet}>
        <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          <View style={styles.inputContainer}>
            {/* Date Picker Input */}
            <TouchableOpacity
             style={[
              styles.inputWrapper,
              activeField === 'date' && styles.inputActive,
            ]}
            onPress={() => {
              setShowDatePicker(true);
              handleFocus('date');
            }}
            >
              <View style={styles.labelContainer}>
                <Text style={styles.inputLabel}>Date</Text>
              </View>
              {/* <TextInput
                style={styles.input}
                placeholder="Select Date"
                value={selectedDate.toISOString().split('T')[0]}
                editable={false}
                pointerEvents="none"
              /> */}

<TextInput
    style={styles.input}
    placeholder="Select Date"
    value={moment(selectedDate).format('MM/DD/YYYY')} // Format date as MM/DD/YYYY
    editable={false}
    pointerEvents="none"
/>
              {/* <Feather name="calendar" size={20} color="grey" style={styles.icon} /> */}
            </TouchableOpacity>

            {/* Time Picker Input */}
            <TouchableOpacity
              style={[
                styles.inputWrapper,
                activeField === 'time' && styles.inputActive,
              ]}
              onPress={() => {
                setShowTimePicker(true);
                handleFocus('time');
              }}
            >
              <View style={styles.labelContainer}>
                <Text style={styles.inputLabel}>Time</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Select Time"
                value={getFormattedTime()}
                editable={false}
                pointerEvents="none"
              />
              {/* <Feather name="clock" size={20} color="grey" style={styles.icon} /> */}
            </TouchableOpacity>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          

          {/* Close Button
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity> */}
        </View>

        
{showDatePicker && (
  <Modal
    transparent={true}
    visible={showDatePicker}
    animationType="fade"
    onRequestClose={() => setShowDatePicker(false)}
  >
    <View style={styles.centeredView}>
      <View style={styles.calendarContainer}>
        <Text style={styles.calendarTitle}>Select Date</Text>
        <Calendar
          // Handle date selection
          onDayPress={(day) => {
            console.log("Selected Date:", day.dateString); // Debugging
            setTempSelectedDate(new Date(day.dateString)); // Update tempSelectedDate
          }}
          // Mark the selected date dynamically
          markedDates={{
            [moment(tempSelectedDate).format('YYYY-MM-DD')]: {
              selected: true,
              selectedColor: Colors.primary,
              selectedTextColor: '#fff', // Text color for the selected date
            },
          }}
          minDate={moment(clockInDate).format('YYYY-MM-DD')} // Disable dates before the clock-in date
          initialDate={formatDateToLocal(tempSelectedDate)} // Focus on the selected date initially
          theme={{
            textSectionTitleColor: '#000', // Section title color
            dayTextColor: '#000', // Regular days
            selectedDayBackgroundColor: Colors.primary, // Selected day background
            selectedDayTextColor: '#fff', // Selected day text
            arrowColor: Colors.primary, // Arrow color for navigation
            todayTextColor: Colors.primary, // Highlight today's date
            textDisabledColor: '#d9e1e8', // Disabled dates color
          }}
          
          // disableMonthChange={true}
        />
        <View style={styles.buttonRow}>
          <Pressable onPress={() => setShowDatePicker(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              console.log("Confirmed Date:", tempSelectedDate.toISOString()); // Debugging
              handleDateConfirm(tempSelectedDate); // Pass selected date
              setShowDatePicker(false);
            }}
          >
            <Text style={styles.okButtonText}>OK</Text>
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
)}
        
        {showTimePicker && (
  <Modal
    transparent={true}
    visible={showTimePicker}
    animationType="fade"
    onRequestClose={() => setShowTimePicker(false)}
  >
    <View style={styles.centeredView}>
      <View style={styles.timePickerContainer}>
        <Text style={styles.timePickerTitle}>Select Time</Text>
        
        {/* Display error message if there's any */}
        {errorMessage && (
          <Text style={styles.errorText}>{errorMessage}</Text>  // Error text style
        )}

        <TimePicker
          value={{
            hours: (tempSelectedHour % 12) || 12, // Convert 24-hour to 12-hour format
            minutes: tempSelectedMinute,
            seconds: 0,
            ampm: tempSelectedHour >= 12 ? 'pm' : 'am',
          }}
          isAmpm={true} // Enable AM/PM toggle
          onChange={({ hours, minutes, ampm }) => {
            let updatedHours = Number(hours); // Ensure hours is treated as a number

            // Convert to 24-hour format
            if (ampm === 'pm' && updatedHours < 12) {
              updatedHours += 12; // Add 12 for PM
            } else if (ampm === 'am' && updatedHours === 12) {
              updatedHours = 0; // Set to 0 for midnight
            }

            // Update state
            setTempSelectedHour(updatedHours); // Keep in 24-hour format
            setTempSelectedMinute(minutes);
          }}
        />
        <View style={styles.buttonRow}>
          <Pressable onPress={() => setShowTimePicker(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
          <Pressable onPress={handleTimeConfirm}>
            <Text style={styles.okButtonText}>Ok</Text>
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
)}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
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
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    fontWeight: '400',
  },
  title: {
    fontSize: 20,
    color:'#000',
    marginBottom: 16,

    // marginTop: 20,
    fontWeight: '400',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  inputWrapper: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: '#fff',
    position: 'relative',
  },
  cancelButtonText: {
    color: '#000',
    fontSize: 16,
  },

  okButtonText: {
    color: '#FFA500',
    fontSize: 16,
    // fontWeight: 'bold',
    marginLeft: 30,
  },
  labelContainer: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
  },
  inputLabel: {
    fontSize: 12,
    color: '#777',
  },
  input: {
    fontSize: 16,
    color: '#000',
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 30,
  },
  saveButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFA500',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
   
    calendarContainer: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      width: '80%',
      alignSelf: 'center',
    },
    inputActive: {
      borderColor: '#FFA500',
    },
    timePickerContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignSelf: 'center',
    },
    errorText: {
      color: 'red',
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    calendarTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        // marginBottom: 10,
        alignSelf: 'center',
    },
    timePickerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        // marginBottom: 10,
        alignSelf: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
});

export default BottomSheetDateTimePicker;