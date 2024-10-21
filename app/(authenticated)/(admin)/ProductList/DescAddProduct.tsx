"use client";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Form,
  GetProp,
  Input,
  message,
  Select,
  Space,
  Tag,
  Upload,
  UploadProps,
} from "antd";
import { useState } from "react";

const { Option } = Select;

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

interface DescAddProps {
  closeAddCard: () => void;
}

const DescAdd: React.FC<DescAddProps> = ({ closeAddCard }) => {
  // UPLOAD IMAGE

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  //   CATEGORI PRODUK
  const [selectedK, setSelectedK] = useState<string[]>([]);

  const kategoriP = ["Sneakers", "Casual", "Sport", "Running", "SkateBoarding"];

  const selectKategori = (kategori: string) => {
    if (selectedK.includes(kategori)) {
      // Jika tag sudah dipilih, hapus dari array
      setSelectedK(selectedK.filter((k) => k !== kategori));
    } else {
      // Jika tag belum dipilih, tambahkan ke array
      setSelectedK([...selectedK, kategori]);
    }
  };

  const handleAdd = () => {
    console.log("Tags yang dipilih:", selectedK);
    // mengirim tags yang dipilih
  };

  // FORM RP

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} defaultValue="Rp"></Select>
    </Form.Item>
  );

  return (
    <Form>
      <Form.Item valuePropName="fileList">
        <div className="fotoProduct mt-6">
          <Upload
            name="avatar"
            className="avatar-upload"
            showUploadList={false}
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>{" "}
      </Form.Item>
      <br />
      <Form.Item>
        <label htmlFor="">Product Name</label>
        <Space.Compact className="mt-3">
          <Form.Item
            name="brand"
            noStyle
            rules={[{ required: true, message: "Enter Brand!!" }]}
          >
            <Select placeholder="Brand" style={{ width: "100px" }}>
              <Option value="Zhejiang">Nike</Option>
              <Option value="Jiangsu">Addidas</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="nameProduct"
            noStyle
            rules={[{ required: true, message: "Enter Product Name!" }]}
          >
            <Input style={{ width: "150px" }} placeholder="Product Name" />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      <div className="flex">
        <p>Product Category</p>
        <Button
          type="primary"
          style={{ fontSize: "10px", height: 25, marginLeft: "50px" }}
          onClick={handleAdd}
        >
          <PlusOutlined /> Add
        </Button>
      </div>
      {kategoriP.map((kategori) => (
        <Button
          key={kategori}
          color="default"
          className={`tagProduk mx-1 ${
            selectedK.includes(kategori) ? "selected" : ""
          }`}
          onClick={() => selectKategori(kategori)}
        >
          {kategori}
        </Button>
      ))}

      <Form.Item
        name="price"
        rules={[{ required: true, message: "Please input Price!" }]}
      >
        <label htmlFor="">Price</label>
        <Input
          addonBefore={prefixSelector}
          style={{ width: "100%" }}
          className="mt-2"
        />
      </Form.Item>

      <Form.Item
        name="status"
        rules={[{ required: true, message: "Please input Status!" }]}
      >
        <label htmlFor="">Set Status</label>
        <Select placeholder="Choose Status">
          <Select.Option value="Avalaible">Avalaible</Select.Option>
          <Select.Option value="Avalaible">NonAvailable</Select.Option>
        </Select>
      </Form.Item>
      <br />
      <Form.Item className="flex">
        <Button onClick={closeAddCard}>Discard</Button>
        <Button
          onClick={closeAddCard}
          className="mx-3"
          type="primary"
          htmlType="submit"
        >
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DescAdd;
