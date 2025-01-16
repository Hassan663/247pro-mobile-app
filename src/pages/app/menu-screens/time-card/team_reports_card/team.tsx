import React, { useEffect, useState, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';
import { centralStyle } from '../../../../../styles/constant.style';
import { changeRoute } from '../../../../../core/helpers/async-storage';
import { platform } from '../../../../../utilities';
import { getTimesheetByUserApi, getTimesheetsForCurrentUserApi } from '../../../../../core/http-services/apis/application-api/timecard-api/member.service';
import Colors from '../../../../../styles/colors';
import AppHeader from '../../../../../core/components/app-headers';
import { formatTotalWorkingTime, formatReportTransactionTime } from '../call-back';
import { styles } from '../reports_card/report-card.style';
// import MapView from 'react-native-maps';
import MapView, { Marker } from 'react-native-maps';



const Team = ({ navigation, route }) => {
    const { user } = route.params;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [timesheetData, setTimesheetData] = useState([]);
    const [totalWorkingHours, setTotalWorkingHours] = useState(0);
    const [userName, setUserName] = useState('No Name Available');
    const [userProfile, setUserProfile] = useState('https://via.placeholder.com/150');
    const [location, setLocation] = useState(null);

    useEffect(() => {
        setLoading(true)
        console.log("User details from previous screen:", user);

        const startDate = moment().startOf('day').format('YYYY-MM-DDTHH:mm:ssZ');
        const endDate = moment().endOf('day').format('YYYY-MM-DDTHH:mm:ssZ');


        console.log("Start Date (0 hour):", startDate);
        console.log("End Date (24 hour):", endDate);
        setUserName(user.value || 'No Name Available');
        setUserProfile(user.profile || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y');

        fetchTimesheets(user.key, startDate, endDate);
    }, []);

    // const fetchTimesheets = async (startDate: string, endDate: string | undefined, userId: string | undefined) => {
    //     setLoading(true);
    //     try {
    //         const response = await getTimesheetByUserApi(startDate, endDate, userId);
    //         if (Array.isArray(response) && response.length > 0) {
    //             setTimesheetData(response);
    //             // Get the first timesheet with a Clock In (transactionType === 1)
    //             const firstTimesheet = response.find(timesheet =>
    //                 timesheet.timesheetTransactions.some(transaction => transaction.transactionType === 1)
    //             );
    //             console.log("The lat and long in TEAM is ", location.latitude, location.longitude)

    //             if (firstTimesheet) {
    //                 const clockInTransaction = firstTimesheet.timesheetTransactions.find(
    //                     transaction => transaction.transactionType === 1
    //                 );
    //                 console.log("The lat and long in TEAM is ", location.latitude, location.longitude)
    //                 if (clockInTransaction?.latitude && clockInTransaction?.longitude) {
    //                     setLocation({
    //                         latitude: parseFloat(clockInTransaction.latitude),
    //                         longitude: parseFloat(clockInTransaction.longitude),
    //                     });
    //                 }
    //                 console.log("The lat and long in TEAM is ", location.latitude, location.longitude)
    //             }
    //             console.log("The lat and long in TEAM is ", location.latitude, location.longitude)


    //             let totalMinutes = 0;
    //             response.forEach((timesheet) => {
    //                 totalMinutes += calculateTotalTime(timesheet.timesheetTransactions);
    //             });
    //             setTotalWorkingHours((totalMinutes / 60).toFixed(2));
    //         }
    //     } catch (error) {
    //         console.error("Error fetching timesheets:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    const fetchTimesheets = async (startDate: string, endDate: string | undefined, userId: string | undefined) => {
        setLoading(true);
        try {
            const response = await getTimesheetByUserApi(startDate, endDate, userId);
            if (Array.isArray(response) && response.length > 0) {
                setTimesheetData(response);
    
                // Get the first timesheet with a Clock In (transactionType === 1)
                const firstTimesheet = response.find(timesheet =>
                    timesheet.timesheetTransactions.some(transaction => transaction.transactionType === 1)
                );
    
                if (firstTimesheet) {
                    const clockInTransaction = firstTimesheet.timesheetTransactions.find(
                        transaction => transaction.transactionType === 1
                    );
    
                    if (clockInTransaction?.latitude && clockInTransaction?.longitude) {
                        // Set location if latitude and longitude are available
                        setLocation({
                            latitude: parseFloat(clockInTransaction.latitude),
                            longitude: parseFloat(clockInTransaction.longitude),
                        });
    
                        // Log the location after setting it
                        console.log("The lat and long in TEAM are:", clockInTransaction.latitude, clockInTransaction.longitude);
                    }
                }
    
                // Calculate the total working hours
                let totalMinutes = 0;
                response.forEach((timesheet) => {
                    totalMinutes += calculateTotalTime(timesheet.timesheetTransactions);
                });
                setTotalWorkingHours((totalMinutes / 60).toFixed(2));
            }
        } catch (error) {
            console.error("Error fetching timesheets:", error);
        } finally {
            setLoading(false);
        }
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
                    const currentTime = moment();
                    const duration = moment.duration(currentTime.diff(clockInTime));

                    if (duration.asSeconds() > 0) {
                        totalTime = duration.asMinutes();
                    }
                }
            } else {
                // Check if there is any Break Out transaction (transactionType === 4)
                const hasBreakOut = transactions.some(transaction => transaction.transactionType === 2);

                // If there is no Break Out transaction, calculate time till the current time
                if (!hasBreakOut) {
                    const earliestTransaction = moment(transactions[0].transactionDateTime);
                    const currentTime = moment();
                    const duration = moment.duration(currentTime.diff(earliestTransaction));

                    if (duration.asSeconds() > 0) {
                        totalTime = duration.asMinutes();
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

                        title={t('Team')}
                    />

                    <ScrollView contentContainerStyle={styles.container}>
                        <View>

                            <View style={styles.greyContainer}>
                                <View style={styles.profileRow}>
                                    <Image source={{ uri: userProfile }} style={styles.profileImage} />
                                    <Text style={styles.userName}>{userName}</Text>
                                </View>
                            </View>


                        </View>

                        {/* Google Map */}
                        {location && (
                            <View style={{ borderRadius: 8, overflow: 'hidden', marginBottom: 20 }}>
                                <MapView
                                    style={{ height: 200 }}
                                    initialRegion={{
                                        latitude: location.latitude,
                                        longitude: location.longitude,
                                        latitudeDelta: 0.09,
                                        longitudeDelta: 0.09,
                                    }}
                                >
                                    <Marker coordinate={location} />
                                </MapView>
                            </View>
                        )}

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
                                            const isLastTransaction = idx === sortedTransactions.length - 1; // Check if this is the last transaction
                                            const hideLine = isLastTransaction && transaction.transactionType === 2;
                                            const { action, color } = getTransactionDetails(transaction.transactionType);
                                            return (
                                                <View key={idx} style={styles.transactionRow}>
                                                    <View style={styles.verticalLineContainer}>
                                                        <View style={[styles.circle, { backgroundColor: color }]} />

                                                        {!hideLine && <View style={styles.verticalLine} />}
                                                    </View>
                                                    <View style={styles.transactionDetails}>
                                                        <View style={styles.transactionDetailsRow}>
                                                            <Text style={styles.actionText}>{action}</Text>
                                                            <Text style={styles.timeText}>{moment(transaction.transactionDateTime).format('hh:mm A')}</Text>
                                                        </View>
                                                        <Text style={styles.addressText}>{transaction.address}</Text>



                                                        <Text >{ }</Text>

                                                    </View>
                                                </View>
                                            );
                                        })}
                                    </View>
                                );
                            })
                        ) : (
                            <View style={styles.noDataContainer}>
                                <Text style={styles.noDataText}>No timesheet data available .</Text>
                            </View>
                        )}



                    </ScrollView>
                </>
            )}
        </SafeAreaView>
    );
};

export default Team;
