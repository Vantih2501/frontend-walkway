"use client";
import { useUser } from "#/hooks/user";
import { formatPhoneNumber } from "#/utils/formatter";
import { getAccessToken } from "#/utils/token";
import { Button, Divider, Form, Input, Modal, Select } from "antd";
import { Plus } from "lucide-react";
import React, { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onCancel: () => void;
  loading: boolean;
  address?: Address[];
  user?: User;
  onAdd: () => void;
}

const ChangeAddressModal = ({
  open,
  onCancel,
  loading,
  onAdd,
  user,
  address,
}: ModalProps) => {
  const { setDefaultAddress } = useUser();
  const token = getAccessToken();

  const handleChangeAddress = async (id: any) => {
    try {
      await setDefaultAddress(user?.email, id, token);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal
      footer={
        <Button
          block
          onClick={() => onAdd()}
          type="primary"
          icon={<Plus className="w-4" />}
        >
          Add New Address
        </Button>
      }
      open={open}
      title="Address List"
      onCancel={() => {
        onCancel();
      }}
      destroyOnClose
    >
      <div className="py-2.5 space-y-2">
        {address?.map((data, index) => (
          <div key={data.id}>
            <div className="px-2 space-y-3">
              <p>
                <span className="font-medium">{data?.contact_name}</span> |{" "}
                {formatPhoneNumber(data?.contact_number)}
              </p>
              <p className="w-3/5 leading-snug">{data?.address}</p>
              <Button
                type="primary"
                size="small"
                disabled={data.id === user?.defaultAddress}
                onClick={() => handleChangeAddress(data.id)}
              >
                {data.id === user?.defaultAddress ? "Used" : "Use"}
              </Button>
            </div>
            {index < address.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ChangeAddressModal;
