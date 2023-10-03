// @app
import React, {
    useRef,
    useState
} from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    Image,
    View,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';

import AppHeader from '../../../../../core/components/app-headers';
import Colors from '../../../../../styles/colors';
import TabsUi from '../company-profile/company-profile-component';
import OutlinedDropDown from '../../../../../core/components/outlined-dropdown.component';
import OutlinedTextInput from '../../../../../core/components/Outlined-TextInput.component';
import Button from '../../../../../core/components/button.component';
import { Title } from '../../../../../core/components/screen-title.component';
import { styles } from './edit-company-profile.style';
import { platform } from '../../../../../utilities';
import { changeRoute } from '../../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../../styles/constant.style';
import { AddInputSheet } from '../../../biz-card-screens/edit-biz-card/edit-biz-card-component';
import { CONTACTTYPEDATA } from '../../../contact-screens/edit-company/data';
import {
    EditOverView,
    IndustryTagUI,
    JobTypePreference,
    MobilePhoneUI
} from './edit-company-profile-component';
import {
    COUNTRYDATA,
    INSDUSTRYTAGS,
    RADIOBTNDATA,
    TABSDATA
} from './data';

const EditCompanyProfile: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [selectedTab, setSelectedTab] = useState(t('Overview'))
    const [selectedType, setSelectedType] = useState('first');
    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState<boolean>(false);
    const [countryCode, setCountryCode] = useState<any>('PK');
    const [country, setcountry] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [addSocialAccountInput, setaddSocialAccountInput] = useState(false)
    const [newField, setNewField] = useState<string>('')
    const [contactInfoInputs, setcontactInfoInputs] = useState<any>([])

    const sheetRef = useRef<any>(null)

    return (
        <KeyboardAvoidingView
            style={[centralStyle.flex1]}
            behavior={platform === 'ios' ? 'padding' : 'height'}
        >
            <SafeAreaView style={styles.container}>

                <AppHeader
                    iconL1={
                        <TouchableOpacity
                            onPress={() => changeRoute(navigation, 'pop')}
                            activeOpacity={.8}
                            style={centralStyle.mx2}>
                            <Title
                                color={Colors.primary}
                                type='Poppin-14'
                                weight='600'
                                title={t('Cancel')} />
                        </TouchableOpacity>
                    }
                    iconR1={
                        <View style={centralStyle.mx2}>
                            <Title
                                color={Colors.primary}
                                type='Poppin-14'
                                weight='600'
                                title={t('Done')} />
                        </View>
                    }
                    type='Poppin-18'
                    weight='600'
                    title={t(`EditCompanyProfile`)} />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={centralStyle.row}>
                        {TABSDATA.map((item, index) => (
                            <TabsUi
                                item={item}
                                index={index}
                                setSelectedTab={setSelectedTab}
                                selectedTab={selectedTab} />
                        ))}
                    </View>
                    <EditOverView
                        selectedType={selectedType}
                        setSelectedType={setSelectedType}
                        countryCode={countryCode}
                        setIsCountryPickerVisible={setIsCountryPickerVisible}
                        contactInfoInputs={contactInfoInputs}
                        isCountryPickerVisible={isCountryPickerVisible}
                        setCountryCode={setCountryCode}
                        setcountry={setcountry}
                        setState={setState}
                        sheetRef={sheetRef}
                        setcontactInfoInputs={setcontactInfoInputs}
                        newField={newField}
                        addSocialAccountInput={addSocialAccountInput}
                        setNewField={setNewField}
                        setaddSocialAccountInput={setaddSocialAccountInput}
                    />
                    
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default EditCompanyProfile;
