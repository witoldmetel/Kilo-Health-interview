import { QuestionOption } from '@typings/questions';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { DefaultButton } from './DefaultButton';

type CheckboxButtonProps = {
  // @todo: Make generic
  item: QuestionOption;
  selectedItems: QuestionOption[];

  handleChange: (value: string) => void;
};

export const CheckboxButton = ({
  item,
  selectedItems,
  handleChange,
}: CheckboxButtonProps) => {
  const isItemChecked = selectedItems.find(
    selectedItem => selectedItem.value === item.value,
  );

  return (
    <DefaultButton
      onPress={() => handleChange(item.value)}
      title={item.label}
      style={{ backgroundColor: isItemChecked && '#F3E7D1' }}
    >
      <MaterialCommunityIcons
        name={isItemChecked ? 'checkbox-marked' : 'checkbox-blank-outline'}
        size={24}
        color={isItemChecked ? '#612e3a' : '#EBD7B3'}
      />
    </DefaultButton>
  );
};
