// import React, {
//   memo,
//   useState,
//   useEffect
// } from 'react';
// import {
//   View,
//   TextInput,
//   Text,
//   TouchableOpacity,
//   KeyboardTypeOptions,
// } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

// import { styles } from './index.style';
// import Colors from '../../styles/colors';
// import { platform } from '../../utilities';
// import { windowHeight } from '../../styles/constant.style';
// import { useSelector } from 'react-redux';

// interface OutlinedTextInputProps {
//   title?: string;
//   val?: string;
//   lines?: number;
//   height?: number;
//   placeHolder?: string;
//   keyboardType?: KeyboardTypeOptions;
//   Password?: boolean;
//   multiLine?: boolean;
//   editable?: boolean;
//   errorLine?: boolean;
//   autoFocus?: boolean;
//   disableValidation?: boolean;
//   maxLength?: number;
//   onChange?: (val: string) => void;
// }

// const OutlinedTextInput: React.FC<OutlinedTextInputProps> = ({ title, maxLength, height, disableValidation, errorLine, editable, val, autoFocus, keyboardType, placeHolder, lines, multiLine, Password, onChange }) => {
//   const [open, setOpen] = useState(true);
//   const [isActive, setIsActive] = useState(false);
//   const [inputVal, setInputVal] = useState(val ? val : '')
//   const isError = useSelector((state: any) => state.root.isError);
//   const errorMsg = useSelector((state: any) => state.root.errorMsg);
//   const errorTitle = useSelector((state: any) => state.root.errorTitle);


//   const handleFocus = () => { setIsActive(true) }

//   const handleBlur = () => { setIsActive(false) }


//   useEffect(() => {
//     setInputVal(val ? val : '')
//   }, [val])

//   return (
//     <>
//       <View style={styles.inputContainer(height)}>
//         {/* {isActive &&
//           <Text style={styles.inputtitle(isActive)}>{title}</Text>
//         } */}
//         {inputVal?.length && inputVal?.length > 0 ?
//           <Text style={styles.inputtitle(isActive, inputVal, errorLine)}>{title}</Text>
//           : isActive &&
//           <Text style={styles.inputtitle(isActive, inputVal, errorLine)}>{title}</Text>
//         }
//         <View style={styles.textInputContainer(isActive)}>
//           {!Password ?
//             <TextInput
//             selectionColor={'orange'}
            
//               placeholder={isActive ? '' : placeHolder}
//               value={inputVal}
//               autoFocus={autoFocus ? true : false}
//               onFocus={handleFocus}
//               editable={editable == false ? editable : true}
//               placeholderTextColor={Colors.fontColor}
//               multiline={multiLine || false}
//               numberOfLines={lines}
//               keyboardType={keyboardType ? keyboardType : 'default'}
//               maxLength={maxLength ? maxLength : undefined}
//               onBlur={handleBlur}
//               onChangeText={(text) => {
//                 setInputVal(text)
//                 if (onChange) { onChange(text) }
//               }}
//               style={[
//                 styles.input(false, isActive, inputVal, errorLine, errorTitle, title, disableValidation),
//               ]} />
//             :
//             <>

//               <View style={styles.passwordContainer(isActive, inputVal, errorLine, errorTitle, title, disableValidation)}>
//                 <View style={{ flex: 9 }}>
//                   <TextInput
//                   selectionColor={'orange'}
//                     placeholder={isActive ? '' : placeHolder}
//                     placeholderTextColor={Colors.fontColor}
//                     autoFocus={autoFocus ? true : false}
//                     value={inputVal}
//                     maxLength={maxLength ? maxLength : undefined}
//                     editable={editable == false ? editable : true}
//                     keyboardType={keyboardType ? keyboardType : 'default'}
//                     onFocus={handleFocus}
//                     onBlur={handleBlur}
//                     onChangeText={(text) => {
//                       setInputVal(text)
//                       if (onChange) { onChange(text) }
//                     }}
//                     secureTextEntry={open ? true : false}
//                     style={styles.input(true, isActive, inputVal)} />
//                 </View>
//                 <TouchableOpacity
//                   activeOpacity={0.8}
//                   onPress={() => setOpen(!open)}
//                   style={styles.eyeContainer}>
//                   <Feather
//                     color={isActive ? Colors.black : inputVal.length > 0 ? Colors.black : Colors.lightGrey}
//                     size={platform == 'ios' ? RFPercentage(2.2) : RFValue(20, windowHeight)}
//                     // size={platform == 'ios' ? RFPercentage(2.2) : RFPercentage(3)}
//                     name={open ? 'eye-off' : `eye`}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </>
//           }
//         </View>
//       </View>
//       {!disableValidation && errorMsg &&
//         errorTitle == 'all' ?
//         <Text style={[{
//           color: 'red',
//           marginBottom: RFValue(10, windowHeight),
//           marginLeft: 5
//         },]}>{errorMsg}</Text>
//         :
//         errorTitle?.toLocaleLowerCase() == title?.toLocaleLowerCase() &&
//         <Text style={[{
//           color: 'red',
//           marginBottom: RFValue(10, windowHeight),
//           marginLeft: 5,
//         },]}>{errorMsg}</Text>
//       }
//     </>
//   );
// };

// export default memo(OutlinedTextInput);
import React, {
  memo,
  useState,
  useEffect,
  forwardRef,
} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardTypeOptions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import { styles } from './index.style';
import Colors from '../../styles/colors';
import { platform } from '../../utilities';
import { windowHeight } from '../../styles/constant.style';
import { useSelector } from 'react-redux';

interface OutlinedTextInputProps {
  title?: string;
  val?: string;
  lines?: number;
  height?: number;
  placeHolder?: string;
  keyboardType?: KeyboardTypeOptions;
  Password?: boolean;
  multiLine?: boolean;
  editable?: boolean;
  errorLine?: boolean;
  autoFocus?: boolean;
  disableValidation?: boolean;
  maxLength?: number;
  onChange?: (val: string) => void;
}

const OutlinedTextInput = forwardRef<TextInput, OutlinedTextInputProps>(
  ({ title, maxLength, height, disableValidation, errorLine, editable, val, autoFocus, keyboardType, placeHolder, lines, multiLine, Password, onChange }, ref) => {
    const [open, setOpen] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [inputVal, setInputVal] = useState(val ? val : '');
    const isError = useSelector((state: any) => state.root.isError);
    const errorMsg = useSelector((state: any) => state.root.errorMsg);
    const errorTitle = useSelector((state: any) => state.root.errorTitle);

    const handleFocus = () => {
      setIsActive(true);
    };

    const handleBlur = () => {
      setIsActive(false);
    };

    useEffect(() => {
      setInputVal(val ? val : '');
    }, [val]);

    return (
      <>
        <View style={styles.inputContainer(height)}>
          {inputVal?.length && inputVal?.length > 0 ? (
            <Text style={styles.inputtitle(isActive, inputVal, errorLine)}>{title}</Text>
          ) : (
            isActive && <Text style={styles.inputtitle(isActive, inputVal, errorLine)}>{title}</Text>
          )}
          <View style={styles.textInputContainer(isActive)}>
            {!Password ? (
              <TextInput
                ref={ref} // Add ref here
                selectionColor={'orange'}
                placeholder={isActive ? '' : placeHolder}
                value={inputVal}
                autoFocus={autoFocus ? true : false}
                onFocus={handleFocus}
                editable={editable == false ? editable : true}
                placeholderTextColor={Colors.fontColor}
                multiline={multiLine || false}
                numberOfLines={lines}
                keyboardType={keyboardType ? keyboardType : 'default'}
                maxLength={maxLength ? maxLength : undefined}
                onBlur={handleBlur}
                onChangeText={(text) => {
                  setInputVal(text);
                  if (onChange) {
                    onChange(text);
                  }
                }}
                style={[
                  styles.input(false, isActive, inputVal, errorLine, errorTitle, title, disableValidation),
                ]}
              />
            ) : (
              <View style={styles.passwordContainer(isActive, inputVal, errorLine, errorTitle, title, disableValidation)}>
                <View style={{ flex: 9 }}>
                  <TextInput
                    ref={ref} // Add ref here
                    selectionColor={'orange'}
                    placeholder={isActive ? '' : placeHolder}
                    placeholderTextColor={Colors.fontColor}
                    autoFocus={autoFocus ? true : false}
                    value={inputVal}
                    maxLength={maxLength ? maxLength : undefined}
                    editable={editable == false ? editable : true}
                    keyboardType={keyboardType ? keyboardType : 'default'}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChangeText={(text) => {
                      setInputVal(text);
                      if (onChange) {
                        onChange(text);
                      }
                    }}
                    secureTextEntry={open ? true : false}
                    style={styles.input(true, isActive, inputVal)}
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setOpen(!open)}
                  style={styles.eyeContainer}>
                  <Feather
                    color={isActive ? Colors.black : inputVal.length > 0 ? Colors.black : Colors.lightGrey}
                    size={platform === 'ios' ? RFPercentage(2.2) : RFValue(20, windowHeight)}
                    name={open ? 'eye-off' : 'eye'}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        {!disableValidation && errorMsg && errorTitle === 'all' ? (
          <Text
            style={[
              {
                color: 'red',
                marginBottom: RFValue(10, windowHeight),
                marginLeft: 5,
              },
            ]}>
            {errorMsg}
          </Text>
        ) : (
          errorTitle?.toLowerCase() === title?.toLowerCase() && (
            <Text
              style={[
                {
                  color: 'red',
                  marginBottom: RFValue(10, windowHeight),
                  marginLeft: 5,
                },
              ]}>
              {errorMsg}
            </Text>
          )
        )}
      </>
    );
  }
);

export default memo(OutlinedTextInput);