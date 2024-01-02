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

export const pickImage = async (setContactDetails:any,inputLabel:string) => {
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
