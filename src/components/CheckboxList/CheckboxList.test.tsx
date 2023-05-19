import { render, fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { CheckboxList, ICheckboxComponent } from "./CheckboxList";

describe("CheckboxList", () => {
  const items: ICheckboxComponent<string>[] = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];
  const onSelectionChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders checkboxes with correct labels", () => {
    render(
      <CheckboxList
        items={items}
        selectedValues={[]}
        onSelectionChange={onSelectionChange}
      />
    );

    items.forEach((item) => {
      const checkbox = screen.getByText(item.label);
      expect(checkbox).toBeDefined();
    });
  });

  it("triggers onSelectionChange when checkbox selection changes", () => {
    render(
      <CheckboxList
        items={items}
        selectedValues={[]}
        onSelectionChange={onSelectionChange}
      />
    );
    const option1Checkbox = screen.getByTestId(`checkbox=option1`);

    fireEvent.press(option1Checkbox);

    expect(onSelectionChange).toHaveBeenCalledTimes(1);

    const option2Checkbox = screen.getByTestId(`checkbox=option2`);

    fireEvent.press(option2Checkbox);
    fireEvent.press(option2Checkbox);

    expect(onSelectionChange).toHaveBeenCalledTimes(3);
  });

  it("updates selected checkboxes after triggering onSelectionChange", () => {
    render(
      <CheckboxList
        items={items}
        selectedValues={["option2"]}
        onSelectionChange={onSelectionChange}
      />
    );

    const option1Checkbox = screen.getByTestId(`checkbox=option1`);
    const option2Checkbox = screen.getByTestId(`checkbox=option2`);

    fireEvent.press(option1Checkbox);
    expect(onSelectionChange).toHaveBeenCalledTimes(1);

    fireEvent.press(option2Checkbox);
    expect(onSelectionChange).toHaveBeenCalledTimes(2);

    fireEvent.press(option1Checkbox);
    expect(onSelectionChange).toHaveBeenCalledTimes(3);
  });
});
