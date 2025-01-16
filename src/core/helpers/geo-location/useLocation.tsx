import { useEffect, useState } from 'react';
import { Platform, PermissionsAndroid, Alert, Linking } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { LOADER } from '../../../store/constant/constant';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [areaDetails, setAreaDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch: Dispatch<any> = useDispatch();
  const loader = useSelector((state: any) => state.root.loader);
  const requestAndroidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const requestIOSPermission = async () => {
    const authorization = await Geolocation.requestAuthorization('whenInUse');
    if (authorization === 'denied') {
      Alert.alert(
        'Location Permission Denied',
        'Please enable location services in your device settings to allow location access.',
        [
          {
            text: 'Go to Settings',
            onPress: () => Linking.openURL('app-settings:')
          }
        ]
      );
      return false;
    }
    return authorization === 'granted' || authorization === 'whenInUse';
  };

  // const getAreaDetails = async (latitude, longitude) => {
  //   try {
  //     dispatch({ type: LOADER, payload: true });
  //     const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`);
  //     const data = await response.json();
  //     const address = data.address;

  //     const formattedAddress = [
  //       address.road,
  //       address.neighbourhood,
  //       address.suburb,
  //       address.city,
  //       address.state,
  //       address.postcode,
  //       address.country
  //     ].filter(part => part && part.trim()).join(', ');

  //     console.log("Cleaned Address:", formattedAddress);
  //     setAreaDetails(formattedAddress);
  //     dispatch({ type: LOADER, payload: false });
  //     return formattedAddress;
  //   } catch (error) {
  //     dispatch({ type: LOADER, payload: false });
  //     console.error('Error fetching address:', error);
  //     setError('Error fetching address details.');
  //     throw error;
  //   }
  // };


//   const getAreaDetails = async (latitude, longitude) => {
//     try {
//         console.log("Fetching address details...");
//         console.log("Latitude:", latitude, "Longitude:", longitude);

//         dispatch({ type: LOADER, payload: true });

//         const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${37.55048097616786}&lon=${-122.36496925538836}&addressdetails=1`;
//         console.log("API URL:", apiUrl);

//         const response = await fetch(apiUrl);
//         console.log("API Response Status:", response.status);

//         // if (!response.ok) {
//         //     console.error("Error: Failed to fetch address details. HTTP Status:", response.status);
//         //     throw new Error("Failed to fetch address details.");
//         // }

//         const data = await response.json();
//         console.log("Raw API Response Data:", JSON.stringify(data, null, 2));

//         const address = data?.address || {};
//         console.log("Extracted Address Object:", JSON.stringify(address, null, 2));

//         const formattedAddress = [
//             address.road,
//             address.neighbourhood,
//             address.suburb,
//             address.city,
//             address.state,
//             address.postcode,
//             address.country,
//         ]
//             .filter((part) => part && part.trim()) // Filter out empty or undefined parts
//             .join(", "); // Join components with a comma

//         console.log("Formatted Address:", formattedAddress);

//         setAreaDetails(formattedAddress);
//         dispatch({ type: LOADER, payload: false });

//         return formattedAddress;
//     } catch (error) {
//         console.error("Error occurred while fetching address:", error.message);
//         dispatch({ type: LOADER, payload: false });
//         setError("Error fetching address details.");
//         throw error;
//     }
// };

  const getAreaDetails = async (latitude, longitude) => {
    try {
      console.log("Fetching address details...");
      console.log("Latitude:", latitude, "Longitude:", longitude);
  
      dispatch({ type: LOADER, payload: true });
  
      // Google Geocoding API endpoint
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBlIUfseugFdYB5r3ePo63N15_fpzvO6Cs`;
      console.log("API URL:", apiUrl);
  
      const response = await fetch(apiUrl);
      console.log("API Response Status:", response.status);
  
      if (!response.ok) {
        console.error("Error: Failed to fetch address details. HTTP Status:", response.status);
        throw new Error("Failed to fetch address details.");
      }
  
      const data = await response.json();
      console.log("Raw API Response Data:", JSON.stringify(data, null, 2));
  
      if (data.status !== "OK") {
        console.error("API Error Message:", data.error_message || "Unknown error occurred.");
        throw new Error(data.error_message || "Failed to fetch address details.");
      }
  
      const results = data.results;
      console.log("Results Array:", results);
  
      if (results.length === 0) {
        console.warn("No address found for the given coordinates.");
        setAreaDetails("Address not found");
        dispatch({ type: LOADER, payload: false });
        return "Address not found";
      }
  
      // Extracting and formatting the detailed address
      const addressComponents = results[0]?.address_components || [];
      console.log("Address Components:", addressComponents);
  
      // Extract individual components for detailed formatting
      const streetNumber = addressComponents.find((comp) => comp.types.includes("street_number"))?.long_name || "";
      const route = addressComponents.find((comp) => comp.types.includes("route"))?.long_name || "";
      const neighborhood = addressComponents.find((comp) => comp.types.includes("neighborhood"))?.long_name || "";
      const locality = addressComponents.find((comp) => comp.types.includes("locality"))?.long_name || "";
      const adminAreaLevel2 = addressComponents.find((comp) => comp.types.includes("administrative_area_level_2"))?.long_name || "";
      const adminAreaLevel1 = addressComponents.find((comp) => comp.types.includes("administrative_area_level_1"))?.short_name || "";
      const postalCode = addressComponents.find((comp) => comp.types.includes("postal_code"))?.long_name || "";
      const country = addressComponents.find((comp) => comp.types.includes("country"))?.long_name || "";
  
      console.log("Extracted Address Details:");
      console.log("Street Number:", streetNumber);
      console.log("Route:", route);
      console.log("Neighborhood:", neighborhood);
      console.log("Locality:", locality);
      console.log("Admin Area Level 2:", adminAreaLevel2);
      console.log("Admin Area Level 1:", adminAreaLevel1);
      console.log("Postal Code:", postalCode);
      console.log("Country:", country);
  
      // Construct the detailed formatted address
const formattedAddress = [
  streetNumber,
  route,
  neighborhood,
  locality,
  adminAreaLevel2,
  adminAreaLevel1? `${adminAreaLevel1},` : "",
  postalCode ? `${postalCode},` : "", // Add a comma after postalCode if it exists
  country ? `${country}` : "",      // Add a comma after country if it exists
]
  .filter((part) => part && part.trim()) // Filter out empty or undefined parts
  .join(" ") + "."; // Join components with a comma and add a full stop at the end

console.log("Formatted Address:", formattedAddress);

// Setting the formatted address to state
setAreaDetails(formattedAddress);
dispatch({ type: LOADER, payload: false });
  
      return formattedAddress;
    } catch (error) {
      console.error("Error occurred while fetching address:", error.message);
      dispatch({ type: LOADER, payload: false });
      setError("Error fetching address details.");
      throw error;
    }
  };

  const fetchLocation = async () => {
    dispatch({ type: LOADER, payload: true }); 
    try {
      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          async position => {
            const { latitude, longitude } = position.coords;
            const fetchedLocation = { latitude, longitude };

            try {
              const area = await getAreaDetails(latitude, longitude);
              setLocation(fetchedLocation);
              resolve({ location: fetchedLocation, areaDetails: area });
            } catch (areaError) {
              setError('Error fetching area details.');
              reject(areaError);
            }
          },
          err => {
            setError(err.message);
            Alert.alert('Location Error', 'Unable to fetch location. Please enable location services.');
            reject(err);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      });
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      dispatch({ type: LOADER, payload: false }); 
    }
  };

  const handlePermissionLoop = async () => {
    let hasPermission = false;

    if (Platform.OS === 'android') {
      hasPermission = await requestAndroidPermission();
    } else if (Platform.OS === 'ios') {
      hasPermission = await requestIOSPermission();
    }

    if (hasPermission) {
      await fetchLocation();
    } else {
      dispatch({ type: LOADER, payload: false }); 
    }
  };

  useEffect(() => {
    handlePermissionLoop();
  }, []);

  return { location, areaDetails, error, loader, fetchLocation };
};

function dispatch(arg0: { type: string; payload: boolean; }) {
  throw new Error('Function not implemented.');
}
