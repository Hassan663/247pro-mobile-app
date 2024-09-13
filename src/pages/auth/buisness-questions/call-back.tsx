import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GetIndustriesAction,
  GetSpecialityByIndustriesAction,
  GetJobTypesByIndustryAction,
} from '../../../store/action/action';
import {
  fetchIndustries,
  fetchSpecialityByIndustry,
  fetchJobTypeByIndustry,
} from '../../../core/http-services/apis/application-api/onboarding-api/industries.service';

export const getIndustries = async (dispatch: any) => {
  try {
    await dispatch(GetIndustriesAction());
  } catch (error) {
    console.log('error--->', error);
  }
};

// export const getIndustries = async () => {
//   try {
//     let accessToken = await AsyncStorage.getItem('accessToken');
//     if (accessToken !== null) {
//       return await fetchIndustries(JSON.parse(accessToken));
//     }
//   } catch (error) {
//     console.log('error--->', error);
//   }
// };

export const getSpecialitiesByIndustry = async industoryId => {
  try {
    let accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken !== null) {
      return await fetchSpecialityByIndustry(
        JSON.parse(accessToken),
        industoryId,
      );
    }
  } catch (error) {
    console.log('error--->', error);
  }
};

export const getJobTypeByIndustry = async industoryId => {
  try {
    let accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken !== null) {
      return await fetchJobTypeByIndustry(JSON.parse(accessToken), industoryId);
    }
  } catch (error) {
    console.log('error--->', error);
  }
};
