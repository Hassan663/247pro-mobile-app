import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  View,
  Text,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import AppHeader from '../../../../core/components/app-headers';
import Loader from '../../../../core/components/loader.component';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './team.style';
import Colors from '../../../../styles/colors';
import { centralStyle, windowHeight } from '../../../../styles/constant.style';
import { getTimesheetByUserApi } from '../../../../core/http-services/apis/application-api/timecard-api/member.service';

const Team = ({ navigation, route }) => {
  const { user } = route.params; // Get the passed user object with id, profile, and value (name)
  const [loading, setLoading] = useState(true);
  const [timesheetData, setTimesheetData] = useState([]);
  const [totalWorkingHours, setTotalWorkingHours] = useState(0);

  useEffect(() => {
    setLoading(true);
    const startDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const endDate = moment().format('YYYY-MM-DD');

    // Fetch timesheets by user ID
    fetchTimesheets(user.key, startDate, endDate);
  }, [user]);

  const fetchTimesheets = async (userId, startDate, endDate) => {
    try {
      const response = await getTimesheetByUserApi(userId, startDate, endDate);
      if (response && response.data) {
        setTimesheetData(response.data);

        // Calculate total working hours
        let totalMinutes = 0;
        response.data.forEach((timesheet) => {
          totalMinutes += calculateTotalTime(timesheet.timesheetTransactions);
        });
        setTotalWorkingHours((totalMinutes / 60).toFixed(2)); // Convert minutes to hours
      }
    } catch (error) {
      console.error('Error fetching timesheets by user:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to calculate total time in minutes from transactions
  const calculateTotalTime = (transactions) => {
    let totalTime = 0;
    if (transactions && transactions.length > 0) {
      for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        if (transaction.transactionType === 1 || transaction.transactionType === 3) { // Clock In or Break In
          const nextTransaction = transactions[i + 1];
          if (nextTransaction && (nextTransaction.transactionType === 2 || nextTransaction.transactionType === 4)) { // Clock Out or Break Out
            const startTime = moment(transaction.transactionDateTime);
            const endTime = moment(nextTransaction.transactionDateTime);
            const duration = moment.duration(endTime.diff(startTime));
            totalTime += duration.asMinutes(); // Add the difference in minutes
          }
        }
      }
    }
    return totalTime;
  };

  // Function to format time for display
  const formatTime = (totalMinutes) => {
    const totalSeconds = totalMinutes * 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    const seconds = Math.round((totalMinutes % 1) * 60);

    if (totalSeconds < 60) {
      return `${seconds} Sec`; // Show seconds if less than a minute
    }
    if (hours > 0) {
      return `${hours} Hrs ${minutes} Min`;
    }
    return `${minutes} Min`;
  };

  const getTransactionDetails = (transactionType) => {
    switch (transactionType) {
      case 1: return { action: 'Clock In', color: 'orange' };
      case 2: return { action: 'Clock Out', color: 'red' };
      case 3: return { action: 'Break In', color: 'blue' };
      case 4: return { action: 'Break Out', color: 'green' };
      default: return { action: 'Unknown', color: 'gray' };
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <AppHeader
        iconL1={
          <AntDesign
            style={centralStyle.mx2}
            name={'left'}
            onPress={() => navigation.goBack()}
            size={RFPercentage(3)} />}
        title={'Team'} 
      />
      {/* Show loader when loading */}
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Loader size={'large'} />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.container}>
            {/* User Profile */}
            <View style={styles.myReportProfileContainer}>
              <View style={[centralStyle.circle(RFValue(70, windowHeight)), centralStyle.mx1, { overflow: "hidden" }]}>
                <Image
                  source={{ uri: user.profile || 'https://via.placeholder.com/150' }} // Use passed user object profile
                  style={styles.profileImage}
                />
              </View>
              <Title
                type='Poppin-14'
                weight='600'
                color={Colors.fontColor}
                title={user.value || 'User Name'} // Use passed user object name
              />
            </View>

            {/* Total Working Hours */}
            <View style={styles.reportTimeHeader}>
              <Title
                type='Poppin-16'
                weight='500'
                color={Colors.black}
                title={moment().format('DD/MM/YYYY')}
              />
              <Title
                type='Poppin-14'
                weight='600'
                color={Colors.black}
                title={`${totalWorkingHours} Hrs`}
              />
            </View>

            {/* Timesheet Data */}
            {timesheetData && timesheetData.length > 0 ? (
              timesheetData.map((timesheet, index) => {
                const totalTimeInMinutes = calculateTotalTime(timesheet.timesheetTransactions);
                return (
                  <View key={index} style={styles.timesheetCard}>
                    <View style={styles.timesheetHeader}>
                      <Text style={styles.dateText}>{moment(timesheet.timesheetDate).format('DD/MM/YYYY')}</Text>
                      <Text style={styles.hoursText}>{formatTime(totalTimeInMinutes)}</Text> {/* Time formatted directly */}
                    </View>

                    {timesheet.timesheetTransactions.map((transaction, idx) => {
                      const { action, color } = getTransactionDetails(transaction.transactionType);
                      return (
                        <View key={idx} style={styles.transactionRow}>
                          <View style={styles.verticalLineContainer}>
                            <View style={[styles.circle, { backgroundColor: color }]} />
                            {idx < timesheet.timesheetTransactions.length - 1 && (
                              <View style={styles.verticalLine} />
                            )}
                          </View>
                          <View style={styles.transactionDetails}>
                            <View style={styles.transactionDetailsRow}>
                              <Text style={styles.actionText}>{action}</Text>
                              <Text style={styles.timeText}>{moment(transaction.transactionDateTime).format('hh:mm A')}</Text>
                            </View>
                            <Text style={styles.addressText}>{transaction.address}</Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                );
              })
            ) : (
              // Center the "No data available" message
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <Text>No timesheet data available for this user.</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Team;