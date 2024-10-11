import React, { useEffect, useState, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { Modalize } from 'react-native-modalize';

import { styles } from './report-card.style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';
import { centralStyle } from '../../../../../styles/constant.style';
import { changeRoute } from '../../../../../core/helpers/async-storage';
import { platform } from '../../../../../utilities';
import { getTimesheetsForCurrentUserApi } from '../../../../../core/http-services/apis/application-api/timecard-api/member.service';
import Colors from '../../../../../styles/colors';
import Loader from '../../../../../core/components/loader.component';
import AppHeader from '../../../../../core/components/app-headers';
import { formatTotalWorkingTime, formatReportTransactionTime } from '../call-back';
import { RadioButton } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import Button from '../../../../../core/components/button.component';
import FilterBottomSheet from '../../../../../core/components/filter_bottomsheet..component';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const ReportCard = ({ navigation }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [timesheetData, setTimesheetData] = useState([]);
    const [totalWorkingHours, setTotalWorkingHours] = useState(0);
    const [userName, setUserName] = useState('No Name Available');
    const [userProfile, setUserProfile] = useState('https://via.placeholder.com/150');
    const [isFilterBottomSheetVisible, setIsFilterBottomSheetVisible] = useState(false);


    // Date range state for custom date selection
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dateRangeSelected, setDateRangeSelected] = useState('monthly'); // Default to 'monthly'

    useEffect(() => {
        // Set default dates for monthly option
        const startOfPreviousMonth = moment().subtract(1, 'month').startOf('day').format('YYYY-MM-DDT00:00:00');
        const endOfToday = moment().endOf('day').format('YYYY-MM-DDT23:59:59');

        setStartDate(startOfPreviousMonth);
        setEndDate(endOfToday);

        // Fetch timesheets with default monthly date range
        fetchTimesheets(startOfPreviousMonth, endOfToday);
    }, []);

    

    const fetchTimesheets = async (startDate, endDate) => {
        setLoading(true); 
        try {
            const response = await getTimesheetsForCurrentUserApi(startDate, endDate);
    
            // Reset the data if the response is empty
            if (Array.isArray(response) && response.length > 0) {
                setTimesheetData(response);
                const firstTimesheet = response[0];
                setUserName(firstTimesheet.userName || 'No Name Available');
                setUserProfile(firstTimesheet.userProfile || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y');
    
                let totalMinutes = 0;
                response.forEach((timesheet) => {
                    totalMinutes += calculateTotalTime(timesheet.timesheetTransactions);
                });
                setTotalWorkingHours((totalMinutes / 60).toFixed(2)); // Convert minutes to hours
            } else {
                setTimesheetData([]);  // Clear the previous data
                setTotalWorkingHours(0);  // Reset total working hours
                setUserName('No Name Available');  // Reset the username
                setUserProfile('https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y');  // Reset the profile image
            }
        } catch (error) {
            console.error("Error fetching timesheets:", error);
            setTimesheetData([]);  // Clear the data in case of error
        } finally {
            setLoading(false);
        }
    };


    const openFilterBottomSheet = () => {
        setIsFilterBottomSheetVisible(true);
    };
    const handleFilterApply = (newStartDate, newEndDate) => {
        // Validate that the start date is earlier than or equal to the end date
        if (moment(newStartDate).isAfter(newEndDate)) {
            Alert.alert('Invalid Date Range', 'Start date must be earlier than or equal to the end date.');
            return;
        }
        
        setStartDate(newStartDate);
        setEndDate(newEndDate);
        setIsFilterBottomSheetVisible(false);
        fetchTimesheets(newStartDate, newEndDate);
    };
    

    const calculateTotalTime = (transactions) => {
        let totalTime = 0;
        let clockInTime = null;
    
        if (transactions && transactions.length > 0) {
            transactions = sortTransactionsByDate(transactions);
    
            if (transactions.length === 1) {
                // If only one transaction exists, check if it's a Clock In (transactionType === 1)
                const singleTransaction = transactions[0];
                if (singleTransaction.transactionType === 1) {
                    // Calculate the difference between the clock-in time and the current time
                    clockInTime = moment(singleTransaction.transactionDateTime);
                    const currentTime = moment(); // Get the current time
                    const duration = moment.duration(currentTime.diff(clockInTime));
    
                    if (duration.asSeconds() > 0) {
                        totalTime = duration.asMinutes(); // Calculate time difference in minutes
                    }
                }
            } else {
                // Check if there is any Break Out transaction (transactionType === 4)
                const hasBreakOut = transactions.some(transaction => transaction.transactionType === 2);
    
                // If there is no Break Out transaction, calculate time till the current time
                if (!hasBreakOut) {
                    const earliestTransaction = moment(transactions[0].transactionDateTime); // Get the earliest transaction
                    const currentTime = moment(); // Get the current time
                    const duration = moment.duration(currentTime.diff(earliestTransaction));
    
                    if (duration.asSeconds() > 0) {
                        totalTime = duration.asMinutes(); // Calculate time difference in minutes
                    }
                } else {
                    // If there is a Break Out transaction, calculate the difference between the earliest and the latest
                    const earliestTransaction = moment(transactions[0].transactionDateTime);
                    const latestTransaction = moment(transactions[transactions.length - 1].transactionDateTime);
    
                    const duration = moment.duration(latestTransaction.diff(earliestTransaction));
    
                    if (duration.asSeconds() > 0) {
                        totalTime = duration.asMinutes(); // Calculate total time in minutes
                    }
                }
            }
        }
    
        return totalTime;
    };

    const getTransactionDetails = (transactionType) => {
        switch (transactionType) {
            case 1: return { action: 'Clock In', color: '#FB9411' };
            case 2: return { action: 'Clock Out', color: '#B00020' };
            case 3: return { action: 'Break In', color: '#2196F3' };
            case 4: return { action: 'Break Out', color: '#4CAF50' };
            default: return { action: 'Unknown', color: 'gray' };
        }
    };

    const sortTransactionsByDate = (transactions) => {
        return transactions.sort((a, b) => moment(a.transactionDateTime) - moment(b.transactionDateTime));
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
           
            
           {loading ? (
                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white }}>
                    <Loader size={'large'} />
                 </View>
            ) : (
                <>
                    <AppHeader
                        iconL1={
                            <AntDesign
                                style={centralStyle.mx2}
                                name={'left'}
                                
                                onPress={() => { changeRoute(navigation, 'pop') }}
                                size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)}
                            />
                        }
                        iconR1={
                            <TouchableOpacity onPress={openFilterBottomSheet} style={{ paddingRight: 12 }}>
                               <MaterialIcons name="filter-list" size={30} color={Colors.black} />
                            </TouchableOpacity>
                        }
                        title={t('My Report')}
                    />
                    

                    <ScrollView contentContainerStyle={styles.container}>
                        
                        <View>
                            
                            
                            {/* Grey container with padding and row for avatar and name */}
                            <View style={styles.greyContainer}>
                                <View style={styles.profileRow}>
                                    <Image source={{ uri: userProfile }} style={styles.profileImage} />
                                    <Text style={styles.userName}>{userName}</Text>
                                </View>
                            </View>

                            {/* Total working hours hardcoded with padding */}
                            <Text style={styles.totalHoursTextHardCoded}>Total working hours</Text>

                            {/* Row for total working hours and date range */}
                            <View style={styles.rowContainer}>
                                <Text style={styles.totalHoursText}>{formatTotalWorkingTime(totalWorkingHours)}</Text>
                                <Text style={styles.dateRange}>
                                    {moment(startDate).format('DD/MM/YYYY')} - {moment(endDate).format('DD/MM/YYYY')}
                                </Text>
                            </View>

                            {/* Divider after the third row */}
                            <View style={styles.divider} />
                        </View>

                        {timesheetData && timesheetData.length > 0 ? (
                            timesheetData.map((timesheet, index) => {
                                const totalTimeInMinutes = calculateTotalTime(timesheet.timesheetTransactions);
                                const sortedTransactions = sortTransactionsByDate(timesheet.timesheetTransactions);
                                return (
                                    <View key={index} style={styles.timesheetCard}>
                                        <View style={styles.timesheetHeader}>
                                            <Text style={styles.dateText}>{moment(timesheet.timesheetDate).format('DD/MM/YYYY')}</Text>
                                            <Text style={styles.dateText}>{formatReportTransactionTime(totalTimeInMinutes)}</Text>
                                        </View>

                                        {sortedTransactions.map((transaction, idx) => {
                                            const { action, color } = getTransactionDetails(transaction.transactionType);
                                            return (
                                                <View key={idx} style={styles.transactionRow}>
                                                    <View style={styles.verticalLineContainer}>
                                                        <View style={[styles.circle, { backgroundColor: color }]} />
                                                        {/* Always render vertical line, even for the last transaction */}
                                                        <View style={styles.verticalLine} />
                                                    </View>
                                                    <View style={styles.transactionDetails}>
                                                        <View style={styles.transactionDetailsRow}>
                                                            <Text style={styles.actionText}>{action}</Text>
                                                            <Text style={styles.timeText}>{moment(transaction.transactionDateTime).format('hh:mm A')}</Text>
                                                        </View>
                                                        <Text style={styles.addressText}>{transaction.address}</Text>
                                                        {/* <Text >{}</Text> */}


                                                        <Text >{ }</Text>
                                                    </View>
                                                </View>
                                            );
                                        })}
                                    </View>
                                );
                            })
                        ) : (
                            <Text>No timesheet data available for the selected date range.</Text>
                        )}

                        <FilterBottomSheet
                            isVisible={isFilterBottomSheetVisible}
                            onClose={() => setIsFilterBottomSheetVisible(false)}
                            onApply={handleFilterApply}
                            defaultStartDate={startDate}
                            defaultEndDate={endDate}
                        />

                    </ScrollView>
                </>
            )}
        </SafeAreaView>
    );
};

export default ReportCard;
