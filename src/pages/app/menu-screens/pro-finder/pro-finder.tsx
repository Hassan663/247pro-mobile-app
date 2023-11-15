// @app
import React, {
    useRef,
    useState
} from 'react';
import {
    TextInput,
    View,
    FlatList,
    GestureResponderEvent,
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { t } from 'i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../../../styles/colors';
import AppHeader from '../../../../core/components/app-headers';
import { styles } from './pro-finder.style';
import { platform } from '../../../../utilities';
import { openSheet } from '../../../../store/action/action';
import { DeleteJob } from '../bidder-detail/bidder-detail-component';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { DROPDOWNDATA } from './data';
import { centralStyle } from '../../../../styles/constant.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
    DropDownModal,
    List,
    Status
} from './pro-finder-component';

const ProFinder: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    const [modalEnabled, setmodalEnabled] = useState(false)
    const [deleteEnabled, setdeleteEnabled] = useState<boolean>(false)
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const sheetRef = useRef<any>(null)


    const handlePress = (event: GestureResponderEvent) => {
        const { pageX, pageY } = event.nativeEvent;
        setCoordinates({ x: pageX, y: pageY });
        setmodalEnabled(!modalEnabled);
    };

    return (
        <>
            <KeyboardAwareScrollView>
                <View style={{}}>
                    <AppHeader
                        iconL1={
                            <AntDesign
                                name={`left`}
                                onPress={() => changeRoute(navigation, 'pop')}
                                color={Colors.black}
                                style={centralStyle.mx2}
                                size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(2.5)} />}
                        iconR1={
                            <AntDesign
                                name={`plus`}
                                color={Colors.black}
                                style={centralStyle.mx2}
                                size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(2.5)} />}
                        type='Poppin-18'
                        weight='600'
                        title={t(`ProFinder`)} />

                    <View style={[centralStyle.container]}>
                        <View style={[
                            centralStyle.height7,
                            platform == 'ios' ? centralStyle.mx02 : centralStyle.mx2,
                            centralStyle.row,
                            centralStyle.XAndYCenter]}>
                            <View style={[
                                styles.inputContainer,
                                centralStyle.px2,
                                centralStyle.row,
                                centralStyle.XAndYCenter
                            ]}>
                                <AntDesign size={RFPercentage(2)} name='search1' color={Colors.fontColor} />
                                <TextInput
                                    style={[centralStyle.flex1, centralStyle.height100, centralStyle.mx1,]}
                                    placeholder={t('Searchpostedjobs')}
                                />
                            </View>
                            <MaterialIcons size={RFPercentage(2.5)} name='filter-list' />
                        </View>

                        {modalEnabled && <DropDownModal
                            DATA={DROPDOWNDATA}
                            navigation={navigation}
                            coordinates={coordinates}
                            modalEnabled={modalEnabled}
                            editCallback={() => {
                                setmodalEnabled(!modalEnabled)
                                changeRoute(navigation, 'EditJob')
                            }}
                            viewCallback={() => {
                                setmodalEnabled(!modalEnabled)
                                changeRoute(navigation, 'ViewJob')
                            }}
                            deleteCallback={() => {
                                setdeleteEnabled(true)
                                openSheet(sheetRef)
                            }}
                            disableModal={() => setmodalEnabled(!modalEnabled)} />}

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]}
                            renderItem={({ item }) => <List callBack={handlePress} sheetRef={sheetRef} />}
                            keyExtractor={(item, index) => index.toString()}
                        />

                        <RBSheet
                            ref={sheetRef}
                            height={RFPercentage(35)}
                            closeOnPressMask={true}
                            closeOnDragDown={true}
                            openDuration={250}
                            animationType={`slide`}
                            customStyles={{
                                container: { borderRadius: RFPercentage(2) },
                                draggableIcon: styles.draggableIconstyle
                            }}
                        >
                            {deleteEnabled ?
                                <DeleteJob
                                    sheetRef={sheetRef}
                                    placeHolder={t(`Enter message (optional)`)}
                                    title={t('Delete Job')}
                                    value={`Are you sure you want to delete this job?`}
                                    btnText={t(`Delete`)}
                                />
                                :
                                <Status />
                            }
                        </RBSheet>
                    </View>
                </View></KeyboardAwareScrollView >

        </>
    );
};

export default ProFinder;
