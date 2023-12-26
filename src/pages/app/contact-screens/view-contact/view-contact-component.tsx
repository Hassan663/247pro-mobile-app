// @app
import React from 'react';
import { TouchableOpacity } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';
import { styles } from './view-contact.style';
import { Title } from '../../../../core/components/screen-title.component';
import { changeRoute } from '../../../../core/helpers/async-storage';
import OutlinedTextInputComponent from '../../../../core/components/outlined-textInput.component';

export const LeftIcon = (navigation?: any) => (
    <TouchableOpacity
        onPress={() => changeRoute(navigation, 'pop')}
        activeOpacity={.8}
        style={styles.mx2}>
        <AntDesign name={'left'} size={RFPercentage(2)} />
    </TouchableOpacity>
)
export const RightIcon = (navigation?: any) => (
    <TouchableOpacity
        activeOpacity={.8}
        style={styles.mx2}>
        <Title
            color={Colors.primary}
            type='Poppin-14'
            weight='600'
            title={t('Edit')} />
    </TouchableOpacity>
)



export const renderItem = ({ item }: any) => {
    if (!Array.isArray(item.value) && item.key !== 'id' && item.key !== 'contactTypeId'  ) {
        console.log(item,'item.valueitem.value')
      return (
        <OutlinedTextInputComponent
          editable={false}
          val={item.value}
          title={item.key} placeHolder={t('ZipCode')}
        />
      );
    }
    // Return null or another JSX element if item.value is an array
    return null;
  };


{/* <OutlinedTextInput editable={false} val='123456' title={t('ZipCode')} placeHolder={t('ZipCode')} /> */} 