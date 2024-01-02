import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import DocumentPicker from 'react-native-document-picker'
import { IContactCreateModel, RemovePrevFieldModal } from "../../../../core/modals/contact.modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

export const pickImage = async (setContactDetails: any, inputLabel: string) => {
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
                    setContactDetails((prevValues: any) => ({
                        ...prevValues,
                        [inputLabel]: img?.data,
                    }));
                }
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
export const handleOnSelect = (country: any, setIsCountryPickerVisible: any, setCountryCode: any) => {
    setIsCountryPickerVisible(false);
    setCountryCode(country.cca2);
    console.log(country, 'country')
};


export const removePrevField: RemovePrevFieldModal = (indexToRemove, setContactDetails, contactDetails) => {
    let contactEmailInputsClone = JSON.parse(JSON.stringify(contactDetails));
    contactEmailInputsClone?.contactEmails?.splice(indexToRemove, 1)
    setContactDetails(contactEmailInputsClone)
};

export const addNewContactField = (setContactDetails: React.Dispatch<React.SetStateAction<IContactCreateModel>>) => {
    setContactDetails((prevValues: any) => ({
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


interface ContactData {
    [key: string]: any;
}

export function addIdsToArrays(data: ContactData, contactID: number): ContactData {
    for (const key in data) {
        if (Array.isArray(data[key])) {
            (data[key] as Array<any>).forEach((obj: any) => {
                obj.contactId = contactID;
            });
        }
    }
    return data;
}




export const removeEmptyFields = (data: any) => {
    for (const key in data) {
        if (data[key] === '' || data[key] === null || (Array.isArray(data[key]) && data[key].length === 0)) {
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