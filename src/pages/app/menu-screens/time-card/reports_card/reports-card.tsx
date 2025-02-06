import React, { useEffect, useState, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator, Modal } from 'react-native';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './report-card.style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';
import { centralStyle } from '../../../../../styles/constant.style';
import { changeRoute } from '../../../../../core/helpers/async-storage';
import { platform } from '../../../../../utilities';
import { getTimesheetsForCurrentUserApi } from '../../../../../core/http-services/apis/application-api/timecard-api/member.service';
import Colors from '../../../../../styles/colors';
import AppHeader from '../../../../../core/components/app-headers';
import { formatTotalWorkingTime, formatReportTransactionTime } from '../call-back';
import FilterBottomSheet from '../../../../../core/components/filter_bottomsheet..component';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CURRENTUSERPROFILE } from '../../../../../store/constant/constant';
import { userIdentity } from '../../../../../core/http-services/apis/identity-api/authentication.service';


const ReportCard = ({ navigation }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [timesheetData, setTimesheetData] = useState([]);
    const [totalWorkingHours, setTotalWorkingHours] = useState(0);
    const [userName, setUserName] = useState('No Name Available');
    const [userProfile, setUserProfile] = useState('https://via.placeholder.com/150');
    const [isFilterBottomSheetVisible, setIsFilterBottomSheetVisible] = useState(false);
    const currentUserProfile = useSelector((state: any) => state.root.currentUserProfile);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dateRangeSelected, setDateRangeSelected] = useState('monthly');



    useEffect(() => {
        // Set default dates for current month
        const startOfCurrentMonth = moment().startOf('month').format('YYYY-MM-DDT00:00:00');
        const endOfCurrentMonth = moment().endOf('month').format('YYYY-MM-DDT23:59:59');
        setStartDate(startOfCurrentMonth);
        setEndDate(endOfCurrentMonth);
        //     const startOfCurrentMonth = moment.utc().startOf('month').subtract(5, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        // const endOfCurrentMonth = moment.utc().endOf('month').subtract(5, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        // const startOfCurrentMonth = moment().startOf('month').subtract(5, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        // const endOfCurrentMonth = moment().endOf('month').subtract(5, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        console.log("The date ,", startDate, endDate)


        setStartDate(startOfCurrentMonth);
        setEndDate(endOfCurrentMonth);

        // Fetch timesheets for the current month
        fetchTimesheets(startOfCurrentMonth, endOfCurrentMonth);
    }, []);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Get access token from storage
                const accessToken = await AsyncStorage.getItem('accessToken');

                if (!accessToken) {
                    console.error('Error: No access token found.');
                    // Handle the error (e.g., show an alert or navigate to the login screen)
                    return;
                }

                // Parse the access token
                const parsedToken = accessToken;

                // Fetch user profile from API
                const userProfile = await userIdentity(parsedToken);

                // Dispatch the user profile to the store
                dispatch({ type: CURRENTUSERPROFILE, payload: userProfile });
                setUserName(userProfile.name || 'No Name Available');
                setUserProfile(userProfile.profile || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y');

                // Log profile and permissions for debugging
                console.log("My profile is ", userProfile);
                console.log("User Permissions:", userProfile?.permissions);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [dispatch]);

    // const fetchTimesheets = async (startDate, endDate) => {

    //     setLoading(true);
    //     try {


    //         const response = await getTimesheetsForCurrentUserApi(startDate, endDate);

    //         // Reset the data if the response is empty
    //         if (Array.isArray(response) && response.length > 0) {
    //             setTimesheetData(response);
    //             const firstTimesheet = response[0];
    //             // setUserName(firstTimesheet.userName || 'No Name Available');
    //             // setUserProfile(firstTimesheet.userProfile || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y');

    //             let totalMinutes = 0;
    //             response.forEach((timesheet) => {
    //                 totalMinutes += calculateTotalTime(timesheet.timesheetTransactions);
    //             });
    //             setTotalWorkingHours((totalMinutes / 60).toFixed(2)); // Convert minutes to hours
    //         } else {
    //             setTimesheetData([]);  // Clear the previous data
    //             setTotalWorkingHours(0);  // Reset total working hours
    //             // setUserName('No Name Available');  // Reset the username
    //             // setUserProfile('https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y');  // Reset the profile image
    //         }
    //     } catch (error) {
    //         console.error("Error fetching timesheets:", error);
    //         setTimesheetData([]);  // Clear the data in case of error
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    // const fetchTimesheets = async (startDate, endDate) => {
    //     setLoading(true);
    //     try {
    //         const response = await getTimesheetsForCurrentUserApi(startDate, endDate);

    //         if (Array.isArray(response) && response.length > 0) {
    //             setTimesheetData(response);

    //             let totalSeconds = 0; // Use seconds to avoid rounding issues

    //             response.forEach((timesheet) => {
    //                 totalSeconds += calculateTotalTime(timesheet.timesheetTransactions) * 60; // Calculate in seconds
    //             });

    //             // Convert total seconds to hours and round up
    //             const totalHours = Math.ceil(totalSeconds / 3600 * 100) / 100; // Round up to two decimal places
    //             setTotalWorkingHours(totalHours);
    //         } else {
    //             setTimesheetData([]);
    //             setTotalWorkingHours(0);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching timesheets:", error);
    //         setTimesheetData([]);
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    const fetchTimesheets = async (startDate, endDate) => {
        setLoading(true);
        try {
            console.log("Fetching timesheets between:", startDate, "and", endDate);
            const response = await getTimesheetsForCurrentUserApi(startDate, endDate);
    
            if (Array.isArray(response) && response.length > 0) {
                console.log("Timesheet Response Length:", response.length);
                setTimesheetData(response);
    
                let totalSeconds = 0;
    
                response.forEach((timesheet, index) => {
                    const timeInMinutes = calculateTotalTime(timesheet.timesheetTransactions);
                    console.log(`Timesheet ${index + 1} -> Calculated Time (Minutes):`, timeInMinutes);
                    totalSeconds += timeInMinutes * 60; // Convert minutes to seconds
                });
    
                console.log("Total Time in Seconds (Before Conversion):", totalSeconds);
    
                // Convert total seconds to hours
                const totalHours = totalSeconds / 3600; // Keep precise hours
                console.log("Total Time in Hours (Unrounded):", totalHours);
    
                setTotalWorkingHours(totalHours); // Display with two decimal places
            } else {
                console.warn("No timesheet data found for the given range.");
                setTimesheetData([]);
                setTotalWorkingHours(0);
            }
        } catch (error) {
            console.error("Error fetching timesheets:", error);
            setTimesheetData([]);
            setTotalWorkingHours(0);
        } finally {
            setLoading(false);
        }
    };


    const calculateTotalTime = (transactions) => {
        let totalTimeInSeconds = 0;

        if (transactions && transactions.length > 0) {
            transactions = sortTransactionsByDate(transactions);

            if (transactions.length === 1) {
                const singleTransaction = transactions[0];
                if (singleTransaction.transactionType === 1) {
                    const clockInTime = moment(singleTransaction.transactionDateTime);
                    const currentTime = moment();
                    const duration = moment.duration(currentTime.diff(clockInTime));

                    // if (duration.asSeconds() > 0) {
                    //     totalTimeInSeconds = duration.asSeconds(); // Use seconds for precision
                    // }
                    if (duration.asSeconds() > 0) {
                                            totalTimeInSeconds += duration.asSeconds(); // Add total seconds
                                        }
                }
            } else {
                const hasBreakOut = transactions.some(transaction => transaction.transactionType === 2);

                if (!hasBreakOut) {
                    const earliestTransaction = moment(transactions[0].transactionDateTime);
                    const currentTime = moment();
                    const duration = moment.duration(currentTime.diff(earliestTransaction));

                    // if (duration.asSeconds() > 0) {
                    //     totalTimeInSeconds = duration.asSeconds();
                    // }

                    if (duration.asSeconds() > 0) {
                                            totalTimeInSeconds += duration.asSeconds(); // Add total seconds
                                        }
                } else {
                    const earliestTransaction = moment(transactions[0].transactionDateTime);
                    const latestTransaction = moment(transactions[transactions.length - 1].transactionDateTime);
                    const duration = moment.duration(latestTransaction.diff(earliestTransaction));

                    // if (duration.asSeconds() > 0) {
                    //     totalTimeInSeconds = duration.asSeconds();
                    // }
                    if (duration.asSeconds() > 0) {
                                            totalTimeInSeconds += duration.asSeconds(); // Add total seconds
                                        }
                }
            }
        }

        return totalTimeInSeconds / 60; // Return minutes as a float
    };

    // const calculateTotalTime = (transactions) => {
    //     let totalTimeInSeconds = 0;
    
    //     if (transactions && transactions.length > 0) {
    //         transactions = sortTransactionsByDate(transactions);
    
    //         if (transactions.length === 1) {
    //             const singleTransaction = transactions[0];
    //             if (singleTransaction.transactionType === 1 && singleTransaction.transactionDateTime) {
    //                 const clockInTime = moment(singleTransaction.transactionDateTime);
    //                 const currentTime = moment();
    //                 const duration = moment.duration(currentTime.diff(clockInTime));
    
    //                 if (duration.asSeconds() > 0) {
    //                     totalTimeInSeconds += duration.asSeconds();
    //                 }
    //             }
    //         } else {
    //             const hasBreakOut = transactions.some((tx) => tx.transactionType === 2);
    
    //             if (!hasBreakOut) {
    //                 const earliestTransaction = moment(transactions[0].transactionDateTime);
    //                 const currentTime = moment();
    //                 const duration = moment.duration(currentTime.diff(earliestTransaction));
    
    //                 if (duration.asSeconds() > 0) {
    //                     totalTimeInSeconds += duration.asSeconds();
    //                 }
    //             } else {
    //                 const earliestTransaction = moment(transactions[0].transactionDateTime);
    //                 const latestTransaction = moment(
    //                     transactions[transactions.length - 1].transactionDateTime
    //                 );
    //                 const duration = moment.duration(latestTransaction.diff(earliestTransaction));
    
    //                 if (duration.asSeconds() > 0) {
    //                     totalTimeInSeconds += duration.asSeconds();
    //                 }
    //             }
    //         }
    //     }
    
    //     return totalTimeInSeconds/60; // Return total seconds
    // };
   

   

    // const calculateTotalTime = (transactions) => {
    //     let totalTime = 0;
    //     let clockInTime = null;

    //     if (transactions && transactions.length > 0) {
    //         transactions = sortTransactionsByDate(transactions);

    //         if (transactions.length === 1) {
    //             // If only one transaction exists, check if it's a Clock In (transactionType === 1)
    //             const singleTransaction = transactions[0];
    //             if (singleTransaction.transactionType === 1) {
    //                 // Calculate the difference between the clock-in time and the current time
    //                 clockInTime = moment(singleTransaction.transactionDateTime);
    //                 const currentTime = moment();
    //                 const duration = moment.duration(currentTime.diff(clockInTime));

    //                 if (duration.asSeconds() > 0) {
    //                     totalTime = duration.asMinutes();
    //                 }
    //             }
    //         } else {
    //             // Check if there is any Break Out transaction (transactionType === 4)
    //             const hasBreakOut = transactions.some(transaction => transaction.transactionType === 2);

    //             // If there is no Break Out transaction, calculate time till the current time
    //             if (!hasBreakOut) {
    //                 const earliestTransaction = moment(transactions[0].transactionDateTime); // Get the earliest transaction
    //                 const currentTime = moment(); // Get the current time
    //                 const duration = moment.duration(currentTime.diff(earliestTransaction));

    //                 if (duration.asSeconds() > 0) {
    //                     totalTime = duration.asMinutes();
    //                 }
    //             } else {
    //                 // If there is a Break Out transaction, calculate the difference between the earliest and the latest
    //                 const earliestTransaction = moment(transactions[0].transactionDateTime);
    //                 const latestTransaction = moment(transactions[transactions.length - 1].transactionDateTime);

    //                 const duration = moment.duration(latestTransaction.diff(earliestTransaction));

    //                 if (duration.asSeconds() > 0) {
    //                     totalTime = duration.asMinutes();
    //                 }
    //             }
    //         }
    //     }

    //     return totalTime;
    // };

    const openFilterBottomSheet = () => {
        setIsFilterBottomSheetVisible(true);
    };
    const handleFilterApply = (newStartDate, newEndDate) => {

        if (moment(newStartDate).isAfter(newEndDate)) {
            Alert.alert('Invalid Date Range', 'Start date must be earlier than or equal to the end date.');
            return;
        }

        setStartDate(newStartDate);
        setEndDate(newEndDate);
        setIsFilterBottomSheetVisible(false);
        fetchTimesheets(newStartDate, newEndDate);
    };

    const getTransactionDetails = (transactionType) => {
        switch (transactionType) {
            case 1: return { action: 'Clock in', color: '#FB9411' };
            case 2: return { action: 'Clock out', color: '#B00020' };
            case 3: return { action: 'Break in', color: '#2196F3' };
            case 4: return { action: 'Break out', color: '#4CAF50' };
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
                    <ActivityIndicator color={Colors.primary} size={"large"} />
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
                                <MaterialIcons name="filter-list" size={20} color={Colors.black} />
                            </TouchableOpacity>
                        }
                        title={userName}
                    />


                    <ScrollView contentContainerStyle={styles.container}>

                        <View>



                            <View >
                                <View >
                                    {/* <Image source={{ uri: userProfile }} style={styles.profileImage} /> */}
                                    {/* <Text style={styles.userName}>{userName}</Text> */}
                                </View>
                            </View>


                            <Text style={styles.totalHoursTextHardCoded}>Total working hours</Text>


                            <View style={styles.rowContainer}>
                                <Text style={styles.totalHoursText}>{formatTotalWorkingTime(totalWorkingHours)}</Text>
                                <Text style={styles.dateRange}>
                                    {moment(startDate).format('MM/DD/YYYY')} - {moment(endDate).format('MM/DD/YYYY')}
                                </Text>
                            </View>


                            <View style={styles.divider} />
                        </View>

                        {timesheetData && timesheetData.length > 0 ? (
    timesheetData.map((timesheet, index) => {
        const totalTimeInMinutes = calculateTotalTime(timesheet.timesheetTransactions);
        const sortedTransactions = sortTransactionsByDate(timesheet.timesheetTransactions);

        return (
            <View key={index} style={styles.timesheetCard}>
                <View style={styles.timesheetHeader}>
                    <Text style={styles.dateText}>{moment(timesheet.timesheetDate).format('MM/DD/YYYY')}</Text>
                    <Text style={styles.dateText}>{formatReportTransactionTime(totalTimeInMinutes)}</Text>
                </View>

                {sortedTransactions.map((transaction, idx) => {
                    const { action, color } = getTransactionDetails(transaction.transactionType);
                    const isLastTransaction = idx === sortedTransactions.length - 1;
                    const hideLine = isLastTransaction && transaction.transactionType === 2;

                    // Determine if clock-in (transactionType === 1) and clock-out (transactionType === 2) dates are different
                    let formattedDateTime = moment(transaction.transactionDateTime).format('hh:mm A');
                    if (transaction.transactionType === 1) { // Clock-in logic
                        // Find the corresponding clock-out transaction
                        const nextTransaction = sortedTransactions[idx + 1];
                        if (
                            nextTransaction &&
                            nextTransaction.transactionType === 2 &&
                            moment(transaction.transactionDateTime).format('MM/DD/YYYY') !==
                                moment(nextTransaction.transactionDateTime).format('MM/DD/YYYY')
                        ) {
                            // Add date if clock-in and clock-out are on different days
                            formattedDateTime = `${moment(transaction.transactionDateTime).format('MM/DD/YYYY hh:mm A')}`;
                        }
                    }
                    if (transaction.transactionType === 2) { // Clock-Out Logic
                        const prevTransaction = sortedTransactions[idx - 1];
                
                        if (
                            prevTransaction &&
                            prevTransaction.transactionType === 1 && // Checking for Clock-In
                            moment(transaction.transactionDateTime).format('MM/DD/YYYY') !== moment(prevTransaction.transactionDateTime).format('MM/DD/YYYY')
                        ) {
                            // Add date to Clock-Out if Clock-In was on a different day
                            formattedDateTime = `${moment(transaction.transactionDateTime).format('MM/DD/YYYY hh:mm A')}`;
                        }
                    }

                    return (
                        <View key={idx} style={styles.transactionRow}>
                            <View style={styles.verticalLineContainer}>
                                <View style={[styles.circle, { backgroundColor: color }]} />
                                {!hideLine && <View style={styles.verticalLine} />}
                            </View>
                            <View style={styles.transactionDetails}>
                                <View style={styles.transactionDetailsRow}>
                                    <Text style={styles.actionText}>{action}</Text>
                                    <Text style={styles.timeText}>{formattedDateTime}</Text>
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


                        {/* <FilterBottomSheet
                            isVisible={isFilterBottomSheetVisible}
                            onClose={() => setIsFilterBottomSheetVisible(false)}
                            onApply={handleFilterApply}
                            defaultStartDate={startDate}
                            defaultEndDate={endDate}
                        /> */}

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
