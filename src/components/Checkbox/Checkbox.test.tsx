import { render, fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  const label = "Checkbox";
  const value = "checkboxValue";
  const onSelect = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders unchecked checkbox", () => {
    render(
      <Checkbox
        label={label}
        value={value}
        selected={false}
        onSelect={onSelect}
      />
    );
    const checkbox = screen.getByText(label);

    expect(checkbox).toBeDefined();
    expect(checkbox.props.style.opacity).toBe(1);
  });

  it("renders checked checkbox", () => {
    render(
      <Checkbox
        label={label}
        value={value}
        selected={true}
        onSelect={onSelect}
      />
    );
    const checkbox = screen.getByText(label);
    const checkmark = screen.getByTestId(`checkmark=${value}`);

    expect(checkbox).toBeDefined();
    expect(checkbox.props.style.opacity).toBe(1);
    expect(checkmark).toBeDefined();
    expect(checkmark.props.style).toHaveProperty("fontSize", 14);
  });

  it("renders disabled checkbox", () => {
    render(
      <Checkbox
        label={label}
        value={value}
        selected={false}
        disabled={true}
        onSelect={onSelect}
      />
    );
    const checkbox = screen.getByText(label);

    expect(checkbox).toBeDefined();
    expect(checkbox.props.style.opacity).toBe(0.5);
    expect(checkbox.props.style).toHaveProperty("color", "#000");
  });

  it("triggers onSelect when clicked", () => {
    render(
      <Checkbox
        label={label}
        value={value}
        selected={false}
        onSelect={onSelect}
      />
    );
    const checkbox = screen.getByText(label);

    fireEvent.press(checkbox);

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(value);
  });

  it("does not trigger onSelect when clicked on disabled checkbox", () => {
    render(
      <Checkbox
        label={label}
        value={value}
        selected={false}
        disabled={true}
        onSelect={onSelect}
      />
    );
    const checkbox = screen.getByText(label);

    fireEvent.press(checkbox);

    expect(onSelect).not.toHaveBeenCalled();
  });
});
