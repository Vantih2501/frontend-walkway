import React, { useState, ChangeEvent } from "react";
import { Input, Form } from "antd";
import type { FormItemProps } from "antd/es/form";

interface FormattedPriceInputProps {
  name?: string;
  label?: React.ReactNode;
  required?: boolean;
  className?: string;
  placeholder?: string;
  currencyPrefix?: string;
  onChange?: (value: number | undefined) => void;
}

const BidInput: React.FC<FormattedPriceInputProps> = ({
  name = "price",
  label = "Price",
  required = true,
  className = "price-input",
  placeholder = "Enter your product price",
  currencyPrefix = "Rp",
  onChange,
}) => {
  const [displayValue, setDisplayValue] = useState<string>("");

  const formatNumber = (value: string): string => {
    // Remove non-digit characters
    const numericValue = value.replace(/\D/g, "");

    // Format with thousand separators
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    // Store raw numeric value
    const numericValue = value.replace(/\D/g, "");

    // Update display value with formatting
    setDisplayValue(formatNumber(numericValue));

    // Call onChange with numeric value if provided
    if (onChange) {
      onChange(numericValue ? Number(numericValue) : undefined);
    }
  };

  // Define form rules
  const rules: FormItemProps["rules"] = [
    {
      required,
      message: `Please input ${label?.toString().toLowerCase() || "price"}`,
    },
    {
      validator: (_, value) => {
        if (value && isNaN(Number(value.toString().replace(/\D/g, "")))) {
          return Promise.reject("Please enter a valid number");
        }
        return Promise.resolve();
      },
    },
  ];

  return (
    <Form.Item
      name={name}
      rules={rules}
      getValueFromEvent={(e: ChangeEvent<HTMLInputElement>) => {
        const numericValue = e.target.value.replace(/\D/g, "");
        return numericValue ? Number(numericValue) : undefined;
      }}
      normalize={(value: number | string | undefined): string => {
        if (value === undefined || value === null) return "";
        return formatNumber(String(value));
      }}
      className="w-full"
    >
      <Input
        addonBefore={currencyPrefix}
        placeholder={placeholder}
        className="h-14 bid-input"
        value={displayValue}
        onChange={handleChange}
        type="text" // Changed from "number" to "text" to better handle formatting
      />
    </Form.Item>
  );
};

export default BidInput;
