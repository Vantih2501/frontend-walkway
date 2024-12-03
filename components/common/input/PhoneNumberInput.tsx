import React, { useRef } from 'react';
import { Form, Input } from 'antd';
import type { FormItemProps } from 'antd';
import type { InputRef } from 'antd/lib/input';

interface PhoneNumberInputProps {
  name?: string;
  label?: React.ReactNode;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  name = "phone_number",
  label = "Phone Number",
  required = true,
  className,
  placeholder
}) => {
  const inputRef = useRef<InputRef>(null);
  const previousValueRef = useRef<string>("");
  const previousCursorRef = useRef<number>(0);

  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length === 0) return "";

    let formatted = "";
    // First group (3 digits)
    if (cleaned.length >= 3) {
      formatted = cleaned.slice(0, 3);
      if (cleaned.length > 3) formatted += "-";
    } else {
      return cleaned;
    }

    // Second group (4 digits)
    if (cleaned.length >= 7) {
      formatted += cleaned.slice(3, 7);
      if (cleaned.length > 7) formatted += "-";
    } else if (cleaned.length > 3) {
      formatted += cleaned.slice(3);
      return formatted;
    }

    // Third group (up to 5 digits)
    if (cleaned.length > 7) {
      formatted += cleaned.slice(7, 12);
    }

    return formatted;
  };

  const calculateCursorPosition = (
    previousValue: string,
    newValue: string,
    previousCursor: number,
    isDelete: boolean
  ): number => {
    // Adding character
    if (!isDelete) {
      // If we're at a position where a dash should be added
      if (previousCursor === 3 || previousCursor === 8) {
        return previousCursor + 2;
      }
      // If we're after a dash position
      if (previousCursor > 3) {
        const dashesBeforeCursor = (
          previousValue.slice(0, previousCursor).match(/-/g) || []
        ).length;
        const dashesInNewValue = (
          newValue.slice(0, previousCursor).match(/-/g) || []
        ).length;
        return previousCursor + (dashesInNewValue - dashesBeforeCursor);
      }
      return previousCursor + 1;
    }
    // Deleting character
    else {
      // If we're right after a dash, move cursor before the dash
      if (previousValue[previousCursor - 1] === "-") {
        return previousCursor - 1;
      }
      return previousCursor;
    }
  };

  const validatePhoneNumber = (_: any, value: string): Promise<void> => {
    if (!value && required) {
      return Promise.reject("Please input your phone number");
    }

    if (value) {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length < 10) {
        return Promise.reject("Phone number must be at least 10 digits");
      }

      if (cleaned.length > 12) {
        return Promise.reject("Phone number cannot exceed 12 digits");
      }
    }

    return Promise.resolve();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): string => {
    const input = e.target;
    const cursorPosition = input.selectionStart || 0;
    const isDelete = previousValueRef.current.length > input.value.length;

    // Store current values before formatting
    previousCursorRef.current = cursorPosition;
    previousValueRef.current = input.value;

    // Format the phone number
    const formatted = formatPhoneNumber(input.value);

    // Calculate new cursor position
    const newCursorPosition = calculateCursorPosition(
      previousValueRef.current,
      formatted,
      cursorPosition,
      isDelete
    );

    // Set cursor position after React re-render
    setTimeout(() => {
      if (inputRef.current?.input) {
        inputRef.current.input.setSelectionRange(
          newCursorPosition,
          newCursorPosition
        );
      }
    }, 0);

    return formatted;
  };

  const rules: FormItemProps["rules"] = [
    {
      validator: validatePhoneNumber,
      validateTrigger: ["onChange", "onBlur"],
    },
  ];

  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      required={required}
      getValueFromEvent={(e) => handleChange(e)}
      className={className}
    >
      <Input
        ref={inputRef}
        addonBefore="+62"
        placeholder={placeholder}
        className="phone-input"
        maxLength={14}
      />
    </Form.Item>
  );
};

export default PhoneNumberInput;