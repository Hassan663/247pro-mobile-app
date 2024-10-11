// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const getItem = async (key: string, defaultValue?: any) => {
//     try {
//         const value: any = await AsyncStorage.getItem(`${key}`)

//         if (value) {
//             return JSON.parse(value)
//         } else {
//             return defaultValue
//         }


//     } catch (error) {
//         return null
//     }
// }

// export const setItem = async (key: string, value: any) => {
//     try {
//         await AsyncStorage.setItem(`${key}`, JSON.stringify(value))

//         return true
//     } catch (error) {
//         return null
//     }
// }

// export const changeRoute = async (navigation: any, value: string, params?: any) => {
//     try {
//       if (value === 'pop') {
//         navigation.goBack();
//       } else if (value === 'AppNavigation') {
//         // Reset the navigation stack and navigate to the initial route of AppNavigation
//         console.log("move to appNav");
//         navigation.reset({
//           index: 0,
//           routes: [{ name: value }],
//         });
//       } else if (value === 'AuthNavigation') {
//         // Reset the navigation stack and navigate to AuthNavigation
//         navigation.reset({
//           index: 0,
//           routes: [{ name: value, params }],
//         });
//       } else {
//         navigation.navigate(value, params);
//       }
//     } catch (error) {
//       console.error('Navigation error:', error);
//     }
//   };
  

// export const formatPhoneNumber = (phoneNumber?: string) => {
//     var cleaned = ('' + phoneNumber)
//         .replace(/\D+/g, '')
//         .replace(/(\d{3})(\d{4})(\d{4})/, '+$1 $2 $3');

//     return cleaned;
// };

// export const findClosest = (arr: any, target: any) => {
//     let distance = Math.abs(arr[0] - target);
//     let idx = 0;
//     for (let c = 1; c < arr.length; c++) {
//         let cdistance = Math.abs(arr[c] - target);
//         if (cdistance < distance) {
//             idx = c;
//             distance = cdistance;
//         }
//     }
//     return arr[idx];
// }
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppTabs from '../../../router/BottomTab/bottom-tabs';

export const getItem = async (key, defaultValue = null) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
        console.error('Failed to get item:', error);
        return defaultValue;
    }
};

export const setItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Failed to set item:', error);
        return false;
    }
};

export const changeRoute = async (navigation, value, params = {}) => {
    try {
      if (value === 'pop') {
        navigation.goBack();
      } else if (value === 'AppNavigation' || value === 'AuthNavigation') {
        console.log("IN  if ELSe")
        navigation.reset({
          index: 0,
          routes: [{ name: value, params }],
        });
      } 
      // else if(value=='AppTabs'){
      //   navigation.navigate('AppTabs', {
      //     screen: 'Menu',
      //     params: params,
      //   });
      //   // navigation.navigate(AppTabs,{screen:value},params)

      // }
      else {
        console.log("IN ELSe")
        navigation.navigate(value, params);
      }
    } catch (error) {
      console.log("IN Catch")
      console.error('Navigation error:', error);
    }
};

export const formatPhoneNumber = (phoneNumber = '') => {
    return phoneNumber.replace(/\D+/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '+$1 $2 $3');
};

export const findClosest = (arr, target) => {
    let closest = arr.reduce((prev, curr) => {
        return (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev);
    });
    return closest;
};
