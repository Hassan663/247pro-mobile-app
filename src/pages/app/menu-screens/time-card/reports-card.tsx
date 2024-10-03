import React, { useEffect, useState, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import AppHeader from '../../../../core/components/app-headers';
import Loader from '../../../../core/components/loader.component';
import { Modalize } from 'react-native-modalize';
import Colors from '../../../../styles/colors';
import { styles } from './report-card.style';
import { getTimesheetsForCurrentUserApi } from '../../../../core/http-services/apis/application-api/timecard-api/member.service';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { platform } from '../../../../utilities';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../styles/constant.style';
import { t } from 'i18next';

const formatDateForApi = (date) => moment(date).format('YYYY-MM-DD');

const ReportCard = ({ navigation }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [timesheetData, setTimesheetData] = useState([]);
    const [totalWorkingHours, setTotalWorkingHours] = useState(0); // Initialize as a number
    const modalizeRef = useRef(null);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const today = formatDateForApi(moment());
        const yesterday = formatDateForApi(moment().subtract(30, 'days'));

        setStartDate(yesterday);
        setEndDate(today);

        fetchTimesheets(yesterday, today);
    }, []);

    const fetchTimesheets = async (startDate, endDate) => {
        try {
            const response = await getTimesheetsForCurrentUserApi(startDate, '2024-10-03');

            if (Array.isArray(response) && response.length > 0) {
                setTimesheetData(response);

                let totalMinutes = 0; // Initialize totalMinutes as 0
                response.forEach((timesheet) => {
                    totalMinutes += calculateTotalTime(timesheet.timesheetTransactions); // Add up total minutes
                });

                setTotalWorkingHours((totalMinutes / 60).toFixed(2)); // Convert total minutes to hours and round to 2 decimals
            }
        } catch (error) {
            console.error("Error fetching timesheets:", error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate the total time for each timesheet in minutes
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

                        const duration = moment.duration(endTime.diff(startTime)); // Get the difference
                        const minutes = duration.asMinutes(); // Convert the difference to minutes
                        totalTime += minutes; // Add minutes to totalTime
                    }
                }
            }
        }
        return totalTime; // Return total minutes as a number
    };

    // Format total minutes into "X Hrs Y Min" format or show seconds if less than a minute
    const formatTime = (totalMinutes) => {
        const totalSeconds = totalMinutes * 60; // Convert minutes to seconds for proper handling
        const hours = Math.floor(totalMinutes / 60);
        const minutes = Math.floor(totalMinutes % 60); // Only round for display if greater than 1 min
        const seconds = Math.round((totalMinutes % 1) * 60); // Extract remaining seconds

        // If the total time is less than 1 minute, display in seconds
        if (totalSeconds < 60) {
            return `${seconds} Sec`; // Display seconds only if less than 1 minute
        }

        // If hours and minutes, display in "X Hrs Y Min" format
        if (hours > 0) {
            return `${hours} Hrs ${minutes} Min`;
        } else {
            return `${minutes} Min`; // Display only minutes if less than 1 hour
        }
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
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            {loading ? <Loader size={'large'} /> : (
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
                            <Entypo name="dots-three-vertical" size={20} color={Colors.black} />
                        }
                        title={t('Report Card')}
                    />


                    <ScrollView contentContainerStyle={styles.container}>
                        <View style={styles.profileSection}>
                            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
                            <View>
                                <Text style={styles.userName}>Muhammad Hassan Nawaz</Text>
                                <Text style={styles.totalHoursText}>Total working hours</Text>
                                <Text style={styles.totalHoursCount}>{totalWorkingHours} Hrs</Text>
                                <Text style={styles.dateRange}>{moment(startDate).format('DD/MM/YYYY')} - {moment(endDate).format('DD/MM/YYYY')}</Text>
                            </View>
                        </View>

                        {timesheetData && timesheetData.length > 0 ? (
                            timesheetData.map((timesheet, index) => {
                                const totalTimeInMinutes = calculateTotalTime(timesheet.timesheetTransactions); // Get total time in minutes
                                return (
                                    <View key={index} style={styles.timesheetCard}>
                                        <View style={styles.timesheetHeader}>
                                            <Text style={styles.dateText}>{moment(timesheet.timesheetDate).format('DD/MM/YYYY')}</Text>
                                            <Text style={styles.hoursText}>{formatTime(totalTimeInMinutes)}</Text>
                                        </View>

                                        {/* Transactions */}
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
                            <Text>No timesheet data available for the selected date range.</Text>
                        )}

                        <TouchableOpacity onPress={() => modalizeRef.current?.open()} style={styles.bottomSheetButton}>
                            <Text style={styles.bottomSheetButtonText}>Open Bottom Sheet</Text>
                        </TouchableOpacity>

                        <Modalize ref={modalizeRef}>
                            {/* Bottom sheet content */}
                        </Modalize>
                    </ScrollView>
                </>
            )}
        </SafeAreaView>
    );
};

export default ReportCard;