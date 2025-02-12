import {postApi} from '../../../services/services'; // Reusable POST API utility
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TimesheetTransactionViewModel} from '../../../../modals/timecard.modal';
import {IResponse} from '../../../../modals';
import {
  BREAK_IN_ENDPOINT,
  BREAK_OUT_ENDPOINT,
  CLOCK_IN_ENDPOINT,
  CLOCK_OUT_ENDPOINT,
} from '../../apis';

// export const clockIn = async (
//   data: TimesheetTransactionViewModel, // Body (using the updated model)
//   timeZone: string, // Query parameter
//   projectId: number, // Query parameter
// ): Promise<IResponse<any>> => {
//   try {
//     // Fetch the access token from AsyncStorage
//     const accessToken = await AsyncStorage.getItem('accessToken');
//     if (accessToken !== null) {
//       CLOCK_IN_ENDPOINT.JWTToken = accessToken;
//     }
// console.log("THE TIMEZONE AND PROJECTID ", timeZone, projectId)
//     // Append the query parameters to the URL
//     const urlWithParams = `${
//       CLOCK_IN_ENDPOINT.url
//     }?timeZone=${encodeURIComponent(timeZone)}&projectId=${projectId}`;

//     // Call the reusable POST API utility
//     return await postApi<TimesheetTransactionViewModel, any>(
//       {...CLOCK_IN_ENDPOINT, url: urlWithParams},
//       data,
//     );
//   } catch (error) {
//     console.error('Clock-in error:', error);
//     throw error;
//   }
// };

// export const clockIn = async (
//   data: TimesheetTransactionViewModel,
//   timeZone: string,
//   projectId?: number | null
// ): Promise<IResponse<any>> => {
//   try {
//     const accessToken = await AsyncStorage.getItem('accessToken');
//     if (accessToken !== null) {
//       CLOCK_IN_ENDPOINT.JWTToken = accessToken;
//     }

//     console.log("THE TIMEZONE AND PROJECTID", timeZone, projectId);
//     console.log ("timehseet data in clockin  is ", data)

//     // Build the query parameters
//     const queryParams = new URLSearchParams();
//     queryParams.append('timeZone', timeZone); // Append timeZone directly

//     if (projectId != null) {
//       queryParams.append('projectId', projectId.toString()); // Add projectId if provided
//     }

//     // Construct the final URL
//     const urlWithParams = `${CLOCK_IN_ENDPOINT.url}?${queryParams.toString()}`;

//     console.log("Constructed URL IN clockin service:", urlWithParams);

//     console.log("Final Payload for Clock In:", data);

//     // Perform the API call
//     return await postApi<TimesheetTransactionViewModel, any>(
//       { ...CLOCK_IN_ENDPOINT, url: urlWithParams },
//       data
//     );
//   } catch (error) {
//     console.error('Clock-in error:', error);
//     throw error;
//   }
// };
export const clockIn = async (
  data: TimesheetTransactionViewModel,
  timeZone: string,
  projectId?: number | null
): Promise<IResponse<any>> => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken !== null) {
      CLOCK_IN_ENDPOINT.JWTToken = accessToken;
    }

    console.log("The Timezone and ProjectId:", timeZone, projectId);
    console.log("Timesheet Data in Clock-In Service:", data);

    // Build the query parameters
    const queryParams = new URLSearchParams();
    queryParams.append("timeZone", timeZone);

    if (projectId != null) {
      queryParams.append("projectId", projectId.toString());
    }

    // Construct the final URL
    const urlWithParams = `${CLOCK_IN_ENDPOINT.url}?${queryParams.toString()}`;

    console.log("Constructed URL in Clock-In Service:", urlWithParams);

    console.log("Final Payload for Clock-In:", data);

    // Perform the API call
    return await postApi<TimesheetTransactionViewModel, any>(
      { ...CLOCK_IN_ENDPOINT, url: urlWithParams },
      data
    );
  } catch (error) {
    console.error("Clock-in error:", error);
    throw error;
  }
};

export const breakIn = async (
  data: TimesheetTransactionViewModel, // Body (using the updated model)
): Promise<IResponse<any>> => {
  try {
    // Fetch the access token from AsyncStorage
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken !== null) {
      BREAK_IN_ENDPOINT.JWTToken = accessToken;
    }

    // Call the reusable POST API utility
    return await postApi<TimesheetTransactionViewModel, any>(
      BREAK_IN_ENDPOINT,
      data,
    );
  } catch (error) {
    console.error('Break-in error:', error);
    throw error;
  }
};

export const breakOut = async (
  data: TimesheetTransactionViewModel, // Body data for the API request
): Promise<IResponse<any>> => {
  try {
    // Fetch the access token from AsyncStorage
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken !== null) {
      BREAK_OUT_ENDPOINT.JWTToken = accessToken;
    }

    // Call the reusable POST API utility
    return await postApi<TimesheetTransactionViewModel, any>(
      BREAK_OUT_ENDPOINT,
      data,
    );
  } catch (error) {
    console.error('Break-out error:', error);
    throw error;
  }
};

export const clockOut = async (
  data: TimesheetTransactionViewModel, // Body data for the API request
): Promise<IResponse<any>> => {
  try {
    // Fetch the access token from AsyncStorage
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken !== null) {
      CLOCK_OUT_ENDPOINT.JWTToken = accessToken;
    }

    // Call the reusable POST API utility
    return await postApi<TimesheetTransactionViewModel, any>(
      CLOCK_OUT_ENDPOINT,
      data,
    );
  } catch (error) {
    console.error('Clock-out error:', error);
    throw error;
  }
};
