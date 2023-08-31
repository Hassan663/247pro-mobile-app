// @app
import React, {
    useState
} from 'react';
import {
    View,
    FlatList,
    Image,
    // TextInput,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
// import Slider from '@react-native-community/slider';
// import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';

import AppHeader from '../../../core/components/app-headers';
import Colors from '../../../styles/colors';
// import OutlinedTextInput from '../../../core/components/outlined-textInput.component';
import { styles } from './job-detail.style';
import { Title } from '../../../core/components/screen-title.component';
// import { centralStyle } from '../../../styles/constant.style';
// import { CheckBoxRow } from './component';
import { changeRoute } from '../../../core/helpers/async-storage';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { centralPosition, centralStyle } from '../../../styles/constant.style';
import { JOBINFODATA } from './data';

const JobDetail: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [isInfoOpened, setIsInfoOpened] = useState(false)
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <AppHeader
                iconL1={
                    <AntDesign
                        style={styles.mx2}
                        name={`left`} size={RFPercentage(3)} />
                }
                iconR1={
                    <Entypo
                        style={styles.mx2}
                        name={`dots-three-vertical`} size={RFPercentage(3)} />


                }
                title={t(`Majorrennovationforasinglefamilyhome`).substring(0, 27) + ' ...'} />
            {/* <View style={{ flex: 1 }}></View> */}

            {/* backgroundColor: Colors.lightGrey, */}
            <View style={[centralStyle.row, centralStyle.alignitemCenter, styles.infoRow, {
                backgroundColor: Colors.lightGrey,
            }]}>
                <Title
                    weight='500'
                    title={`Info`}
                    color={Colors.black}
                    type={`Poppin-18`} />
                <AntDesign
                    name={isInfoOpened ? 'down' : `up`}
                    onPress={() => setIsInfoOpened(!isInfoOpened)}
                    color={Colors.black}
                    size={RFPercentage(2.5)} />

            </View >
            <View>

                {isInfoOpened &&
                    <FlatList
                        data={JOBINFODATA}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.contentContainerStyle}
                        renderItem={({ item }) => {
                            return (
                                <View style={[centralStyle.row, centralStyle.alignitemCenter, styles.infoRow]}>
                                    <Title
                                        weight='400'
                                        title={item?.name}
                                        color={Colors.fontColor}
                                        type={`Poppin-16`} />
                                    <Title
                                        weight='500'
                                        title={item?.value}
                                        color={Colors.black}
                                        type={`Poppin-16`} />
                                </View >
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
            </View>
            <View style={{ padding: RFPercentage(2) }}>
                <Title
                    weight='400'
                    title={t(`Job Description`)}
                    color={Colors.fontColor}
                    type={`Poppin-16`} />
                <View style={{ marginVertical: RFPercentage(.5) }}>
                    <Title
                        weight='400'
                        title={t(`I like to do a whole house renovation, including one kitchen I like to do a whole house renovation, including one kitchen like to do a whole house renovation, including one one one one one one one one `).substring(0, 200) + ' ...'}
                        color={Colors.black}
                        type={`Poppin-16`} />
                </View>
                <Title
                    weight='500'
                    title={t(`Attachments`)}
                    color={Colors.black}
                    type={`Poppin-18`} />

                <View style={{ height: 500, borderWidth: 1, width: '100%', borderColor: Colors.lightGray, padding: RFPercentage(1), marginVertical: RFPercentage(2) }}>
                    <View style={[{ height: RFPercentage(10), backgroundColor: 'red', }, centralStyle.row]}>
                        <View style={[{ flex: 1.5, backgroundColor: 'blue' }, centralStyle.XAndYCenter]}>
                            <Image source={require('../../../assets/app-images/attachment.png')} />
                        </View>
                        <View style={{ flex: 7, backgroundColor: 'red' }}></View>
                        <View style={{ flex: 1.5, backgroundColor: 'blue' }}></View>
                    </View>
                </View>
            </View>
        </View >
    );
};

export default JobDetail;
