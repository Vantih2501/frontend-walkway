import React, { useState, ChangeEvent } from "react";
import { Input, Form, Tooltip } from "antd";
import type { FormItemProps } from "antd/es/form";
import { InfoCircleOutlined } from "@ant-design/icons";

interface FormattedPriceInputProps {
  name?: string;
  disabled?: boolean;
  required?: boolean;
  minimumBid?: number;
  placeholder?: string;
  currencyPrefix?: string;
  onChange?: (value: number | undefined) => void;
}

const BidInput: React.FC<FormattedPriceInputProps> = ({
  name = "bid_amount",
  disabled = false,
  required = true,
  minimumBid = 1,
  placeholder = "Place bid amount",
  currencyPrefix = "Rp",
  onChange,
}) => {
  const [displayValue, setDisplayValue] = useState<string>("");

  // PostgreSQL INTEGER max value
  const MAX_BID_VALUE = 2147483647;
  const MAX_REASONABLE_BID = minimumBid + 100000;

  const formatNumber = (value: string): string => {
    // Remove non-digit characters
    const numericValue = value.replace(/\D/g, "");

    // Ensure the number doesn't exceed PostgreSQL INTEGER limit
    const numberValue = Number(numericValue);
    if (numberValue > MAX_BID_VALUE) {
      return formatNumber(MAX_BID_VALUE.toString());
    }

    // Format with thousand separators
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    // Store raw numeric value
    const numericValue = value.replace(/\D/g, "");
    const numberValue = numericValue ? Number(numericValue) : undefined;

    // Update display value with formatting
    setDisplayValue(formatNumber(numericValue));

    // Call onChange with numeric value if provided
    if (onChange) {
      onChange(numberValue);
    }
  };

  // Define form rules
  const rules: FormItemProps["rules"] = [
    {
      required,
      message: `Please input bid amount`,
    },
    {
      validator: async (_, value) => {
        const numericValue = value?.toString().replace(/\D/g, "");

        if (value && isNaN(Number(numericValue))) {
          throw new Error("Please enter a valid number");
        }

        const numberValue = numericValue ? Number(numericValue) : undefined;

        if (numberValue !== undefined) {
          // Check minimum bid
          if (numberValue < minimumBid) {
            throw new Error(
              `Minimum bid amount is ${currencyPrefix} ${minimumBid.toLocaleString(
                "en-US"
              )}`
            );
          }

          // Check if bid is unreasonably high
          if (numberValue > MAX_REASONABLE_BID) {
            throw new Error(
              `Maximum bid cannot exceed ${currencyPrefix} ${MAX_REASONABLE_BID.toLocaleString(
                "en-US"
              )}`
              //  \n (${currencyPrefix} ${minimumBid.toLocaleString(
              //   "en-US"
              // )} + ${currencyPrefix} 1,000,000)`
            );
          }

          // Check if bid exceeds PostgreSQL INTEGER limit
          if (numberValue > MAX_BID_VALUE) {
            throw new Error(`Bid amount exceeds maximum allowed value`);
          }
        }
      },
      validateTrigger: "onSubmit", // Only validate on form submission
    },
  ];

  return (
    <Form.Item
      name={name}
      rules={rules}
      getValueFromEvent={(e: ChangeEvent<HTMLInputElement>) => {
        const numericValue = e.target.value.replace(/\D/g, "");
        const numberValue = Number(numericValue);
        // Limit the input value to PostgreSQL INTEGER max
        if (numberValue > MAX_BID_VALUE) {
          return MAX_BID_VALUE;
        }
        return numericValue ? numberValue : undefined;
      }}
      normalize={(value: number | string | undefined): string => {
        if (value === undefined || value === null) return "";
        return formatNumber(String(value));
      }}
      className="flex-1 bid-input"
      validateFirst
      validateTrigger={["onSubmit"]} // Only validate on form submission
    >
      <Input
        type="text"
        disabled={disabled}
        value={displayValue}
        onChange={handleChange}
        className="h-14 bid-input"
        addonBefore={currencyPrefix}
        placeholder={`Min. bid ${currencyPrefix} ${minimumBid.toLocaleString(
          "en-US"
        )}`}
        maxLength={10} // Limit input length to prevent overflow
      />
    </Form.Item>
  );
};

export default BidInput;
