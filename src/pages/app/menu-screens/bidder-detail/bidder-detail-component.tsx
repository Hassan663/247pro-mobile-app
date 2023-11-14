// @app
import React, { useState } from 'react';
import {
    TextInput,
    View,
} from 'react-native';

import Colors from '../../../../styles/colors';
import { styles } from './bidder-detail.style';
import { Title } from '../../../../core/components/screen-title.component';
import { centralStyle } from '../../../../styles/constant.style';
import OutlinedTextInput from '../../../../core/components/outlined-textInput.component';
import { t } from 'i18next';
import Button from '../../../../core/components/button.component';
import { handleBlur, handleFocus } from '../../contact-screens/edit-company/call-back';
import { Text } from 'react-native-svg';

export const Row: React.FC<{ title: string, value: string }> = ({ title, value }) => {
    return (
        <View style={styles.rowContainer}>
            <View style={centralStyle.flex1}>
                <Title
                    title={title}
                    type='Poppin-14'
                    weight='400'
                    color={Colors.gray}
                />
            </View>
            <View style={[centralStyle.flex1]}>
                <Title
                    title={value}
                    textAlignCenter='right'
                    type='Poppin-14'
                    weight='400'
                    color={title == `Company:` ? Colors.blue : Colors.black}
                />
            </View>
        </View>
    );
};

export const HireInputSheet = ({ contactInfoInputs, addSocialAccountInput, placeHolder, btnText, title, setcontactInfoInputs, sheetRef, newField, setNewField }: any) => {
    // const [selectedAccount, setselectedAccount] = useState(null)
    // const handleSave = () => {
    //     if (newField?.length > 0) {
    //         let inputsCopy = JSON.parse(JSON.stringify(contactInfoInputs));
    //         inputsCopy.push(newField)
    //         setcontactInfoInputs(inputsCopy)
    //         sheetRef?.current?.close()
    //         setNewField('')
    //     }
    //     if (addSocialAccountInput) {
    //         let inputsCopy = JSON.parse(JSON.stringify(contactInfoInputs));
    //         inputsCopy.push(selectedAccount)
    //         setcontactInfoInputs(inputsCopy)
    //         sheetRef?.current?.close()
    //         setselectedAccount(null)
    //     }
    // }
    const [about, setAbout] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ')
    const [isActive, setIsActive] = useState(false);

    return (
        <View
            style={[centralStyle.XAndYCenter, centralStyle.px2, centralStyle.flex1]}>
            <Title
                color={Colors.black}
                type='Poppin-18'
                weight='600'
                title={title} />
            <View style={centralStyle.my2}>
                {/* <OutlinedTextInput
                    onChange={(val) => setNewField(val)}
                    title={title}
                    multiLine
                    lines={4}
                    val={newField}
                    placeHolder={placeHolder}
                /> */}
                <View style={[styles.inputContainer(60), {}]}>
                    {
                        about?.length && about?.length > 0 ?
                            <Text style={styles.inputtitle(isActive)}>{t(`Notes`)}</Text>
                            : isActive &&
                            <Text style={styles.inputtitle(isActive)}>{t(`Notes`)}</Text>
                    }
                    <View style={styles.textInputContainer(isActive)}>
                        <TextInput
                            placeholder={isActive ? '' : t('Notes')}
                            value={about}
                            onFocus={() => handleFocus(setIsActive)}
                            multiline={true}
                            onBlur={() => handleBlur(setIsActive)}
                            onChangeText={(val) => setAbout(val)}
                            style={[styles.input(false, isActive), {}]} />
                    </View>
                </View>

            </View>
            <View style={centralStyle.width100}>
                <Button
                    // callBack={() => handleSave()}
                    title={btnText} primary />
            </View>
        </View>
    )
}