import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Platform,
} from "react-native";

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
      style={[styles.checkboxContainer, style]}
      onPress={handleCheckboxToggle}
      disabled={disabled}
      testID={`checkbox=${value}`}>
      <View style={checkboxStyle}>
        {selected && (
          <Text style={styles.checkmark} testID={`checkmark=${value}`}>
            &#10003;
          </Text>
        )}
      </View>
      <Text style={labelStyle}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxDisabled: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
  },
  checkmark: {
    color: "#000",
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
    color: "#000",
    opacity: 0.5,
  },
  label: {
    color: "#000",
    opacity: 1,
  },
});
