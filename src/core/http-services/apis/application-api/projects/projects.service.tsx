import { getApiWithParams } from '../../../services/services'; // Reusable GET API utility
import { IResponse } from '../../../../modals'; // Define the response interface
import { ProjectListViewModel } from '../../../../modals/project.modal'; // Import the model
import { PROJECTS_RADIUS_ENDPOINT } from '../../apis'; // Define this endpoint in your API config

export const getProjectsByRadius = async (
  latitude: number,
  longitude: number,
  status?: number, // Optional status parameter
): Promise<IResponse<ProjectListViewModel[]>> => {
  
  // Prepare query parameters
  const params = new URLSearchParams();
  params.append('latitude', latitude.toString());
  params.append('longitude', longitude.toString());
  if (status !== undefined) {
    params.append('status', status.toString());
  }

  // Log the parameters before the API call
  console.log("getProjectsByRadius called with params: ", {
    latitude,
    longitude,
    status: status !== undefined ? status : "No status provided",
  });

  // Make the API call using getApiWithParams
  try {
    const response = await getApiWithParams<null, ProjectListViewModel[]>(
      PROJECTS_RADIUS_ENDPOINT,
      params,
    );

    // Log the API response
    console.log("getProjectsByRadius API response: ", response);

    return response; // Return the response directly
  } catch (error) {
    // Log any errors that occur during the API call
    console.error("getProjectsByRadius API error: ", error);
    throw error; // Rethrow the error for further handling
  }
};