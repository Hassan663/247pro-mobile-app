// @app
import React, {
    useState
} from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import Colors from '../../../styles/colors';
import Button from '../../../core/components/button.component';
import { Title } from '../../../core/components/screen-title.component';
import { styles } from './email-verify-code.style';
import { changeRoute } from '../../../core/helpers/async-storage';
import { centralStyle, heightFlex1 } from '../../../styles/constant.style';
import { platform } from '../../../utilities';

const CELL_COUNT = 4;

const EmailVerifyCode: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue, });

    return (
        <KeyboardAvoidingView
            behavior={platform === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
             
        </KeyboardAvoidingView>
    );
};

export default EmailVerifyCode;
