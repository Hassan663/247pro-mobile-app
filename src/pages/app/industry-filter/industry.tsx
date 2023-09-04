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
import { styles } from './industry.style';
import { Title } from '../../../core/components/screen-title.component';
import { centralStyle } from '../../../styles/constant.style';
import { CheckBoxRow } from './component';
import { changeRoute } from '../../../core/helpers/async-storage';
import OutlinedDropDown from '../../../core/components/outlined-dropdown.component';

const Industry: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [createIndustry, setCreateIndustry] = useState(false)
    const [edit, setEdit] = useState(true)
    const [editItem, setEditItem] = useState(true)
    const [selectedIndustry, setselectedIndustry] = useState(true)
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
                title={t(`Industry`)} />

            <View style={[centralStyle.container,]}>
                <View style={[styles.inputContainer, centralStyle.XAndYCenter]}>
                    <AntDesign
                        name={'search1'}
                        color={Colors.fontColor}
                        size={RFPercentage(3)} />
                    <TextInput
                        placeholder={t('SearchJobs')}
                        style={[centralStyle.flex1, styles.px2]} />
                </View>
                {edit &&
                    <>
                        <OutlinedDropDown
                            title={t('Service category')}
                            onselect={(value: any) => { setselectedIndustry(value) }}
                            DATA={[t('All'),]}
                            drop_down_button_style={styles.drop_down_button_style}
                        />
                    </>
                }
                {editItem &&
                    <TouchableOpacity
                        activeOpacity={.8}
                        style={[centralStyle.row, centralStyle.alignitemCenter, styles.titleContainer, styles.spaceBetween]}>
                        <Title
                            title={t(`you can edit item added by you`)}
                            weight='400'
                            color={Colors.gray}
                            type='Poppin-14' />
                        {edit ?
                            <AntDesign
                                name={`check`}
                                onPress={() => setEdit(!edit)}
                                color={Colors.black}
                                size={RFPercentage(2.5)} />
                            :
                            <AntDesign
                                name={`edit`}
                                onPress={() => setEdit(!edit)}
                                color={Colors.black}
                                size={RFPercentage(2.5)} />
                        }
                    </TouchableOpacity>
                }

                {createIndustry ?
                    <>
                        <Title
                            color={Colors.gray}
                            weight='600'
                            type='Poppin-14'
                            title={t(`Norecordfound`)} />
                        <View style={styles.my1}>
                            <Title
                                color={Colors.primary}
                                weight='600'
                                type='Poppin-14'
                                title={"+ " + t(`CREATEABCINDUSTRY`)} />
                        </View>
                    </> :
                    <FlatList
                        data={[t('Construction'), t('Marketing'), t('Sales'), t('Software')]}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => <CheckBoxRow edit={edit} item={item} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }

            </View>
        </View>
    );
};

export default Industry;
