import React from "react";
import { FlatList, View } from "react-native";

import { Checkbox } from "../Checkbox/Checkbox";

export type ICheckboxComponent<T> = {
  label: string;
  value: T;
  disabled?: boolean;
};

type IItem<T> = {
  item: ICheckboxComponent<T>;
};

interface CheckboxListProps<T> {
  items: ICheckboxComponent<T>[];
  selectedValues: T[];

  onSelectionChange: (selectedValues: T[]) => void;
}

export function CheckboxList<T>({
  items,
  selectedValues,
  onSelectionChange,
}: CheckboxListProps<T>) {
  const handleCheckboxToggle = (value: T) => {
    const isSelected = selectedValues.includes(value);

    const updatedValues = isSelected
      ? selectedValues.filter((selectedValue) => selectedValue !== value)
      : [...selectedValues, value];

    onSelectionChange(updatedValues);
  };

  return (
    <FlatList
      data={items}
      renderItem={({ item }: IItem<T>) => (
        <Checkbox<T>
          label={item.label}
          value={item.value}
          selected={selectedValues.includes(item.value)}
          disabled={item.disabled}
          onSelect={handleCheckboxToggle}
        />
      )}
      keyExtractor={(item) => item.label}
      style={{ padding: 2 }}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      testID="checkbox-list"
    />
  );
}
