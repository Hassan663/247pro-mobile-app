// @app
import React, { useState } from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    TextInput,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';

import AppHeader from '../../../core/components/app-headers';
import Colors from '../../../styles/colors';
import { styles } from './cities.style';
import { Title } from '../../../core/components/screen-title.component';
import { centralStyle } from '../../../styles/constant.style';
import { CheckBoxRow, ServiceCategories } from './component';
import { changeRoute } from '../../../core/helpers/async-storage';
import OutlinedDropDown from '../../../core/components/outlined-dropdown.component';
import OutlinedTextInput from '../../../core/components/outlined-textInput.component';

const Cities: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    const [selectedIndustry, setselectedIndustry] = useState<string>('');
    const [zipCode, setZipCode] = useState<string>('');

    return (
        <View style={{ flex: 1 }}>
            <AppHeader
                iconL1={
                    <TouchableOpacity
                        activeOpacity={.8}
                        onPress={() => changeRoute(navigation, 'pop')} style={styles.mx2}>
                        <Title
                            title={t('Cancel')}
                            weight={'600'}
                            color={Colors.primary}
                            type={'Poppin-14'} />
                    </TouchableOpacity>
                }
                iconR1={
                    <View style={styles.mx2}>
                        <Title
                            title={t('Done')}
                            weight={'600'}
                            color={Colors.primary}
                            type={'Poppin-14'} />
                    </View>

                }
                title={t(`Cities`)} />

            <View style={[centralStyle.container,]}>
                <View style={styles.my1}>
                    <Title
                        title='Radius search limited to the United States'
                        color={Colors.fontColor}
                        type={`Poppin-14`} />
                </View>

                <View style={[styles.inputContainer, centralStyle.XAndYCenter, styles.removeMY]}>
                    <AntDesign
                        name={'search1'}
                        color={Colors.fontColor}
                        size={RFPercentage(3)} />
                    <TextInput
                        placeholder={t('SearchJobs')}
                        style={[centralStyle.flex1, styles.px2]} />
                </View>
                <OutlinedTextInput
                    val={zipCode}
                    onChange={(val) => { setZipCode(val) }}
                    title={t('ZipCode')}
                    placeHolder={t('ZipCode')}
                />
                <View style={[centralStyle.row, centralStyle.alignitemCenter, { justifyContent: 'space-between' }]}>
                    <Title
                        title='Radius'
                        weight='600'
                        color={Colors.black}
                        type={`Poppin-14`} />
                    <Title
                        title='30 miles'
                        color={Colors.fontColor}
                        type={`Poppin-14`} />
                </View>
                <FlatList
                    // style={[styles.px2]}
                    data={[t('Select all'), t('Colma'), t('Daly city'), t('Fremont'), t('Redwood city'), t('San jose'), t('Sausalito')]}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <CheckBoxRow item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
                {/* {selectedIndustry == t('All')
                    &&
                    <FlatList
                        data={[t('Plumbing'), t('Electrical'), t('Construction'), t('Software')]}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => <ServiceCategories item={item} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                } */}
            </View>
        </View>
    );
};

export default Cities;
