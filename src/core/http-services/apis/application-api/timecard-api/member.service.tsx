import {getApi, getApiWithParams, putApi} from '../../../services/services'; // Reusable GET API utility
import {IResponse} from '../../../../modals'; // Define the response interface
import {ProjectListViewModel} from '../../../../modals/project.modal'; // Import the model
import {
  TIMESHEET_BY_ID_ENDPOINT,
  TIMESHEET_CURRENT_ENDPOINT,
  TIMESHEET_MEMBERS_BY_ID_ENDPOINT,
  TIMESHEET_MEMBERS_ENDPOINT,
  TIMESHEET_ME_ENDPOINT,
} from '../../apis'; // Define this endpoint in your API config
import {
  TeamTimesheetListView,
  TimesheetViewModel,
} from '../../../../modals/timeSheetMember.modal';
import BASE_URL from '../../../base/base-url';

export const getMembersByTimesheet = async (
  startDate: string,
  endDate: string,
  projectId?: number,
) => {
  // Prepare query parameters
  const params = new URLSearchParams();
  params.append('startDate', startDate);
  params.append('endDate', endDate);
  if (projectId) {
    params.append('projectId', projectId.toString());
  }

  const response = await getApiWithParams<null, TeamTimesheetListView[]>(
    TIMESHEET_MEMBERS_ENDPOINT,
    params,
  );
  console.log('getMemberByTimesheet: ', response);
  return response; // Adjust based on your response structure
};


export const getTimesheetByUserApi = async (
  userId: string,
  startDate?: string,
  endDate?: string,
): Promise<IResponse<TimesheetViewModel[]>> => {
  try {
    // Construct the query parameters directly using the userId, startDate, and endDate
    const queryParams = new URLSearchParams();

    if (startDate) {
      queryParams.append('startDate', startDate);
    }
    if (endDate) {
      queryParams.append('endDate', endDate);
    }

    // Append userId directly to the endpoint URL
    const endpointWithUserId = {
      ...TIMESHEET_MEMBERS_BY_ID_ENDPOINT,
      url: `${TIMESHEET_MEMBERS_BY_ID_ENDPOINT.url}/${userId}`, // Construct the URL dynamically
    };

    // Call the common getApiWithParams function with the constructed URL and queryParams
    const response = await getApiWithParams<null, TimesheetViewModel[]>(
      endpointWithUserId, // Pass the dynamic URL with userId
      queryParams.toString(), // Pass query parameters as a string
    );

    console.log('MEMBER BY ID RESPONSE IN ACTION: ', response);
    return response;
  } catch (error) {
    console.error('Error fetching timesheets by user:', error);
    throw error;
  }
};
// API TO GET THE CURRENT TIME SHEET
export const getCurrentTimesheetApi = () => {
  return async (dispatch: Dispatch) => {
    try {
      console.log("Calling API: ", TIMESHEET_CURRENT_ENDPOINT.url);

      const response = await getApiWithParams<null, TimesheetViewModel>(
        TIMESHEET_CURRENT_ENDPOINT,
        null
      );

      // Log the full response to inspect what's returned
      console.log("Full API Response:", JSON.stringify(response, null, 2)); // Ensure full object is logged

      if (response && response.id) {
        console.log("Success! Current timesheet:", JSON.stringify(response, null, 2));

        // Dispatch the response to store it in the state (if needed)
        dispatch({
          type: 'SAVE_CURRENT_TIMESHEET',
          payload: response, // Save full response in Redux store or state
        });

        return {
          statusCode: 200,  // Manually assume success if the data is valid
          data: response,
        };
      }

      console.log("No timesheet found.");
      return {
        statusCode: 203,
        data: {} as TimesheetViewModel,  // Return an empty object for no content
      };

    } catch (error) {
      console.error('Error fetching current timesheet:', error);
      throw error;
    }
  };
};

// Service function to get the current user's reports
export const getTimesheetsForCurrentUserApi = async (
  startDate?: string,
  endDate?: string,
): Promise<IResponse<TimesheetViewModel[]>> => {
  try {
    const params = new URLSearchParams();
    if (startDate) {
      params.append('startDate', startDate);
    }
    if (endDate) {
      params.append('endDate', endDate);
    }
   

    // Call the API using getApiWithParams function
    const response = await getApiWithParams<null, TimesheetViewModel[]>(
      TIMESHEET_ME_ENDPOINT,
       params,
    );

    return response;
  } catch (error) {
    console.error('Error fetching timesheets for current user:', error);
    throw error;
  }
};

// update a timesheet by ID
export const updateTimesheetApi = async (
  timesheetId: string,
  timesheetData: TimesheetViewModel,
): Promise<IResponse<null>> => {
  try {
    const TIMESHEET_BY_ID_ENDPOINT_CLONE = {...TIMESHEET_BY_ID_ENDPOINT};
    TIMESHEET_BY_ID_ENDPOINT_CLONE.url =
      TIMESHEET_BY_ID_ENDPOINT + `${timesheetId}`;
    // Call the PUT API with the timesheet data
    const response = await putApi<TimesheetViewModel, null>(
      TIMESHEET_BY_ID_ENDPOINT_CLONE,
      timesheetData,
    );

    return response;
  } catch (error) {
    console.error('Error updating timesheet:', error);
    throw error;
  }
};
