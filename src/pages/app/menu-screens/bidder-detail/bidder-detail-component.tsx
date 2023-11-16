// @app
import React, { useState } from 'react';
import {
    TextInput,
    Image,
    View,
    TouchableOpacity,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import Colors from '../../../../styles/colors';
import Button from '../../../../core/components/button.component';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './bidder-detail.style';
import { TAGDATA } from './data';
import { centralStyle } from '../../../../styles/constant.style';
import {
    handleBlur,
    handleFocus
} from '../../contact-screens/edit-company/call-back';
import { platform } from '../../../../utilities';
import { RFPercentage } from 'react-native-responsive-fontsize';

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

export const HireInputSheet = ({ btnText, title, placeHolder }: any) => {
    const [about, setAbout] = useState('')
    const [isActive, setIsActive] = useState<any>(false);

    return (
        <View
            style={[centralStyle.XAndYCenter, centralStyle.px2, centralStyle.flex1]}>
            <Title
                color={Colors.black}
                type='Poppin-18'
                weight='600'
                title={title} />
            <View style={[centralStyle.my2, centralStyle.width100,]}>
                <View style={[styles.inputContainer(60),]}>
                    <View style={styles.textInputContainer(isActive)}>
                        <TextInput
                            placeholder={placeHolder}
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
                    title={btnText} primary />
            </View>
        </View>
    )
}
export const DeleteJob = ({ btnText, title, primaryBtn, value }: any) => {
    return (
        <View
            style={[centralStyle.XAndYCenter, centralStyle.px2, centralStyle.flex1]}>
            <Title
                color={Colors.black}
                type='Poppin-18'
                weight='600'
                title={title} />
            <View style={[centralStyle.my2, centralStyle.width70,]}>
                <Title
                    color={Colors.fontColor}
                    type='Poppin-16'
                    weight='400'
                    textAlignCenter={`center`}
                    title={value} />

            </View>
            <View style={centralStyle.width100}>
                <Button
                    title={btnText}
                    primary={primaryBtn ? true : false}
                    titleStyle={styles.btnTextStyle}
                    customStyle={[styles.deleteBtnContainer, centralStyle.XAndYCenter]}
                />
            </View>
        </View>
    )
}
export const BidderUI = (setfullImg: any) => {
    return (
        <TouchableOpacity
            onPress={() => setfullImg(require('../../../../assets/app-images/companyprofilephotos.png'))}
            style={[styles.listContainer, centralStyle.row, centralStyle.alignitemCenter]}>
            <View style={[styles.bidderListImg, centralStyle.XAndYCenter]}>
                <Image style={styles.bidderImg} source={require('../../../../assets/app-images/companyprofilephotos.png')} />
            </View>
            <View style={styles.bidderListBody}>
                <View style={[centralStyle.row, centralStyle.alignitemCenter, centralStyle.justifyContentBetween]}>
                    <View style={styles.tagWrapper} >
                        {TAGDATA.map((item) => (<View style={styles.tagContainer}>
                            <Title
                                title={item}
                                type='Poppin-11'
                                weight='400'
                                color={Colors.fontColor}
                            />
                        </View>))}
                    </View>
                    <View style={[styles.downIconContainer, centralStyle.alignitemCenter]}>
                        <AntDesign
                            name={'down'}
                            color={Colors.black}
                            size={platform == 'ios' ? RFPercentage(2) : RFPercentage(2.5)} />
                    </View>
                </View>
                <Title
                    title={`I likea whole house renovation (less than 10% people give description on image...`}
                    type='Poppin-12'
                    weight='400'
                    color={Colors.fontColor}
                />
            </View>
        </TouchableOpacity>
    )
}