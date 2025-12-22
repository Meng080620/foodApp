import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Icons from '../icons';
import { COLORS } from '../../constants/COLORS';


interface SearchBarProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar  = ({placeholder = "Search for restaurants and groceries"  , onChangeText} : SearchBarProps)  =>  {
  const [value, setValue] = useState('');

  const handleChange = (text: string) => {
    setValue(text);
    onChangeText?.(text);
  };

  const clearInput = () => {
    setValue('');
    onChangeText?.('');
  };

  const dismissKeyboard = () => Keyboard.dismiss();

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        {/* Search Icon */}
        <Icons name="search" size={32} color={COLORS.dark} />

        {/* Input */}
        <TextInput
          value={value}
          onChangeText={handleChange}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.dark}
          returnKeyType="search"
          accessibilityLabel="Search input"
          onSubmitEditing={dismissKeyboard} // dismiss keyboard on submit
        />

        {/* Clear Icon */}
        {value.length > 0 && (
          <TouchableOpacity onPress={clearInput} hitSlop={10}>
            <Icons name="crosscircle" size={16} color={COLORS.dark} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 50,
    paddingHorizontal: 12,
    height: 44,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  input: {
    flex: 1,
    marginHorizontal: 6,
    fontSize: 15,
    color: COLORS.dark,
  },
});
