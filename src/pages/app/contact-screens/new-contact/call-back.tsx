import DocumentPicker from 'react-native-document-picker'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    launchCamera,
    launchImageLibrary
} from "react-native-image-picker";
import {
    IContactCreateModel,
    RemovePrevFieldModal,
    handleOnSelectModal
} from "../../../../core/modals/contact.modal";
import { uploadImage } from "../../../../core/http-services/apis/application-api/contact/contact.service";

export const captureImage = async (setimageUriLocal: any) => {
    try {
        let options: any = {
            title: 'Capture Image',
            // Add camera options if needed
        };
        launchCamera(options, async (res: any) => {
            console.log(res, 'resresresres')
            // if (res.didCancel) {
            //     // User canceled the image selection
            // } else if (res.error) {
            //     // Error occurred while selecting an image
            // } else {
            //     setimageUriLocal(res.assets[0].uri);
            // }
        });
        // Implement camera capture logic here
    } catch (err) {
        console.log(err);
    }
};

export const pickImage = async (setInputValues: any, inputLabel: string) => {
    try {
        let accessToken = await AsyncStorage.getItem('accessToken');

        let options: any = {
            title: 'Select Image',
            includeBase64: true,
            customButtons: [
                {
                    name: 'customOptionKey',
                    title: 'Choose Photo from Custom Option',
                },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, async (res: any) => {
            if (res.didCancel) {
                // User canceled the image selection
            } else if (res.error) {
                // Error occurred while selecting an image
            } else {
                const fileName = res.fileName || 'image.jpg';
                if (accessToken) {
                    const img = await uploadImage(res.assets[0].uri, fileName, JSON.parse(accessToken))
                    setInputValues((prevValues: any) => ({
                        ...prevValues,
                        [inputLabel]: img?.data,
                    }));
                };
            }
        });

    } catch (err) {
        console.log(err);
    }
};

export const handleFocus = (setIsActive: any) => setIsActive(true)
export const handleBlur = (setIsActive: any) => setIsActive(false)
export const toggleSwitch = (setIsEnabled: any) => setIsEnabled((previousState: boolean) => !previousState);

export const handleAttachments = async (setAttechments: any) => {
    const res = await DocumentPicker.pick({ type: [DocumentPicker.types.allFiles], });
    setAttechments(res[0])
}
export const openSheet = (setanim: any, setcontactModal: any) => {
    setanim('fadeInUpBig')
    setTimeout(() => { setcontactModal(true) }, 0)

}
export const handleOnSelect: handleOnSelectModal = (country, setIsCountryPickerVisible, setCountryCode) => {
    setIsCountryPickerVisible(false);
    setCountryCode(country.cca2);
};


export const removeEmptyFields = (data: any) => {
    for (const key in data) {
        if (data[key] === '' || (Array.isArray(data[key]) && data[key].length === 0)) {
            delete data[key];
        } else if (typeof data[key] === 'object' && data[key] !== null) {
            // Recursive call for nested objects or arrays
            removeEmptyFields(data[key]);
            // Remove the entire key if it becomes an empty object after removing empty fields
            if (Object.keys(data[key]).length === 0) {
                delete data[key];
            }
        }

        // Additional check for contactAddresses array
        if (key === 'contactAddresses' && Array.isArray(data[key])) {
            data[key] = data[key].filter((address: any) => address.streetAddress !== '');
            // Remove the entire key if it becomes an empty array after filtering
            if (!data[key][0].streetAddress) {
                delete data[key];
            }
        }
        if (key === 'contactEmails' && Array.isArray(data[key])) {
            data[key] = data[key].filter((contactEmails: any) => contactEmails.email !== '');
            // Remove the entire key if it becomes an empty array after filtering
            if (!data[key][0].email) {
                delete data[key];
            }
        }
        if (key === 'contactSpecialities' && Array.isArray(data[key])) {
            data[key] = data[key].filter((contactSpecialities: any) => contactSpecialities.specialtyName !== '');
            // Remove the entire key if it becomes an empty array after filtering
            if (!data[key][0].specialtyName) {
                delete data[key];
            }
        }
        if (key === 'contactPhones' && Array.isArray(data[key])) {
            data[key] = data[key].filter((contactPhones: any) => contactPhones.phone !== '');
            // Remove the entire key if it becomes an empty array after filtering
            if (!data[key][0].phone) {
                delete data[key];
            }
        }
        if (key === 'contactOthers' && Array.isArray(data[key])) {
            data[key] = data[key].filter((contactOthers: any) => contactOthers.value !== '');
            // Remove the entire key if it becomes an empty array after filtering
            if (!data[key][0].value) {
                delete data[key];
            }
        }
    } return data;
}

export const removePrevField: RemovePrevFieldModal = (indexToRemove, setInputValues, inputValues) => {
    let contactEmailInputsClone = JSON.parse(JSON.stringify(inputValues));
    contactEmailInputsClone?.contactEmails?.splice(indexToRemove, 1)
    setInputValues(contactEmailInputsClone)
};

export const addNewContactField = (setInputValues: React.Dispatch<React.SetStateAction<IContactCreateModel>>) => {
    setInputValues((prevValues: any) => ({
        ...prevValues,
        contactEmails: [
            ...prevValues.contactEmails,
            {
                email: '',
                label: '',
                visible: true,
            },
        ],
    }));
};


export function searchServices(services: any, searchTerm: string) {
    // Convert searchTerm to lowercase for case-insensitive search
    const searchTermLower = searchTerm.toLowerCase();

    // Filter services based on searchTerm
    return services.filter((service: any) => {
        // Convert service name to lowercase for case-insensitive search
        const serviceNameLower = service.name.toLowerCase();
        // Check if service name contains the searchTerm
        return serviceNameLower.includes(searchTermLower);
    });
}