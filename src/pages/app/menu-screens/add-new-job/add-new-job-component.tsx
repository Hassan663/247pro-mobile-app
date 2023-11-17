import {
    Modal,
    Text,
    TouchableOpacity,
    View
} from "react-native"

import AntDesign from 'react-native-vector-icons/AntDesign';
import { t } from "i18next";

import Button from "../../../../core/components/button.component";
import Colors from "../../../../styles/colors"
import OutlinedTextInput from "../../../../core/components/outlined-textInput.component";
import { Title } from "../../../../core/components/screen-title.component"
import { styles } from "./add-new-job.style"
import { platform } from "../../../../utilities";
import { changeRoute } from "../../../../core/helpers/async-storage";
import { RFPercentage } from "react-native-responsive-fontsize";
import { centralStyle } from "../../../../styles/constant.style"
import { useState } from "react";

export const DropDownBtn = ({ navigation, callBack, value, title }: any) => {
    return (
        <TouchableOpacity
            onPress={callBack}
            activeOpacity={0.8}
            style={styles.inputContainer}>
            <Text style={styles.inputtitle}>{title}</Text>
            <View style={styles.textInputContainer}>
                <View
                    style={[styles.input, centralStyle.row, centralStyle.justifyContentBetween, centralStyle.px2]} >
                    <Title
                        color={Colors.fontColor}
                        type='Poppin-14'
                        weight='400'
                        title={value} />
                    <AntDesign
                        name={`down`}
                        onPress={() => changeRoute(navigation, 'pop')}
                        color={Colors.black}
                        size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export const ServiceAddModal = ({ isVisible, onClose, callBack, inputValue, title, inputTitle }: any) => {

    const [inputVal, setInputVal] = useState('')

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={[styles.modalContent, centralStyle.justifyContentBetween]}>
                    <View style={[centralStyle.row, centralStyle.justifyContentBetween]}>
                        <View />
                        <Title
                            color={Colors.black}
                            type='Poppin-16'
                            weight='600'
                            title={title} />
                        <View style={[centralStyle.circle(RFPercentage(3)), { backgroundColor: Colors.lightGrey }]}>
                            <AntDesign
                                name={`close`}
                                onPress={onClose}
                                color={Colors.black}
                                size={platform == 'ios' ? RFPercentage(2) : RFPercentage(2.5)} />
                        </View>
                    </View>
                    <View style={centralStyle.my1}>
                        <OutlinedTextInput onChange={(val) => setInputVal(val)} val={inputValue} title={inputTitle} placeHolder={inputTitle} />
                    </View>
                    <View style={[centralStyle.width60, centralStyle.selfCenter]}>
                        <Button
                            callBack={() => {
                                onClose()
                                if (inputVal.length == 0) callBack(inputValue)
                                else callBack(inputVal)
                            }}
                            title={t(`Add`)}
                            primary
                        />
                    </View>

                </View>
            </View>
        </Modal>
    );
};