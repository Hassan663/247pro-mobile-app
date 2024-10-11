// @app
import React, {
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    Alert,
    Image,
    Modal,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import moment from 'moment-timezone';
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ScrollView } from 'react-native-gesture-handler';
import { t } from 'i18next';
import { AlphabetList } from 'react-native-section-alphabet-list';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';



import { Item } from './time-card-component';
// import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './time-card.style';

// import { DATA, data } from './data';
import { useDispatch, useSelector } from 'react-redux';








import { Modalize } from 'react-native-modalize';

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
// import ProjectBottomSheet from '../../../../core/components/projects-bottomsheet';

const TimeCard: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [selectedTab, setSelectedTab] = useState(t('timecard'));
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState<any>(null);
    const { location, areaDetails, error } = useLocation();

    const [loading, setLoading] = useState(true);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { timesheetMembers, } = useSelector((state) => state.root);
    const [currentTimesheet, setCurrentTimesheet] = useState<any>(null);
    const [bottomSheetOpen, setBottomSheetOpen] = useState(false); // State to control bottom sheet visibility
    const [currentProjects, setCurrentProjects] = useState<ProjectListViewModel[]>([]);
    const [timesheetData, settimeSheetData] = useState<any>(null);
    const [secondBottomSheetOpen, setSecondBottomSheetOpen] = useState(false);
    const [thirdBottomSheetOpen, setThirdBottomSheetOpen] = useState(false);
    const modalizeRef = useRef<Modalize>(null);
    const [showDropdown, setShowDropdown] = useState(false);


    
    useEffect(() => {
        if (location) {
          console.log('Location:', location.latitude);
          
        }
        if (areaDetails) {
          console.log('Area Details:', areaDetails);
        }
      }, [location, areaDetails]);
   
      useEffect(() => {
        // Whenever location is updated, fetch projects if location is available
        if (location && location.latitude && location.longitude) {
            fetchProjectsByRadius(location.latitude, location.longitude);
        }
    }, [location]); 
    useEffect(() => {
        setLoading(true);
        // Start of today (0 hour) with Microsoft format and timezone
        const startDate = moment().startOf('day').format('YYYY-MM-DDTHH:mm:ssZ');
        
        // End of today (23:59:59) with Microsoft format and timezone
        const endDate = moment().endOf('day').format('YYYY-MM-DDTHH:mm:ssZ');
    
        // Log the start and end dates for debugging
        console.log("Start Date (0 hour):", startDate);
        console.log("End Date (24 hour):", endDate);
    
        // Update state with formatted start and end date
        setStartDate(startDate);
        setEndDate(endDate);
    
        // Execute your functions after setting the start and end dates
        getLocation();
        fetchData(startDate, endDate);
    }, []);

    const getLocation = async () => {
        try {
            const loc = await useLocation();  // Await the resolved location
            console.log('Location fetched in get Location:', loc);  // Now you can use lat and long here
        } catch (err) {
            console.error('Error fetching location:', err);
        }
    };
    const fetchProjectsByRadius = async (latitude: number, longitude: number) => {
        try {
            setLoading(true); // Start loading indicator

            console.log("Fetching projects with location:", latitude, longitude);

            const projectsResponse = await dispatch(getProjectsByRadiusAction(latitude, longitude, 5)); // Assuming a radius of 5 km
            if (projectsResponse) {
                setCurrentProjects(projectsResponse); // Save the response into the state
            } else {
                console.log("No projects found.");
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };
    const fetchData = async (startDate: string, endDate: string) => {
        try {
            setLoading(true); // Start loading indicator

            // Fetch members by timesheet and handle errors independently
            try {
                const membersResponse = await dispatch(getMembersByTimesheetAction(startDate, endDate));
                console.log("Members Response: ", membersResponse);
            } catch (membersError) {
                console.error('Error fetching members by timesheet:', membersError);
            }



            try {
                setLoading(true);
                const timesheetResponse = await dispatch(getCurrentTimesheetApi());
                if (timesheetResponse && timesheetResponse.statusCode === 200) {
                    setCurrentTimesheet(timesheetResponse.data);
                    calculateTimeDifference(timesheetResponse.data);
                }
                else if (timesheetResponse.statusCode === 203) {
                    setCurrentTimesheet(null);
                    setTime(0);
                }
            } catch (error) {
                console.error('Error fetching timesheet:', error);
            } finally {
                setLoading(false);
            }


            // try {
                
            //     console.log("The fuck is ",location.latitude, location.longitude )
            //     const projectsResponse = await dispatch(getProjectsByRadiusAction(location.latitude, location.longitude,5));
            //     console.log("Fetched Projects: ", projectsResponse);

            //     // Update the state with the fetched projects
            //     if (projectsResponse) {
            //         setCurrentProjects(projectsResponse); // Save the response into the state
            //     } else {
            //         console.log("No projects found.");
            //     }
            // } catch (projectsError) {
            //     console.error('Error fetching projects:', projectsError);
            // }

        } catch (error) {
            console.error('Error in fetchData: ', error);
        } finally {
            setLoading(false);
        }
    };



    const calculateTimeDifference = (timesheetResponse: any) => {
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
    };


    useEffect(() => {
        if (isRunning) {
            const id = setInterval(() => {
                setTime(prevTime => prevTime + 1); // Increment timer every second
            }, 1000); // Update every 1 second
            setIntervalId(id);
        } else if (intervalId) {
            clearInterval(intervalId); // Clear interval if not running
        }
        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [isRunning]);




    
    const renderButtons = () => {
        if (!currentTimesheet) {
           
            return (
                <View style={styles.buttonRowContainer}>
                    <View style={styles.buttonFullWidth}>
                        <Button disable={false} title={t('Clock In')} callBack={handleClockIn} customBackgroundColor="#FB9411" primary={true} customTextColor='white' />
                    </View>
                    <View style={styles.buttonFullWidth}>
                        <Button
                            disable={true}
                            title={t('Clock Out')}
                            callBack={() => handleClockOut()}
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
                                callBack={() => handleClockOut()}
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
                            <Button disable={false} title={t('BreakOut')}  callBack={() => handleBreakOut()} primary customBackgroundColor="#4CAF50" />
                        </View>
                        <View style={styles.buttonFullWidth}>
                        <Button
                                disable={false}
                                title={t('ClockOut')}
                                callBack={() => handleClockOut()}
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


    // Format the data to the structure required by AlphabetList
    const formattedData = timesheetMembers ? timesheetMembers.map((member) => ({
        key: member.userId,
        value: member.userName || 'Unknown', // In case userName is missing
        profile: member.userProfile,
        clockInTime: member.clockInTime,
        clockOutTime: member.clockOutTime,
    })) : [];

    // Function to get the current date in Microsoft DateTime format
    const getCurrentDateInMicrosoftFormat = () => {
        return moment().format('YYYY-MM-DDTHH:mm:ssZ');
    };

    const handleDateAndTime = (selectedDateTime) => {
        console.log("Selected DateTime:", selectedDateTime);
        const extractedDateTime = selectedDateTime.date;
        if (currentTimesheet.status === 10) {
          // If status is 10, call handleBreakOut
          handleBreakOut(extractedDateTime);
          setThirdBottomSheetOpen(true);
          
        } else {
          // Otherwise, call handleClockOut
          handleClockOut(extractedDateTime);
        }
        
      };


    const handleBreakIn = async () => {
        try {
            setLoading(true); // Start loading
            console.log("setting loading in break in at start", loading);

            // Check if the current timesheet and its transactions are valid
            if (!currentTimesheet || !currentTimesheet.timesheetTransactions || !currentTimesheet.timesheetTransactions[0]) {
                console.error("No valid timesheet transaction found.");
                setLoading(false); // Stop loading if there's an error
                return;
            }

            // Get the necessary data from the timesheet
            const timesheetTransactionId = currentTimesheet.timesheetTransactions[0].id;
            const timesheetId = currentTimesheet.id;
            const currentDate = getCurrentDateInMicrosoftFormat();

            // Prepare the timesheet data
            const timesheetDataBreakIn: TimesheetTransactionViewModel = {
                 id: '00000000-0000-0000-0000-000000000000',
                timesheetId: timesheetId,
                transactionType: 3, // Break In
                transactionDateTime: currentDate,
                latitude: location.latitude, // Hardcoded
                longitude: location.longitude, // Hardcoded
                address: areaDetails// Hardcoded
            };

            // Ensure the timesheet data is complete
            if (!timesheetDataBreakIn.transactionDateTime || !timesheetDataBreakIn.timesheetId || !timesheetDataBreakIn.id) {
                console.error("Required timesheet data is missing.");
                setLoading(false); // Stop loading if there's an error
                return;
            }


            await dispatch(breakInAction(timesheetDataBreakIn));


            const timesheetResponse = await dispatch(getCurrentTimesheetApi());
            if (timesheetResponse && timesheetResponse.statusCode === 200) {
                setCurrentTimesheet(timesheetResponse.data);
            } else {
                setCurrentTimesheet(null);
            }
        } catch (error) {
            console.error('Error in handleBreakIn:', error);
        } finally {
            setLoading(false);
            console.log("setting loading in break in at end", loading);
        }
    };




    const handleBreakOut = async (selectedDateTime) => {
        try {
            setLoading(true);

            if (!currentTimesheet || !currentTimesheet.timesheetTransactions || !currentTimesheet.timesheetTransactions[0]) {
                console.error("No valid timesheet transaction found.");
                setLoading(false); // Stop loading on error
                return;
            }

            // const timesheetTransactionId = currentTimesheet.timesheetTransactions[0].id;
            const timesheetId = currentTimesheet.id;
            let timeSheetDataBreakOut = null;
            if (!selectedDateTime){
                const currentDate =getCurrentDateInMicrosoftFormat();
                timeSheetDataBreakOut = {
                    id: '00000000-0000-0000-0000-000000000000',
                    timesheetId: timesheetId,
                    transactionType: 4,
                    transactionDateTime: currentDate,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    address: areaDetails
                };
    
            }
            else{
                timeSheetDataBreakOut = {
                    id: '00000000-0000-0000-0000-000000000000',
                    timesheetId: timesheetId,
                    transactionType: 4,
                    transactionDateTime: selectedDateTime,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    address: areaDetails
                };
    
            }
           
            



            await dispatch(breakOutAction(timeSheetDataBreakOut));


            const timesheetResponse = await dispatch(getCurrentTimesheetApi());
            if (timesheetResponse && timesheetResponse.statusCode === 200) {
                setCurrentTimesheet(timesheetResponse.data);
            } else {
                setCurrentTimesheet(null);
            }
        } catch (error) {
            console.error('Error during breakOut:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClockOut = async (selectedDateTime) => {
        try {
            setLoading(true);  // Start loading
            console.log("setting loading in clock out at start", loading);

            // Validate the current timesheet and its transactions
            if (!currentTimesheet || !currentTimesheet.timesheetTransactions || !currentTimesheet.timesheetTransactions[0]) {
                console.error("No valid timesheet transaction found.");
                setLoading(false); // Stop loading in case of error
                return;
            }

            // Extract necessary data from the current timesheet
            // const timesheetTransactionId = currentTimesheet.timesheetTransactions[0].id;
            const timesheetId = currentTimesheet.id;
            let timesheetDataClockOut = null;
            if (!selectedDateTime){
                const currentDate =getCurrentDateInMicrosoftFormat();
                timesheetDataClockOut = {
                    id: '00000000-0000-0000-0000-000000000000',
                    timesheetId: timesheetId,
                    transactionType: 2, // BreakOut transaction type
                    transactionDateTime: currentDate,
                    latitude: location.latitude, // Hardcoded
                    longitude: location.longitude, // Hardcoded
                    address: areaDetails// Hardcoded
                };
            }
            else{
                timesheetDataClockOut = {
                    id: '00000000-0000-0000-0000-000000000000',
                    timesheetId: timesheetId,
                    transactionType: 2, // BreakOut transaction type
                    transactionDateTime: selectedDateTime,
                    latitude: location.latitude, // Hardcoded
                    longitude: location.longitude, // Hardcoded
                    address: areaDetails// Hardcoded
                };
            }
            

             

            // Ensure the timesheet data is complete
            if (!timesheetDataClockOut.transactionDateTime || !timesheetDataClockOut.timesheetId) {
                console.error("Required timesheet data is missing.");
                setLoading(false); // Stop loading in case of error
                return;
            }

            // Dispatch the clockOutAction
            await dispatch(clockOutAction(timesheetDataClockOut));  // Wait for the dispatch to complete

            // Optionally refresh the current timesheet data
            const timesheetResponse = await dispatch(getCurrentTimesheetApi());
            if (timesheetResponse && timesheetResponse.statusCode === 200) {
                setCurrentTimesheet(timesheetResponse.data);
            } else {
                setCurrentTimesheet(null); // Handle case where no timesheet is returned
            }
            setTime(0);
            setIsRunning(false);
        } catch (error) {
            console.error('Error in handleClockOut:', error);
        } finally {
            setLoading(false);  // Stop loading in the finally block to ensure it always runs
            console.log("setting loading in clock out at end", loading);
        }
    };
    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Function to navigate to the Report screen
    const handleMyReport = () => {
        setShowDropdown(false);
        changeRoute(navigation, "ReportCard")
    };




    const handleClockIn = async () => {
        try {
            setLoading(true);  // Start loading
            console.log("setting loading in handleClock at start", loading);

            const currentDate = getCurrentDateInMicrosoftFormat();
            let newTimesheetData = null;

            // Prepare the timesheet data based on the current timesheet
            if (currentTimesheet && currentTimesheet.timesheetTransactions && currentTimesheet.timesheetTransactions[0]) {
                const timesheetTransactionId = currentTimesheet.timesheetTransactions[0].id;
                const timesheetId = currentTimesheet.id;

                // Construct the timesheet data
                newTimesheetData = {
                    id: '00000000-0000-0000-0000-000000000000',
                    timesheetId: timesheetId,
                    transactionType: 1, // Assuming ClockIn
                    transactionDateTime: currentDate,
                    latitude: location.latitude, // Hardcoded
                    longitude: location.longitude, // Hardcoded
                    address: areaDetails
                };
            } else if (!currentTimesheet || (currentTimesheet.statusCode === 203 || currentTimesheet.statusCode === 204)) {
                console.log("Status code 204");

                // Handle case where timesheet is empty or status code is 203 or 204
                newTimesheetData = {
                    transactionType: 1, // Assuming ClockIn
                    transactionDateTime: currentDate,
                    latitude: location.latitude, // Hardcoded
                    longitude: location.longitude, // Hardcoded
                    address: areaDetails// Hardcoded
                };
            } else {
                console.error("Current timesheet is invalid or missing required data.");
                setLoading(false);  // Stop loading in case of error
                return;
            }

            // Ensure required fields are present in the timesheet data
            if (!newTimesheetData.transactionDateTime) {
                console.error("Required timesheet data is missing.");
                setLoading(false);  // Stop loading in case of error
                return;
            }

            // Update the timesheetData in the global state
            settimeSheetData(newTimesheetData);  // Update the state with the timesheet data

            // Check if currentProjects is defined and has valid length
            if (currentProjects.length === 1) {
                console.log("gggggggg")
                // Automatically select the first project if there's only one
                handleProjectSelect(currentProjects[0].id); // Pass the selected project ID directly
            } else if (currentProjects.length > 1) {
                console.log("gghhhhhhhgggggg")
                // Open bottom sheet if more than one project is available
                setBottomSheetOpen(true);
            } else {
                console.log("No projects available.");
                Alert.alert("No Project Available")
            }

        } catch (error) {
            console.error('Error in handleClock:', error);
        } finally {
            setLoading(false);  // Stop loading in the finally block to ensure it always runs
            console.log("setting loading in handleClock at end", loading);
        }
    };

    // Function to handle project selection from bottom sheet
    const handleProjectSelect = async (projectId) => {
        try {
            setLoading(true); // Start the loading state
            console.log("Project selection started with: ", timesheetData, projectId);

            const currentDate = getCurrentDateInMicrosoftFormat();

            // Ensure the timesheetData is up-to-date and available globally
            if (!timesheetData) {
                console.error('Timesheet data is missing.');
                setLoading(false);
                return;
            }

            // Dispatch clockInAction with the selected project ID
            await dispatch(clockInAction(timesheetData, currentDate, projectId)); // Wait for clockInAction to complete

            // Fetch the updated timesheet after clock-in
            const timesheetResponse = await dispatch(getCurrentTimesheetApi());
            if (timesheetResponse && timesheetResponse.statusCode === 200) {
                setCurrentTimesheet(timesheetResponse.data); // Update the currentTimesheet state
            } else {
                setCurrentTimesheet(null); // Handle case where no timesheet is returned
            }
            setTime(0); // Reset timer to 0
            setIsRunning(true); // Start the timer

            setBottomSheetOpen(false); // Close the bottom sheet after selecting
        } catch (error) {
            console.error('Error in handleProjectSelect:', error); // Handle any errors
        } finally {
            setLoading(false); // Stop the loading state
            console.log("Project selection completed.");
        }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            {
                loading ?
                    <View style={styles.loaderContainer}><Loader size={'large'} /></View> :
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
                                    loading ? <Loader size={'strong'} /> :
                                        <>
                                            {}
                                            <View style={styles.dateContainer}>
                                                <Text style={styles.date}>{formatDate()}</Text>
                                            </View>
                                            {}
                                            <View style={styles.timerContainer}>
                                                <Text style={styles.timer}>{formatTime(time)}</Text>
                                            </View>
                                            <View style={[centralStyle.my1, styles.timerButtonContainer]}>
                                                {}
                                                <View style={[centralStyle.my1, styles.fullWidthButtonContainer]}>
                                                    {renderButtons()}
                                                </View>
                                            </View>
                                            <View style={[centralStyle.flex1, centralStyle.width100]}>
                                                <View style={centralStyle.px2}>

                                                    <View style={styles.topRowContainer}>
                                                        <Text style={styles.leadingText}>Teams</Text>
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
