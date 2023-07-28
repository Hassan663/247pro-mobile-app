import axios, { AxiosError } from 'axios';
import { Alert } from 'react-native';

const handleApiError = (error: AxiosError): void => {
  const exp = error.response;
  if (!exp) {
    // Network Error or No Response
    Alert.alert('Network Error', 'There was a problem connecting to the server. Please check your internet connection.');
    return;
  }

  const errorMessage = exp.data?.message || 'An error occurred. Please try again later.';
  const errorMessageDetail = exp.data?.detail || '';

  switch (exp.status) {
    case 400:
      Alert.alert('Bad Request', errorMessage);
      break;
    case 401:
      // Implement your sign-out logic here
      break;
    case 402:
      Alert.alert('Reactivate your account', errorMessage, [
        {
          text: 'Reactivate',
          onPress: () => {
            // Implement your navigation logic to subscription page here
          },
        },
      ]);
      break;
    case 403:
      Alert.alert('Forbidden', errorMessage);
      break;
    case 409:
      // Implement conflict handling logic if needed
      break;
    case 418:
      // Implement logic to handle Front-End Application Version Error
      break;
    case 422:
      Alert.alert('Unprocessable Entity', errorMessage);
      break;
    case 423:
    case 503:
      // Implement the logic to show a maintenance page or a message to the user.
      break;
    case 426:
      Alert.alert('Upgrade required', errorMessage, [
        {
          text: 'Upgrade',
          onPress: () => {
            // Implement your navigation logic to the subscription page here
          },
        },
      ]);
      break;
    case 0:
    case 500:
      Alert.alert('Internal Server Error', errorMessage);
      break;
    default:
      break;
  }
};
