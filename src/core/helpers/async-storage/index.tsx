import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async (key: string, defaultValue?: any) => {
    try {
        const value: any = await AsyncStorage.getItem(`${key}`)

        if (value) {
            return JSON.parse(value)
        } else {
            return defaultValue
        }


    } catch (error) {
        return null
    }
}

export const setItem = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(`${key}`, JSON.stringify(value))

        return true
    } catch (error) {
        return null
    }
}

export const changeRoute = async (navigation: any, value: string, params?: any) => {
    try {
      if (value === 'pop') {
        navigation.goBack();
      }
    //    else if (value === 'AppNavigation') {
    //     // Reset the navigation stack and navigate to the initial route of 'AppTabs'
    //     navigation.reset({
    //     index: 0,
    //     routes: [{ name: value, params }], // Here, value is 'AppTabs'
    //     });
    //   }
    //   else if (value === 'AuthNavigation') {
    //     // Reset the navigation stack and navigate to the initial route of 'AppTabs'
    //     navigation.reset({
    //     index: 0,
    //       routes: [{ name: value, params }], // Here, value is 'AuthNavigation'
    //     });
    //   }
       else {
        navigation.navigate(value, params);
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

export const formatPhoneNumber = (phoneNumber?: string) => {
    var cleaned = ('' + phoneNumber)
        .replace(/\D+/g, '')
        .replace(/(\d{3})(\d{4})(\d{4})/, '+$1 $2 $3');

    return cleaned;
};

export const findClosest = (arr: any, target: any) => {
    let distance = Math.abs(arr[0] - target);
    let idx = 0;
    for (let c = 1; c < arr.length; c++) {
        let cdistance = Math.abs(arr[c] - target);
        if (cdistance < distance) {
            idx = c;
            distance = cdistance;
        }
    }
    return arr[idx];
}
