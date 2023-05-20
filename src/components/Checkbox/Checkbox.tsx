import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Platform,
} from 'react-native';

interface CheckboxProps<T> {
  label: string;
  value: T;
  selected: boolean;

  disabled?: boolean;
  style?: StyleProp<ViewStyle>;

  onSelect: (value: T) => void;
}

export function Checkbox<T>({
  label,
  value,
  selected,
  disabled,
  onSelect,
  style,
}: CheckboxProps<T>) {
  const handleCheckboxToggle = () => {
    if (!disabled) {
      onSelect(value);
    }
  };

  const checkboxStyle = disabled ? styles.checkboxDisabled : styles.checkbox;
  const labelStyle = disabled ? styles.labelDisabled : styles.label;

  return (
    <TouchableOpacity
      style={[
        styles.checkboxContainer,
        styles.shadowStyle,
        selected && styles.selectedStyle,
        style,
      ]}
      onPress={handleCheckboxToggle}
      disabled={disabled}
      testID={`checkbox=${value}`}
    >
      <Text style={labelStyle}>{label}</Text>
      <View style={[checkboxStyle, selected && styles.checkboxSelected]}>
        {selected && (
          <Text style={styles.checkmark} testID={`checkmark=${value}`}>
            &#10003;
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shadowStyle: {
    ...Platform.select({
      ios: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
        shadowColor: '#171717',
      },
      default: {
        // other platforms, web for example
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
    }),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    height: 52,
  },
  selectedStyle: {
    backgroundColor: '#F3E7D1',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#EBD7B3',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxDisabled: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  checkboxSelected: {
    borderColor: '#410413',
    backgroundColor: '#410413',
  },
  checkmark: {
    color: 'white',
    backgroundColor: '#410413',
    fontWeight: 'bold',
    ...Platform.select({
      ios: {
        fontSize: 14,
      },
      android: {
        fontSize: 12,
      },
      default: {
        // other platforms, web for example
        fontSize: 14,
      },
    }),
  },
  labelDisabled: {
    color: '#000',
    opacity: 0.5,
    fontSize: 16,
  },
  label: {
    color: '#612e3a',
    opacity: 1,
    fontSize: 16,
  },
});
