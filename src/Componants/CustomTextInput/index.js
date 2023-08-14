import React, { PureComponent } from "react";
import {
  Platform,
  View,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import { Button, Searchbar } from "react-native-paper";
import styles from "./styles";
import { TextInput } from "react-native-paper";

const CustomTextInput = ({
  InputStyle,
  autoFocus,
  textRef,
  label,
  disable,
  placeholder,
  containerStyle,
  keyboardType,
  mode,
  multiline,
  onChangeText,
  onEndEditing,
  selectionColor,
  onSubmitEditing,
  value,
  secureTextEntry,
  maxLength,
  checkForErrorToShow,
  isAutoCapitalise,
  underlineColor,
  onFocus,
  leftIcon,
  leftIconStyle,
  leftIconPress,
  rightIcon,
  rightIconPress,
  rightIconStyle,
  returnKeyType,
  errorMsg,
  placeholderStyle,
  infoIcon,
  helpPress,
  numberOfLines,
  keyboardDismissMode,
  Searchbar, placeholderTextColor,
  outlineColor,
  activeOutlineColor,
  outlineStyle,
  onPressIn,blurOnSubmit,
  ref,
  onKeyDown,
  showSoftInputOnFocus,
  
  ...res
}) => {


// const focus=()=> {
//     //method to focus the textinput
//     ref.focus();
//   }
  return (
    <View>
      <View style={styles.InputStyleView1}>
        <TextInput
        onKeyDown={onKeyDown}
        showSoftInputOnFocus={showSoftInputOnFocus}
          placeholder={placeholder}
          style={placeholderStyle ? [styles.placeholderStyle, styles.InputStyleView] : Searchbar ? styles.SearchbarStyl : styles.InputStyleView}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={blurOnSubmit}
          ref={ref}
          textRef={textRef}
          placeholderTextColor={placeholderTextColor}
          autoFocus={autoFocus}
          label={label}
          errorMsg={errorMsg}
          onChangeText={onChangeText}
          underlineColor="transparent"
          contentStyle={styles.contentStyle}
          cursorColor={'black'}
          theme={{ colors: { text: "black", } }}
          right={rightIcon}
          left={leftIcon}
          leftIconPress={leftIconPress}
          rightIconPress={rightIconPress}
          rightIconStyle={rightIconStyle}
          caretHidden={false}
          mode={'outlined'}
          outlineColor={'transparent'}
          activeOutlineColor={activeOutlineColor}
          outlineStyle={styles.outlineStyle}
          onPressIn={onPressIn}
          value={value}
        />
      </View>
    </View>
  );
};

export default CustomTextInput;
