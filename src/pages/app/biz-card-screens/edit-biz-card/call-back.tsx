import { launchCamera, launchImageLibrary } from "react-native-image-picker";

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

export const pickImage = async (setState: any) => {
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
                setState(res.assets[0].uri)
                // setimageUriLocal(res.assets[0].uri);
            }
        });
    } catch (err) {
        console.log(err);
    }
};

export const handleFocus = (setIsActive: any) => setIsActive(true)
export const handleBlur = (setIsActive: any) => setIsActive(false)
export const toggleSwitch = (setIsEnabled: any) => setIsEnabled((previousState:boolean)  => !previousState);
