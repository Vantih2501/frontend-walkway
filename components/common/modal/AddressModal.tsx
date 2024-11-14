"use client";
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import PhoneNumberInput from "../input/PhoneNumberInput";
import TextArea from "antd/es/input/TextArea";
import { useArea } from "#/hooks/area";

interface ModalProps {
  open: boolean;
  onFinish: (value: any) => void;
  onCancel: () => void;
  loading?: boolean;
  isEditing?: boolean;
  address?: Address;
  form: any
}

const AddressModalForm = ({
  open,
  onFinish,
  onCancel,
  loading,
  address,
  isEditing,
  form
}: ModalProps) => {

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSubDistrict, setSelectedSubDistrict] = useState("");
  const [selectedZipCode, setSelectedZipCode] = useState("");

  const { fetchProvince, fetchCity, fetchSubDistrict, fetchZipCode } =
    useArea();
  const { province, isLoading: provinceLoading } = fetchProvince();
  const { city, isLoading: cityLoading } = fetchCity(selectedProvince);
  const { subDistrict, isLoading: subDistrictLoading } =
    fetchSubDistrict(selectedCity);
  const { zipCode, isLoading: zipCodeLoading } =
    fetchZipCode(selectedSubDistrict);

  useEffect(() => {
    if (address && isEditing) {
      form.setFieldsValue({
        id: address.id,
        contact_name: address.contact_name,
        contact_number: address.contact_number,
        province: address.province,
        city: address.city,
        district: address.district,
        zipcode: address.zipcode,
        address: address.address,
        note: address.note,
      });
    } else {
      form.resetFields();
    }
  }, [address, isEditing, form]);

  return (
    <Modal
      footer={[
        <Button
          block
          loading={loading}
          type="primary"
          htmlType="submit"
          className="h-11"
        >
          {isEditing ? "Update Data" : "Add Data"}
        </Button>,
      ]}
      open={open}
      title={isEditing ? "Edit Address Data" : "Add Address Data"}
      onCancel={() => {
        form.resetFields();
        setSelectedProvince("");
        setSelectedCity("");
        setSelectedSubDistrict("");
        setSelectedZipCode("");
        onCancel();
      }}
      destroyOnClose
      modalRender={(dom) => (
        <Form
          layout="vertical"
          form={form}
          name="form_in_modal"
          requiredMark="optional"
          onFinish={(values) => {
            const formattedValues = {
              ...values,
              contact_number: "+62" + values.contact_number.replace(/-/g, ""),
              zipcode: Number(values.zipcode),
            };
            onFinish(formattedValues);
            setSelectedProvince("");
            setSelectedCity("");
            setSelectedSubDistrict("");
            setSelectedZipCode("");
          }}
        >
          {dom}
        </Form>
      )}
    >
      <div className="flex flex-col gap-5 ">
        {isEditing && (
          <Form.Item name="id" hidden>
            <Input hidden />
          </Form.Item>
        )}

        <div className="grid items-start grid-cols-2 gap-x-2 gap-y-2 ">
          <label htmlFor="" className="col-span-2">
            Contact Info
          </label>
          <Form.Item
            name="contact_name"
            rules={[{ required: true, message: "Please input contact name!" }]}
          >
            <Input className="h-10" placeholder="Enter contact name" />
          </Form.Item>

          <PhoneNumberInput
            name="contact_number"
            required
            label=""
            placeholder="Enter contact phone number"
          />
        </div>

        <div className="grid items-end grid-cols-2 gap-x-2 gap-y-2">
          <label htmlFor="" className="col-span-2">
            Delivery Address
          </label>

          <Form.Item
            name="province"
            rules={[{ required: true, message: "Please select a province" }]}
          >
            <Select
              placeholder="Select province"
              className="h-10"
              loading={provinceLoading}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onChange={(value) => {
                setSelectedProvince(value);
                form.setFieldValue("city", null);
                setSelectedCity("");
                form.setFieldValue("district", null);
                setSelectedSubDistrict("");
                form.setFieldValue("zipCode", null);
              }}
              options={province?.map((province: any) => ({
                value: province,
                label: province,
              }))}
            />
          </Form.Item>

          <Form.Item
            name="city"
            rules={[{ required: true, message: "Please select a city" }]}
          >
            <Select
              placeholder="Select city"
              className="h-10"
              loading={cityLoading}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onChange={(value) => {
                setSelectedCity(value);
                form.setFieldValue("district", null);
                setSelectedSubDistrict("");
                form.setFieldValue("zipCode", null);
              }}
              options={city?.map((city: any) => ({
                value: city,
                label: city,
              }))}
              disabled={!selectedProvince}
            />
          </Form.Item>

          <Form.Item
            name="district"
            rules={[
              { required: true, message: "Please select a sub discrict" },
            ]}
          >
            <Select
              placeholder="Select sub discrict"
              className="h-10"
              loading={subDistrictLoading}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onChange={(value) => {
                setSelectedSubDistrict(value);
                form.setFieldValue("zipCode", null);
              }}
              options={subDistrict?.map((subDistrict: any) => ({
                value: subDistrict,
                label: subDistrict,
              }))}
              disabled={!selectedCity}
            />
          </Form.Item>

          <Form.Item
            name="zipcode"
            rules={[{ required: true, message: "Please select a zip code" }]}
          >
            <Select
              placeholder="Select zip code"
              className="h-10"
              loading={zipCodeLoading}
              onChange={(value) => setSelectedZipCode(value)}
              options={zipCode?.map((zipCode: any) => ({
                value: zipCode,
                label: zipCode,
              }))}
              disabled={!selectedSubDistrict}
            />
          </Form.Item>

          <Form.Item
            name="address"
            className="col-span-2"
            rules={[{ required: true, message: "Please enter address detail" }]}
          >
            <TextArea
              rows={3}
              placeholder="Street Name, Building, House Number, etc."
              style={{ resize: "none" }}
            />
          </Form.Item>

          <Form.Item
            name="note"
            className="col-span-2"
            rules={[{ required: false, message: "Please select a province" }]}
          >
            <TextArea
              rows={2}
              placeholder="Additional Details (Block/Unit Number, Landmarks) *OPTIONAL"
              style={{ resize: "none" }}
            />
          </Form.Item>
        </div>
      </div>
    </Modal>
  );
};

export default AddressModalForm;
