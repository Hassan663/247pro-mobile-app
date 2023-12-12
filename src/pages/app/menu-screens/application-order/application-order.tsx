// @app
import React, {
    useRef,
    useState
} from 'react';
import {
    View,
    SafeAreaView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import DragList from "react-native-draglist";
import { t } from 'i18next';
import { Dispatch } from 'redux';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';

import Colors from '../../../../styles/colors';
import AppHeader from '../../../../core/components/app-headers';
import Button from '../../../../core/components/button.component';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './application-order.style';
import { platform } from '../../../../utilities';
import { EnableFeatureUI, RenderItem } from './application-order-component';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { logoutAction } from '../../../../store/action/action';
import { centralStyle } from '../../../../styles/constant.style';
import { APPLICATIONORDEROPTIONS } from './data';
import {
    keyExtractor,
    onReordered
} from './call-back';
import {openSheet } from '../../../../store/action/action';
import Loader from '../../../../core/components/loader.component';

const ApplicationOrder: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    const [data, setData] = useState(APPLICATIONORDEROPTIONS);
    const dispatch: Dispatch<any> = useDispatch();

    const loader = useSelector((state: any) => state.root.loader);
    const sheetRef = useRef<any>(null)
    
    const handleLogout = async () => {
        await dispatch(logoutAction())
    }

    const modalHandling = (condition: boolean) => { if (condition) openSheet(sheetRef) };

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader
                iconL1={
                    <AntDesign
                        style={centralStyle.mx2}
                        name={'left'}
                        onPress={() => { changeRoute(navigation, 'pop') }}
                        size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />}
                title={t(`ApplicationsOrder`)}
                weight='700'
                type='Roboto-20'
            />

            <View style={[centralStyle.mx2, centralStyle.row, centralStyle.my3]}>
                <Title title={t(`Applications`)} type='Poppin-18' color={Colors.fontColor} weight='600' />
                <Title title={" " + t('hideshow')} type='Poppin-18' color={Colors.fontColor} weight='400' />
            </View>

            <DragList
                data={data}
                keyExtractor={keyExtractor}
                onReordered={(fromIndex: number, toIndex: number) => onReordered(fromIndex, toIndex, data, setData)}
                renderItem={(info: any) => <RenderItem info={info} modalHandling={modalHandling} />}
            />

            <View style={styles.btnContainer}>

                {!loader ?
                    <Button
                        callBack={handleLogout}
                        title={t('logout')}
                        primary
                    />
                    :
                    <View style={[centralStyle.primaryBtnClone, centralStyle.XAndYCenter]}>
                        <Loader size={'small'} color={Colors.white} />
                    </View>
                }
            </View>
            <RBSheet
                ref={sheetRef}
                height={RFPercentage(35)}
                closeOnPressMask={true}
                closeOnDragDown={true}
                openDuration={250}
                animationType={'slide'}
                customStyles={{ container: { borderRadius: RFPercentage(2) } }}>
                <EnableFeatureUI
                    sheetRef={sheetRef}
                />
            </RBSheet>
        </SafeAreaView>
    );
};

export default ApplicationOrder;
