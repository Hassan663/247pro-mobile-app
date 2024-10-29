// @app
import React, {
    useEffect,

    useState,
} from 'react';
import {

    SafeAreaView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import moment from 'moment-timezone';
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { AlphabetList } from 'react-native-section-alphabet-list';
import { RFPercentage, } from 'react-native-responsive-fontsize';
import { styles } from './time-card.style';
import { useDispatch, useSelector } from 'react-redux';
import { ALPHABET_SIZE, platform, } from '../../../../../utilities/constants';
import ProjectBottomSheet from '../../../../../core/components/projects-bottomsheet';
import BottomSheetDateTimePicker from '../../../../../core/components/bottomSheet';
import Loader from '../../../../../core/components/loader.component';
import { ProjectListViewModel } from '../../../../../core/modals/project.modal';
import { TimesheetTransactionViewModel } from '../../../../../core/modals/timecard.modal';
import { getCurrentTimesheetApi } from '../../../../../core/http-services/apis/application-api/timecard-api/member.service';
import { useLocation } from '../../../../../core/helpers/geo-location/useLocation';
import { breakInAction, breakOutAction, clockInAction, clockOutAction, getMembersByTimesheetAction, getProjectsByRadiusAction } from '../../../../../store/action/action';
import { CompanyList, CustomSectionHeader } from '../../../contact-screens/new-contact/new-contact-component';
import { formatDate, formatTime } from '../call-back';
import { centralStyle } from '../../../../../styles/constant.style';
import { changeRoute } from '../../../../../core/helpers/async-storage';
import AppHeader from '../../../../../core/components/app-headers';
import Colors from '../../../../../styles/colors';
import Button from '../../../../../core/components/button.component';
import { LOADER } from '../../../../../store/constant/constant';
import { Dispatch } from 'redux';

const TimeCard: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const dispatch: Dispatch<any> = useDispatch();

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState<any>(null);
    const { location, areaDetails, error, fetchLocation } = useLocation();
     const [loading, setLoading] = useState(true);

    const [startDate, setStartDate] = useState('');

    const [endDate, setEndDate] = useState('');
    const { timesheetMembers, } = useSelector((state) => state.root);
    const [currentTimesheet, setCurrentTimesheet] = useState<any>(null);
    const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
    const [currentProjects, setCurrentProjects] = useState<ProjectListViewModel[]>([]);
    const [timesheetData, settimeSheetData] = useState(null);
    const [secondBottomSheetOpen, setSecondBottomSheetOpen] = useState(false);
    const [thirdBottomSheetOpen, setThirdBottomSheetOpen] = useState(false);

    const [showDropdown, setShowDropdown] = useState(false);

    const loader = useSelector((state: any) => state.root.loader);



    useEffect(() => {
        dispatch({ type: LOADER, payload: true });
        const initializeData = async () => {
            
            try {
                dispatch({ type: LOADER, payload: true });

                if (location?.latitude && location?.longitude && areaDetails) {
                    console.log('Location:', location.latitude, location.longitude);
                    console.log('Location:', location);
                    console.log('Area Details in timecaed:', areaDetails);
                } else {
                    console.warn('Location details are missing or incomplete.');
                    return;
                }

                const startDateFormatted = moment().startOf('day').format('YYYY-MM-DDTHH:mm:ssZ');
                const endDateFormatted = moment().endOf('day').format('YYYY-MM-DDTHH:mm:ssZ');

                console.log("Start Date (0 hour):", startDateFormatted);
                console.log("End Date (24 hour):", endDateFormatted);

                setStartDate(startDateFormatted);
                setEndDate(endDateFormatted);

                await fetchDataAndProjects(location.latitude, location.longitude, startDateFormatted, endDateFormatted);
            } catch (error) {
                console.error('Error initializing data:', error);
            } finally {
                dispatch({ type: LOADER, payload: false }); ;
            }
        };

        // Only call initializeData if location is available
        if (location) {
            initializeData();
        }
    }, [location]);


    const fetchDataAndProjects = async (latitude, longitude, startDate, endDate) => {
        dispatch({ type: LOADER, payload: true }); 
        try {
            await Promise.all([
                fetchProjectsByRadius(latitude, longitude),
                fetchData(startDate, endDate)
            ]);
            dispatch({ type: LOADER, payload: false }); 
        } catch (error) {
            dispatch({ type: LOADER, payload: false }); 
            console.error('Error fetching data and projects:', error);
        }
    };

    const fetchProjectsByRadius = async (latitude: number, longitude: number) => {
        dispatch({ type: LOADER, payload: true }); 
        try {
             const projectsResponse = await dispatch(getProjectsByRadiusAction(31.4581, 74.3744, 5));


            // const projectsResponse = await dispatch(getProjectsByRadiusAction(latitude, longitude, 5));
            console.log("Fetching projects with location:", areaDetails, latitude, longitude);

            if (projectsResponse && projectsResponse.length > 0) {
                setCurrentProjects(projectsResponse);
            } else {
                setCurrentProjects([]);
                console.warn("No projects found.");
            }

            // Update timesheetData based on location
            settimeSheetData({
                id: '00000000-0000-0000-0000-000000000000',
                transactionType: 1,
                transactionDateTime: moment().format('YYYY-MM-DDTHH:mm:ssZ'),
                latitude,
                longitude,
                address: areaDetails,
            });
            dispatch({ type: LOADER, payload: false }); 
        } catch (error) {
            dispatch({ type: LOADER, payload: false }); 
            console.error('Error fetching projects:', error);
        }
    };

    const fetchData = async (startDate, endDate) => {
        
        try {
            dispatch({ type: LOADER, payload: true }); 
            

            try {
                // dispatch({ type: LOADER, payload: true }); 
                const membersResponse = await dispatch(getMembersByTimesheetAction(startDate, endDate));
                if (membersResponse) {
                    console.log("Members Response: ", membersResponse);
                } else {
                    console.warn("No members found for the given timesheet.");
                }
                // dispatch({ type: LOADER, payload: false }); 
            } catch (membersError) {
                // dispatch({ type: LOADER, payload: false }); 
                console.error('Error fetching members by timesheet:', membersError);
            }

            try {
                // dispatch({ type: LOADER, payload: true }); 
                const timesheetResponse = await dispatch(getCurrentTimesheetApi());
                if (timesheetResponse?.statusCode === 200) {
                    setCurrentTimesheet(timesheetResponse.data);
                    calculateTimeDifference(timesheetResponse.data);
                    // dispatch({ type: LOADER, payload: false }); 
                } else if (timesheetResponse?.statusCode === 203) {
                    setCurrentTimesheet(null);
                    setTime(0);
                    // dispatch({ type: LOADER, payload: false }); 
                } else {
                    // dispatch({ type: LOADER, payload: false }); 
                    console.warn('Unexpected response while fetching timesheet:', timesheetResponse);
                }
            } catch (error) {
                // dispatch({ type: LOADER, payload: false }); 
                console.error('Error fetching timesheet:', error);
            }

        } catch (error) {
            console.error('Error in fetchData:', error);
        } finally {
            dispatch({ type: LOADER, payload: false }); ;
        }
    };



    const calculateTimeDifference = (timesheetResponse: any) => {
        dispatch({ type: LOADER, payload: true }); ; // Start loading at the beginning
        try {
            const timesheetTransactions = timesheetResponse.timesheetTransactions;
            const currentTime = moment();  // Get the current time
    
            if (!timesheetTransactions || timesheetTransactions.length === 0) {
                console.error('No timesheet transactions found.');
                return;
            }
    
            // Handle Break In (TransactionType: 3) & status 10 logic for BottomSheet
            const breakInTransaction = timesheetTransactions.find(t => t.transactionType === 3);
            if (breakInTransaction && timesheetResponse.status === 10) {
                const breakInTime = moment(breakInTransaction.transactionDateTime);
                const diffInMinutes = currentTime.diff(breakInTime, 'minutes');
    
                if (diffInMinutes > 120) {
                    console.log("Opening Break Out BottomSheet");
                    setSecondBottomSheetOpen(true);
                }
            }
    
            // Handle Clock Out (TransactionType: 2) & status 20 logic for BottomSheet
            const clockOutTransaction = timesheetTransactions.find(t => t.transactionType === 1);
            if (clockOutTransaction && timesheetResponse.status === 20) {
                const clockOutTime = moment(clockOutTransaction.transactionDateTime);
                const diffInMinutes = currentTime.diff(clockOutTime, 'minutes');
    
                if (diffInMinutes > 840) {
                    console.log("Opening Clock Out BottomSheet");
                    setThirdBottomSheetOpen(true);
                }
            }
    
            // Timer Logic: Calculate the time difference between clock in and current time
            const clockInTransaction = timesheetTransactions.find(t => t.transactionType === 1);
            if (clockInTransaction) {
                const clockInTime = moment(clockInTransaction.transactionDateTime);
                const diffInSeconds = currentTime.diff(clockInTime, 'seconds'); // Time difference in seconds
    
                console.log("Clock In Time Difference (Seconds):", diffInSeconds);
    
                // Set the time in seconds and ensure the timer is running
                setTime(diffInSeconds);
                setIsRunning(true);
            } else {
                console.error("No clock-in transaction found.");
            }
        } catch (error) {
            console.error('Error calculating time difference:', error);
        } finally {
            dispatch({ type: LOADER, payload: false }); ; // Stop loading after calculations
        }
    };


    useEffect(() => {
        if (isRunning) {
            const id = setInterval(() => {
                setTime(prevTime => prevTime + 1); // Increment timer every second
            }, 1000); // Update every 1 second
            setIntervalId(id);

            // Cleanup interval on component unmount or when timer stops
            return () => clearInterval(id);
        }
    }, [isRunning]);




    const renderButtons = () => {
        
        if (!currentTimesheet) {

            return (
                <View style={styles.buttonRowContainer}>
                    <View style={styles.buttonFullWidth}>
                        <Button disable={false} title='Clock In' callBack={handleClockIn} customBackgroundColor="#FB9411" primary={true} customTextColor='white' />
                    </View>
                    <View style={styles.buttonFullWidth}>
                        <Button
                            disable={true}
                            title={t('Clock Out')}
                            // callBack={() => handleClockOut()}
                            secondary
                            customBackgroundColor="#FFFFFF"
                            customTextColor='#9E9E9E'
                            customStyle={{
                                borderWidth: 1,
                                borderColor: '#9E9E9E',
                                borderRadius: 8,
                            }}
                        />

                    </View>
                </View>
            );
        }
        
        
        switch (currentTimesheet.status) {
            case 5:
                return (
                    <View style={styles.buttonRowContainer}>
                        <View style={styles.buttonFullWidth}>
                            <Button disable={false} title={t('ClockIn')} callBack={handleClockIn} primary customBackgroundColor="#2196F3" />
                        </View>
                        <View style={styles.buttonFullWidth}>
                            <Button
                                disable={true}
                                title={t('Clock Out')}
                                // callBack={() => handleClockOut()}
                                secondary
                                customBackgroundColor="#FFFFFF"
                                customTextColor='#B00020'
                                customStyle={{
                                    borderWidth: 1,
                                    borderColor: '#9E9E9E',
                                    borderRadius: 8,
                                }}
                            />
                        </View>
                    </View>
                );
            case 10:
                return (
                    <View style={styles.buttonRowContainer}>
                        <View style={styles.buttonFullWidth}>
                            <Button disable={false} title={t('BreakOut')} callBack={() => handleBreakOut()} primary customBackgroundColor="#4CAF50" />
                        </View>
                        <View style={styles.buttonFullWidth}>
                            <Button
                                disable={false}
                                title={t('ClockOut')}
                                // callBack={() => handleClockOut()}
                                secondary
                                customBackgroundColor="#FFFFFF"
                                customTextColor='#9E9E9E'
                                customStyle={{
                                    borderWidth: 1,
                                    borderColor: '#B0B0B0',
                                    borderRadius: 8,
                                }}
                            />
                        </View>
                    </View>
                );
            case 20:
                return (
                    <View style={styles.buttonRowContainer}>
                        <View style={styles.buttonFullWidth}>
                            <Button disable={false} title={t('BreakIn')} callBack={handleBreakIn} primary customBackgroundColor="#2196F3" />
                        </View>
                        <View style={styles.buttonFullWidth}>
                            <Button
                                disable={false}
                                title={t('ClockOut')}
                                callBack={() => handleClockOut()}
                                secondary
                                customBackgroundColor="#FFFFFF"
                                customTextColor='#FB9411'
                                customStyle={{
                                    borderWidth: 1,
                                    borderColor: '#B0B0B0',
                                    borderRadius: 8,
                                }}
                            />
                        </View>
                    </View>
                    
                );
                
            default:
                return null;

               
        }
        
    };



    const formattedData = timesheetMembers ? timesheetMembers.map((member) => ({
        key: member.userId,
        value: member.userName || 'Unknown',
        profile: member.userProfile,
        clockInTime: member.clockInTime,
        clockOutTime: member.clockOutTime,
    })) : [];


    const getCurrentDateInMicrosoftFormat = () => {
        return moment().format('YYYY-MM-DDTHH:mm:ssZ');
    };

    const handleDateAndTime = (selectedDateTime) => {
        console.log("Selected DateTime:", selectedDateTime);
        const extractedDateTime = selectedDateTime.date;
        if (currentTimesheet.status === 10) {

            handleBreakOut(extractedDateTime);
            // setThirdBottomSheetOpen(true);

        } else {
            // Otherwise, call handleClockOut
            handleClockOut(extractedDateTime);
        }

    };


    const handleBreakIn = async () => {
        try {
            dispatch({ type: LOADER, payload: true }); ;
            console.log("setting loading in break in at start", loading);


            if (!currentTimesheet || !currentTimesheet.timesheetTransactions || !currentTimesheet.timesheetTransactions[0]) {
                console.error("No valid timesheet transaction found.");
                dispatch({ type: LOADER, payload: false }); ;
                return;
            }


            if (!location?.latitude || !location?.longitude || !areaDetails) {
                console.error("Location or area details are missing.");
                dispatch({ type: LOADER, payload: false }); ;
                return;
            }


            const timesheetDataBreakIn: TimesheetTransactionViewModel = {
                id: '00000000-0000-0000-0000-000000000000',
                timesheetId: currentTimesheet.id,
                transactionType: 3,
                transactionDateTime: getCurrentDateInMicrosoftFormat(),
                latitude: location.latitude,
                longitude: location.longitude,
                address: areaDetails
            };

            // Ensure timesheet data is complete
            if (!timesheetDataBreakIn.transactionDateTime || !timesheetDataBreakIn.timesheetId) {
                console.error("Required timesheet data is missing.");
                dispatch({ type: LOADER, payload: false }); ; // Stop loading in case of error
                return;
            }

            await dispatch(breakInAction(timesheetDataBreakIn));

            // Fetch the updated timesheet
            const timesheetResponse = await dispatch(getCurrentTimesheetApi());

            if (timesheetResponse && timesheetResponse.statusCode === 200) {
                setCurrentTimesheet(timesheetResponse.data);
            } else {
                setCurrentTimesheet(null);
            }
        } catch (error) {
            console.error('Error in handleBreakIn:', error);
        } finally {
            dispatch({ type: LOADER, payload: false }); ; // Stop loading
            console.log("setting loading in break in at end", loading);
        }
    };



    const handleBreakOut = async (selectedDateTime) => {
        try {
            dispatch({ type: LOADER, payload: true }); ;


            if (!currentTimesheet || !currentTimesheet.timesheetTransactions || !currentTimesheet.timesheetTransactions[0]) {
                console.error("No valid timesheet transaction found.");
                dispatch({ type: LOADER, payload: false }); ;
                return;
            }


            if (!location?.latitude || !location?.longitude || !areaDetails) {
                console.error("Location or area details are missing.");
                dispatch({ type: LOADER, payload: false }); ;
                return;
            }

            const timesheetId = currentTimesheet.id;
            const currentDate = getCurrentDateInMicrosoftFormat();

            // Prepare timesheet data for break out
            const timeSheetDataBreakOut = {
                id: '00000000-0000-0000-0000-000000000000',
                timesheetId: timesheetId,
                transactionType: 4,
                transactionDateTime: selectedDateTime || currentDate,
                latitude: location.latitude,
                longitude: location.longitude,
                address: areaDetails
            };

            await dispatch(breakOutAction(timeSheetDataBreakOut));

            // Fetch the updated timesheet
            const timesheetResponse = await dispatch(getCurrentTimesheetApi());

            if (timesheetResponse && timesheetResponse.statusCode === 200) {
                setCurrentTimesheet(timesheetResponse.data);
            } else {
                setCurrentTimesheet(null);
            }
        } catch (error) {
            console.error('Error during breakOut:', error);
        } finally {
            dispatch({ type: LOADER, payload: false }); ;
        }
    };

    const handleClockOut = async (selectedDateTime) => {
        try {
            dispatch({ type: LOADER, payload: true }); ;
            console.log("setting loading in clock out at start", loading);


            if (!currentTimesheet || !currentTimesheet.timesheetTransactions || !currentTimesheet.timesheetTransactions[0]) {
                console.error("No valid timesheet transaction found.");
                dispatch({ type: LOADER, payload: false }); ;
                return;
            }
            if (!location?.latitude || !location?.longitude || !areaDetails) {
                console.error("Location or area details are missing.");
                dispatch({ type: LOADER, payload: false }); ;
                return;
            }


            const timesheetId = currentTimesheet.id;
            let timesheetDataClockOut = null;
            if (!selectedDateTime) {
                const currentDate = getCurrentDateInMicrosoftFormat();
                timesheetDataClockOut = {
                    id: '00000000-0000-0000-0000-000000000000',
                    timesheetId: timesheetId,
                    transactionType: 2,
                    transactionDateTime: currentDate,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    address: areaDetails
                };
            }
            else {
                timesheetDataClockOut = {
                    id: '00000000-0000-0000-0000-000000000000',
                    timesheetId: timesheetId,
                    transactionType: 2,
                    transactionDateTime: selectedDateTime,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    address: areaDetails
                };
            }





            if (!timesheetDataClockOut.transactionDateTime || !timesheetDataClockOut.timesheetId) {
                console.error("Required timesheet data is missing.");
                dispatch({ type: LOADER, payload: false }); ;
                return;
            }


            await dispatch(clockOutAction(timesheetDataClockOut));


            const timesheetResponse = await dispatch(getCurrentTimesheetApi());
             fetchData(startDate, endDate);
             fetchProjectsByRadius(location.latitude,location.longitude)
            if (timesheetResponse && timesheetResponse.statusCode === 200) {
                setCurrentTimesheet(timesheetResponse.data);
            } else {
                setCurrentTimesheet(null);
            }
            setTime(0);
            setIsRunning(false);
        } catch (error) {
            console.error('Error in handleClockOut:', error);
        } finally {
            dispatch({ type: LOADER, payload: false }); ;
            console.log("setting loading in clock out at end", loading);
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };


    const handleMyReport = () => {
        setShowDropdown(false);
        changeRoute(navigation, "ReportCard")
    };

    const handleClockIn = async () => {
        dispatch({ type: LOADER, payload: true }); ;  // Start loading immediately at the beginning
        try {
            console.log("setting loading in handleClock at start", loading);
    
            const currentDate = getCurrentDateInMicrosoftFormat();
            let newTimesheetData = null;
    
            // Validate location and areaDetails before constructing timesheet data
            if (!location?.latitude || !location?.longitude || !areaDetails) {
                throw new Error("Location or area details are missing.");
            }
    
            // Check if currentTimesheet is valid and contains transactions
            if (currentTimesheet && currentTimesheet.timesheetTransactions && currentTimesheet.timesheetTransactions[0]) {
                newTimesheetData = {
                    id: '00000000-0000-0000-0000-000000000000',
                    transactionType: 1, // Clock In
                    transactionDateTime: currentDate,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    address: areaDetails
                };
            } 
            // Handle case where currentTimesheet is missing or invalid
            else if (!currentTimesheet || (currentTimesheet.statusCode === 203 || currentTimesheet.statusCode === 204)) {
                console.log("Timesheet is either missing or has a status code of 203 or 204");
    
                newTimesheetData = {
                    id: '00000000-0000-0000-0000-000000000000',
                    transactionType: 1, // Clock In
                    transactionDateTime: currentDate,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    address: areaDetails
                };
    
                // This is a backup setting to ensure timesheet data is available for later use
                settimeSheetData(newTimesheetData);
            } else {
                throw new Error("Current timesheet is invalid or missing required data.");
            }
    
            // Ensure required fields are present in the timesheet data
            if (!newTimesheetData.transactionDateTime) {
                console.error("Required timesheet data is missing.");
                return; // Return here; loading will be stopped in `finally` below
            }
    
            settimeSheetData(newTimesheetData); // Update the state with the newly constructed data
    
            // Check if currentProjects is defined and has valid length
            if (currentProjects.length === 1) {
                // Automatically select the first project if there's only one
                await handleProjectSelect(currentProjects[0].id); // Pass the selected project ID directly
            } else if (currentProjects.length > 1) {
                // Open bottom sheet if more than one project is available
                setBottomSheetOpen(true);

            } else {
                // Handle case when no project is available (pass null)
                await handleProjectSelect(null);
            }
        } catch (error) {
            console.error('Error in handleClockIn:', error);
        } finally {
            // Stop loading in all cases after the logic completes
            dispatch({ type: LOADER, payload: false }); ;
            console.log("setting loading in handleClock at end", loading);
        }
    };

    

    const handleProjectSelect = async (projectId) => {
        dispatch({ type: LOADER, payload: true }); ; // Start loading at the beginning
        try {
            setBottomSheetOpen(false);
            console.log("Project selection started with:", timesheetData, projectId);
    
            const currentDate = getCurrentDateInMicrosoftFormat();
    
            // Ensure timesheetData is available before proceeding
            if (!timesheetData) {
                throw new Error('Timesheet data is missing.');
            }
    
            // Set projectId to null if it is not provided
            const selectedProjectId = projectId || null;
    
            // Dispatch clockInAction with the selected project ID (or null)
          await dispatch(clockInAction(timesheetData, currentDate, selectedProjectId));
          const timesheetResponse = await dispatch(getCurrentTimesheetApi());
            
          // Ensure fetchData completes before making further updates
           fetchData(startDate, endDate);
            // Fetch the updated timesheet after clock-in
           
            
            // Check the response and update the state accordingly
            if (timesheetResponse?.data && timesheetResponse?.statusCode === 200) {
               
                setCurrentTimesheet(timesheetResponse.data);
                setTime(0);
                setIsRunning(true);
                // Close the bottom sheet
            } else {
                console.warn("No valid timesheet found or unexpected response status.");
                setCurrentTimesheet(null); // Handle case where no timesheet is returned
            }
    
        } catch (error) {
            console.error('Error in handleProjectSelect:', error.message || error);
        } finally {
            dispatch({ type: LOADER, payload: false }); ; // Stop loading in all cases
            console.log("Project selection process completed.");
        }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            {
                
                 loader ?
                    <View style={styles.loaderContainer}><Loader size={'large'} /></View> 
                    
                    :
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
                                <TouchableOpacity onPress={toggleDropdown} style={{ paddingRight: 12 }}>
                                    <Entypo name="dots-three-vertical" size={20} color={Colors.black} />
                                </TouchableOpacity>
                            }
                            title={t('Timecard')}
                        />

                        <View style={styles.container}>
                            <>
                                {
                                    // loader ? <Loader size={'strong'} /> :
                                         <>
                                             { }
                                            <View style={styles.dateContainer}>
                                                <Text style={styles.date}>{formatDate()}</Text>
                                            </View>
                                            { }
                                            <View style={styles.timerContainer}>
                                                <Text style={styles.timer}>{formatTime(time)}</Text>
                                            </View>
                                            <View style={[centralStyle.my1, styles.timerButtonContainer]}>

                                                <View style={[centralStyle.my1, styles.fullWidthButtonContainer]}>
                                                    {renderButtons()}
                                                </View>
                                            </View>
                                            <View style={[centralStyle.flex1, centralStyle.width100]}>
                                                <View style={centralStyle.px2}>

                                                    <View style={styles.topRowContainer}>
                                                        <Text style={styles.leadingText}>Team</Text>
                                                        <Text style={styles.trailingText}>Today</Text>
                                                    </View>

                                                    <View style={styles.divider} />

                                                    {formattedData.length > 0 ? (
                                                        <AlphabetList
                                                            data={formattedData} //data
                                                            letterListContainerStyle={styles.listContainerStyle}
                                                            showsVerticalScrollIndicator={false}
                                                            sectionHeaderHeight={ALPHABET_SIZE.HEADER_HEIGHT}
                                                            getItemHeight={() => ALPHABET_SIZE.ITEM_HEIGHT}
                                                            indexContainerStyle={{ width: 0 }}
                                                            indexLetterStyle={styles.letterStyle}
                                                            renderCustomItem={(item) => {
                                                                // console.log(item)
                                                                return (
                                                                    <CompanyList callBack={() => changeRoute(navigation, 'Team', { user: item })} item={item} />
                                                                )
                                                            }}
                                                            renderCustomSectionHeader={CustomSectionHeader}
                                                            onEndReachedThreshold={0.1}
                                                        />) : (
                                                        <Text style={styles.noDataText}>No members available</Text>
                                                    )}
                                                </View>
                                            </View>
                                        </>
                                }

                            </>

                            {/* Project Bottom Sheet */}
                            <ProjectBottomSheet
                                isOpen={bottomSheetOpen}
                                onClose={() => setBottomSheetOpen(false)}
                                onSelectProject={handleProjectSelect}  // Handle selected project ID
                                projects={currentProjects}
                            // Pass the current projects to the bottom sheet
                            />

                            {/* Dropdown menu (appears when icon is clicked) */}
                            {showDropdown && (
                                <View style={styles.dropdownMenu}>
                                    <TouchableOpacity onPress={handleMyReport} style={styles.dropdownItem}>
                                        <Text style={styles.dropdownText}>My Report</Text>
                                    </TouchableOpacity>
                                </View>
                            )}


                            {
                                <BottomSheetDateTimePicker
                                    isOpen={secondBottomSheetOpen}
                                    onClose={() => setSecondBottomSheetOpen(false)}
                                    onSave={handleDateAndTime}
                                    title="Edit Breakout Time"
                                    description="You need to confirm the breakout or clock out time. If there's an error, you can adjust the time."
                                />
                            }

                            {
                                <BottomSheetDateTimePicker
                                    isOpen={thirdBottomSheetOpen}
                                    onClose={() => setThirdBottomSheetOpen(false)}
                                    onSave={handleDateAndTime}
                                    title="Edit Clock Out Time"
                                    description="You need to confirm the breakout or clock out time. If there's an error, you can adjust the time."
                                />
                            }

                        </View >

                    </>
            }
        </SafeAreaView >
    );
};

export default TimeCard;
