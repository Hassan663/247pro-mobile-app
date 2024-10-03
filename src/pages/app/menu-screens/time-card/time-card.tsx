// @app
import React, {
    useEffect,
    useRef,
    useState,
} from 'react';
import {
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

import AppHeader from '../../../../core/components/app-headers';
import Button from '../../../../core/components/button.component';
import Colors from '../../../../styles/colors';
import { Item } from './time-card-component';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './time-card.style';
import { platform } from '../../../../utilities';
import { DATA, data } from './data';
import { useDispatch, useSelector } from 'react-redux';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { ALPHABET_SIZE } from '../../../../utilities/constants';
import {
    centralStyle,
    windowHeight,
} from '../../../../styles/constant.style';
import {
    formatDate,
    formatTime
} from './call-back';
import {
    CompanyList,
    CustomSectionHeader
} from '../../contact-screens/new-contact/new-contact-component';
import { breakInAction, breakOutAction, clockInAction, clockOutAction, getCurrentTimesheetAction, getMembersByTimesheetAction, getProjectsByRadiusAction, getTimesheetsForCurrentUserAction, updateTimesheetAction } from '../../../../store/action/action';
import { useLocation } from '../../../../core/helpers/geo-location/useLocation';
import { getCurrentTimesheetApi } from '../../../../core/http-services/apis/application-api/timecard-api/member.service';
import { TimesheetTransactionViewModel } from '../../../../core/modals/timecard.modal';
import { ProjectListViewModel } from '../../../../core/modals/project.modal';

import Loader from '../../../../core/components/loader.component';
import BottomSheetDateTimePicker from '../../../../core/components/bottomSheet';
import { Modalize } from 'react-native-modalize';
import ProjectBottomSheet from '../../../../core/components/projects-bottomsheet';
// import ProjectBottomSheet from '../../../../core/components/projects-bottomsheet';

const TimeCard: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [selectedTab, setSelectedTab] = useState(t('timecard'));
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState<any>(null);
    const [breakIn, setbreakIn] = useState(false);
    const currentUserProfile = useSelector((state: any) => state.root.currentUserProfile);
    const { location, error, fetchLocation } = useLocation();

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
    const modalizeRef = useRef<Modalize>(null);
    const [selectedDateTime, setSelectedDateTime] = useState('');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const handleSaveDateTime = (dateTime) => {
        setSelectedDateTime(dateTime);
        console.log('Selected DateTime:', dateTime);
    };
    //  const [currentProjects, setCurrentProjects] = useState([]); 
    // const loader = useSelector((state: any) => state.root.loader);
    // Function to format the date in Microsoft format
    const getMicrosoftFormattedDate = (date: any) => {
        return moment(date).format('YYYY-MM-DD');
    };


    useEffect(() => {
        // Set startDate to yesterday and endDate to today in the desired format
        const today = getMicrosoftFormattedDate(moment());
        const yesterday = getMicrosoftFormattedDate(moment().subtract(1, 'days'));

        setStartDate(yesterday);
        setEndDate(today);
        //fetchLocation();
        //dispatch(clockInAction(timesheetData,timeZone,projectId));
        //dispatch(clockOutAction(timesheetData));
        //dispatch(breakInAction(timesheetData));
        //dispatch(breakOutAction(timesheetData));

        //dispatch(getMembersByTimesheetAction('2024-09-01', '2024-09-30'));
        //dispatch(getTimesheetByUserAction('user-id-here', '2024-09-01', '2024-09-30', 1));
        //dispatch(getCurrentTimesheetAction());
        //dispatch(getTimesheetsForCurrentUserAction(startDate, endDate));
        //dispatch(updateTimesheetAction(timesheetId, timesheetData));

        // Fetch data with the calculated startDate and endDate
        fetchData(yesterday, today);

    }, []);



    const fetchData = async (startDate: string, endDate: string) => {
        try {
            setLoading(true); // Start loading indicator

            // Fetch members by timesheet and handle errors independently
            try {
                const membersResponse = await dispatch(getMembersByTimesheetAction(startDate, startDate));
                console.log("Members Response: ", membersResponse);
            } catch (membersError) {
                console.error('Error fetching members by timesheet:', membersError);
            }

            // Fetch current timesheet data and handle errors independently
            try {
                const timesheetResponse = await dispatch(getCurrentTimesheetApi());

                // Log the response using JSON.stringify to show the complete structure
                console.log("Current Timesheet: ", JSON.stringify(timesheetResponse, null, 2));

                if (timesheetResponse && timesheetResponse.statusCode === 200) {
                    // Set the current timesheet in state
                    setCurrentTimesheet(timesheetResponse.data);

                    // Log the full timesheet transactions array to verify it's being stored properly
                    console.log("Timesheet Transactions: ", JSON.stringify(timesheetResponse.data.timesheetTransactions, null, 2));
                    // Calculate time difference
                    calculateTimeDifference(timesheetResponse.data);
                } else if (timesheetResponse.statusCode === 203) {
                    setCurrentTimesheet(null); // No timesheet found
                    setTime(0); // Reset timer
                }
            } catch (timesheetError) {
                console.error('Error fetching current timesheet:', timesheetError);
            }

            // Fetch projects based on location radius and handle errors independently
            try {
                const projectsResponse = await dispatch(getProjectsByRadiusAction(31.4733203, 74.3786827, 5));
                console.log("Fetched Projects: ", projectsResponse);

                // Update the state with the fetched projects
                if (projectsResponse) {
                    setCurrentProjects(projectsResponse); // Save the response into the state
                } else {
                    console.log("No projects found.");
                }
            } catch (projectsError) {
                console.error('Error fetching projects:', projectsError);
            }

        } catch (error) {
            console.error('Error in fetchData: ', error);
        } finally {
            setLoading(false); // Stop loading indicator
        }
    };


    const calculateTimeDifference = (timesheetResponse: any) => {
        const timesheetTransactions = timesheetResponse.timesheetTransactions;

        if (!timesheetTransactions || timesheetTransactions.length === 0) {
            console.error('No timesheet transactions found.');
            return;
        }

        const clockInTime = moment(timesheetTransactions[0].transactionDateTime);
        const currentTime = moment();
        const diffInMinutes = currentTime.diff(clockInTime, 'minutes');

        // Debugging to see if the correct data is being fetched
        console.log("Clock-in Time:", clockInTime.format());
        console.log("Current Time:", currentTime.format());
        console.log("Time Difference (Minutes):", diffInMinutes);
        console.log("Current Timesheet Status:", timesheetResponse.status);

        if (diffInMinutes > 1 && timesheetResponse.status === 10) {
            console.log("Status: Break In. Showing Break Out prompt.");
            modalizeRef.current?.open();
            setTime(diffInMinutes * 60); // Convert to seconds
            setIsRunning(true);
        } else if (diffInMinutes > 1 && timesheetResponse.status === 20) {
            console.log("Status: Break Out. Showing Clock Out prompt.");
            modalizeRef.current?.open();
            setTime(diffInMinutes * 60); // Convert to seconds
            setIsRunning(true);
        } else {
            console.log("Starting timer with", diffInMinutes, "minutes");
            setTime(diffInMinutes * 60); // Convert to seconds
            setIsRunning(true);
        }
    };

    useEffect(() => {
        if (isRunning) {
            console.log("Starting the timer...");
            const id: any = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
                console.log("Timer updated: ", time);
            }, 1000); // Increment every second
            setIntervalId(id);
        } else if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [isRunning]);

    // Logic for button states based on the timesheet status
    const renderButtons = () => {
        if (!currentTimesheet) {
            // No current timesheet: Clock In enabled, Clock Out disabled
            return (
                <>
                    <Button disable={false} title={t('CI')} callBack={handleClockIn} primary />
                    <Button disable={true} title={t('CO')} secondary />
                </>
            );
        }

        switch (currentTimesheet.status) {
            case 5:
                return (
                    <>
                        <Button disable={false} title={t('ClockIn')} callBack={handleClockIn} primary />
                        <Button disable={true} title={t('ClockOut')} secondary />
                    </>
                );
            case 10:
                return (
                    <>
                        <Button disable={false} title={t('BreakOut')} callBack={handleBreakOut} primary />
                        <Button disable={true} title={t('ClockOut')} secondary />
                    </>
                );
            case 20:
                return (
                    <>{!loading ?
                        <Button disable={false} title={t('BreakIn')} callBack={handleBreakIn} primary /> : ''}
                        <Button disable={false} title={t('ClockOut')} callBack={handleClockOut} secondary />
                    </>
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
        return moment().format('YYYY-MM-DDTHH:mm:ssZ'); // Microsoft format: 2024-09-28T16:45:12Z
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
                id: timesheetTransactionId,
                timesheetId: timesheetId,
                transactionType: 3, // Break In
                transactionDateTime: currentDate,
                latitude: 31.4733203, // Hardcoded
                longitude: 74.3786827, // Hardcoded
                address: "Lahore 54000, Punjab Pakistan" // Hardcoded
            };

            // Ensure the timesheet data is complete
            if (!timesheetDataBreakIn.transactionDateTime || !timesheetDataBreakIn.timesheetId || !timesheetDataBreakIn.id) {
                console.error("Required timesheet data is missing.");
                setLoading(false); // Stop loading if there's an error
                return;
            }

            // Dispatch the breakIn action
            await dispatch(breakInAction(timesheetDataBreakIn));  // Wait for the dispatch to complete

            // Refresh current timesheet data and update the state
            const timesheetResponse = await dispatch(getCurrentTimesheetApi());
            if (timesheetResponse && timesheetResponse.statusCode === 200) {
                setCurrentTimesheet(timesheetResponse.data);
            } else {
                setCurrentTimesheet(null); // Handle case where no timesheet is returned
            }
        } catch (error) {
            console.error('Error in handleBreakIn:', error);
        } finally {
            setLoading(false); // Stop loading in the finally block to ensure it's always called
            console.log("setting loading in break in at end", loading);
        }
    };




    const handleBreakOut = async () => {
        try {
            setLoading(true);

            if (!currentTimesheet || !currentTimesheet.timesheetTransactions || !currentTimesheet.timesheetTransactions[0]) {
                console.error("No valid timesheet transaction found.");
                setLoading(false); // Stop loading on error
                return;
            }

            const timesheetTransactionId = currentTimesheet.timesheetTransactions[0].id;
            const timesheetId = currentTimesheet.id;
            const currentDate = getCurrentDateInMicrosoftFormat();
            const timeSheetDataBreakOut = {
                id: timesheetTransactionId,
                timesheetId: timesheetId,
                transactionType: 4, // BreakOut transaction type
                transactionDateTime: currentDate,
                latitude: 31.4733203, // Hardcoded
                longitude: 74.3786827, // Hardcoded
                address: "Lahore 54000, Punjab Pakistan" // Hardcoded
            };



            await dispatch(breakOutAction(timeSheetDataBreakOut));

            // Optionally refresh current timesheet data
            const timesheetResponse = await dispatch(getCurrentTimesheetApi());
            if (timesheetResponse && timesheetResponse.statusCode === 200) {
                setCurrentTimesheet(timesheetResponse.data);
            } else {
                setCurrentTimesheet(null); // Handle case where no timesheet is returned
            }
        } catch (error) {
            console.error('Error during breakOut:', error);
        } finally {
            setLoading(false); // Stop the loader after the process
        }
    };

    const handleClockOut = async () => {
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
            const timesheetTransactionId = currentTimesheet.timesheetTransactions[0].id;
            const timesheetId = currentTimesheet.id;
            const currentDate = getCurrentDateInMicrosoftFormat();

            // Prepare the timesheet data
            const timesheetDataClockOut: TimesheetTransactionViewModel = {
                id: timesheetTransactionId,
                timesheetId: timesheetId,
                transactionType: 2, // Clock Out
                transactionDateTime: currentDate,
                latitude: 31.4733203, // Hardcoded
                longitude: 74.3786827, // Hardcoded
                address: "Lahore 54000, Punjab Pakistan" // Hardcoded
            };

            // Ensure the timesheet data is complete
            if (!timesheetDataClockOut.transactionDateTime || !timesheetDataClockOut.timesheetId || !timesheetDataClockOut.id) {
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

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const closeDropdown = () => {
        setDropdownVisible(false);
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
                    id: timesheetTransactionId,
                    timesheetId: timesheetId,
                    transactionType: 1, // Assuming ClockIn
                    transactionDateTime: currentDate,
                    latitude: 31.4733203, // Hardcoded
                    longitude: 74.3786827, // Hardcoded
                    address: "Lahore 54000, Punjab Pakistan" // Hardcoded
                };
            } else if (!currentTimesheet || (currentTimesheet.statusCode === 203 || currentTimesheet.statusCode === 204)) {
                console.log("Status code 204");

                // Handle case where timesheet is empty or status code is 203 or 204
                newTimesheetData = {
                    transactionType: 1, // Assuming ClockIn
                    transactionDateTime: currentDate,
                    latitude: 31.4733203, // Hardcoded
                    longitude: 74.3786827, // Hardcoded
                    address: "Lahore 54000, Punjab Pakistan" // Hardcoded
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
                                <TouchableOpacity onPress={toggleDropdown} style={{ paddingRight: 8 }}>
                                    <Entypo name="dots-three-vertical" size={20} color={Colors.black} />
                                </TouchableOpacity>
                            }
                            title={t('TimeCard')}
                        />


                        <View style={styles.container}>
                            {


                                <>
                                    {
                                        loading ? <Loader size={'strong'} /> :
                                            <>
                                                <Text style={styles.date}>{formatDate()}</Text>
                                                <Text style={styles.timer}>{formatTime(time)}</Text>
                                                <View style={[centralStyle.my1, styles.timerButtonContainer]}>
                                                    <View style={centralStyle.width45}>
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
                                                                indexContainerStyle={{ width: 20 }}
                                                                indexLetterStyle={styles.letterStyle}
                                                                renderCustomItem={(item) => {
                                                                    console.log(item)
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



                            }

                            {/* Project Bottom Sheet */}
                            <ProjectBottomSheet
                                isOpen={bottomSheetOpen}
                                onClose={() => setBottomSheetOpen(false)}
                                onSelectProject={handleProjectSelect}  // Handle selected project ID
                                projects={currentProjects}  // Pass the current projects to the bottom sheet
                            />
                            {/* Dropdown Modal for My Report */}
                        {isDropdownVisible && (
                            <Modal transparent={true} visible={isDropdownVisible} onRequestClose={closeDropdown}>
                                <TouchableOpacity style={styles.modalOverlay} onPress={closeDropdown} />
                                <View style={styles.dropdown}>
                                    <TouchableOpacity style={styles.dropdownItem} onPress={() => {
                                        closeDropdown();
                                        navigation.navigate('MyReport'); // Navigate to the "My Report" screen
                                    }}>
                                        <Text style={styles.dropdownText}>My Report</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        )}
                            {/* Date Picker Bottom Sheet */}
                            <BottomSheetDateTimePicker
                                ref={modalizeRef}
                                onSave={handleSaveDateTime}
                                title="Edit clock out time"
                                description="You've been on the clock over 8 hours. If this is an error, edit your clock out time."
                            />

                        </View >


                    </>
            }
        </SafeAreaView >


    );
};

export default TimeCard;
