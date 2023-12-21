import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import DocumentPicker from 'react-native-document-picker'
import { IContactCreateModel } from "../../../../core/modals/contact.modal";

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
                // console.log(res.assets[0].uri, 'res.assets[0].urires.assets[0].urires.assets[0].uri')
                setInputValues((prevValues: any) => ({
                    ...prevValues,
                    [inputLabel]: res.assets[0].uri,
                }));

                // setState(res.assets[0].uri)
                // setimageUriLocal(res.assets[0].uri);
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




// there are three function is un use bcz they have some issue that's reason we are not using these function

export const removePrevField = (key: string, indexToRemove: number, setInputValues: any, inputValues: IContactCreateModel) => {
    if (key === 'contactEmails') {
        let contactEmailInputsClone = JSON.parse(JSON.stringify(inputValues));
        contactEmailInputsClone?.contactEmails?.splice(indexToRemove, 1)
        setInputValues(contactEmailInputsClone)
    
    }
};

export const addNewContactField = (key: string, setInputValues: any) => {
    if (key === 'contactEmails') {
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
    } else if (key === 'contactOthers') {
        setInputValues((prevValues: any) => ({
            ...prevValues,
            contactOthers: [
                ...prevValues.contactOthers,
                {
                    label: '',
                    value: '',
                    contactId: 0,
                    contactOtherTypeId: 2,
                },
            ],
        }));
    }
};
