// @app
import React, {
    useState
} from 'react';
import {
    View,
    SafeAreaView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import DragList from "react-native-draglist";
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';

import AppHeader from '../../../../core/components/app-headers';
import Colors from '../../../../styles/colors';
import { styles } from './application-order.style';
import { centralStyle } from '../../../../styles/constant.style';
import { platform } from '../../../../utilities';
import { Title } from '../../../../core/components/screen-title.component';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { APPLICATIONORDEROPTIONS } from './data';
import { RenderItem } from './application-order-component';
import {
    keyExtractor,
    onReordered
} from './call-back';
import Button from '../../../../core/components/button.component';
import { logoutAction } from '../../../../store/action/action';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

const ApplicationOrder: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    const [data, setData] = useState(APPLICATIONORDEROPTIONS);
    const dispatch: Dispatch<any> = useDispatch();

    const handleLogout = async () => {
        await dispatch(logoutAction())
    }
    return (
        <SafeAreaView style={styles.container}>
            <AppHeader
                iconL1={
                    <AntDesign
                        style={centralStyle.mx2}
                        name={'left'}
                        onPress={() => { changeRoute(navigation, 'pop') }}
                        size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />}
                title={t(`ApplicationsOrder`)} />

            <View style={[centralStyle.mx2, centralStyle.row, centralStyle.my3]}>
                <Title title={t(`Applications`)} type='Poppin-18' color={Colors.fontColor} weight='600' />
                <Title title={" " + t('hideshow')} type='Poppin-18' color={Colors.fontColor} weight='400' />
            </View>

            <DragList
                data={data}
                keyExtractor={keyExtractor}
                onReordered={(fromIndex: number, toIndex: number) => onReordered(fromIndex, toIndex, data, setData)}
                renderItem={(info: any) => <RenderItem info={info} />}
            />


            <View style={styles.btnContainer}>
                <Button
                    callBack={handleLogout}
                    title={t('logout')}
                    primary
                />
            </View>

        </SafeAreaView>
    );
};

export default ApplicationOrder;
