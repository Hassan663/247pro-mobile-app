import moment from 'moment';
import { min } from 'moment-timezone';
import React, { useState, useEffect } from 'react';
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



export type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dateTime: { date: string;  }) => void;
  description: string;
  title: string;
};

const BottomSheetDateTimePicker: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  description,
  title
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tempSelectedDate, setTempSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectedHour, setSelectedHour] = useState(new Date().getHours());
  const [selectedMinute, setSelectedMinute] = useState(new Date().getMinutes());
  const [tempSelectedHour, setTempSelectedHour] = useState(new Date().getHours());
  const [tempSelectedMinute, setTempSelectedMinute] = useState(new Date().getMinutes());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

 
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
    const hours = tempSelectedHour < 10 ? `0${tempSelectedHour}` : tempSelectedHour;
    const minutes = tempSelectedMinute < 10 ? `0${tempSelectedMinute}` : tempSelectedMinute;
    return `${hours}:${minutes}`;
  };

  const handleDateConfirm = () => {
    setSelectedDate(tempSelectedDate);
    setShowDatePicker(false);
  };

  const handleTimeConfirm = () => {
    setSelectedHour(tempSelectedHour);
    setSelectedMinute(tempSelectedMinute);
    setShowTimePicker(false);
  };

  const handleFocus = (field: string) => {
    setActiveField(field);
  };
  const handleBlur = () => {
    setActiveField(null);
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
              <TextInput
                style={styles.input}
                placeholder="Select Date"
                value={selectedDate.toISOString().split('T')[0]}
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

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {/* Calendar Modal */}
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
                  onDayPress={(day) => setTempSelectedDate(new Date(day.dateString))}
                  markedDates={{
                    [tempSelectedDate.toISOString().split('T')[0]]: { selected: true, selectedColor: '#FFA500' },
                  }}
                  theme={{
                    textSectionTitleColor: '#000',
                    dayTextColor: '#000',
                    selectedDayBackgroundColor: '#FFA500',
                    selectedDayTextColor: '#fff',
                  }}
                />
                <View style={styles.buttonRow}>
                  <Pressable onPress={() => setShowDatePicker(false)}>
                    <Text style={styles.cancelButtonText}>CANCEL</Text>
                  </Pressable>
                  <Pressable onPress={handleDateConfirm}>
                    <Text style={styles.okButtonText}>OK</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        )}

        {/* Time Picker Modal */}
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
                <TimePicker
                  selectedHours={tempSelectedHour}
                  selectedMinutes={tempSelectedMinute}
                  onChange={({ hours, minutes }) => {
                    setTempSelectedHour(hours);
                    setTempSelectedMinute(minutes);
                  }}
                />
                <View style={styles.buttonRow}>
                  <Pressable onPress={() => setShowTimePicker(false)}>
                    <Text style={styles.cancelButtonText}>CANCEL</Text>
                  </Pressable>
                  <Pressable onPress={handleTimeConfirm}>
                    <Text style={styles.okButtonText}>OK</Text>
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
    fontWeight: 'bold',
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