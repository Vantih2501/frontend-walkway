"use client";

import {
  LeftOutlined,
  LoadingOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  GetProp,
  InputNumber,
  message,
  Space,
  Upload,
  UploadProps,
} from "antd";
import { useState } from "react";

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

interface StockUpProps {
  closeUpCard: () => void;
}

// START

const EditStock: React.FC<StockUpProps> = ({ closeUpCard }) => {
  const [sizes, setSizes] = useState([{ size: 8, stock: 12 }]);

  const addNewSize = () => {
    const lastSize = sizes[sizes.length - 1].size; // Ambil size terakhir
    const newSize = lastSize + 0.5; // Tambahkan 0.5 ke size terakhir
    setSizes([...sizes, { size: parseFloat(newSize.toFixed(1)), stock: 12 }]); 
  };

  const updateSize = (index: number, newSize: number) => {
    const updatedSizes = sizes.map((item, i) =>
      i === index ? { ...item, size: newSize } : item
    );
    setSizes(updatedSizes);
  };

  const updateStock = (index: number, newStock: number) => {
    const updatedSizes = sizes.map((item, i) =>
      i === index ? { ...item, stock: newStock } : item
    );
    setSizes(updatedSizes);
  };

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

  return (
    <div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
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
        <div className="flex">
          <p className="font-semibold mx-12">Size</p>
          <p className="font-semibold mx-3">Stock</p>
        </div>

        {sizes.map((item, index) => (
          <Card
            key={index}
            className="mx-2 w-56 rounded-2xl max-h-9 border-2 border-slate-300 mb-4"
          >
            <div className="flex mt-2">
              <p
                className="mx-12 w-11 border-hidden bg-transparent mr-6">{item.size}
              </p>
              <div className="flex -mt-1">
                <Button type="text" className="-mx-8 -mt-1" onClick={() => updateStock(index, item.stock - 1)}>
                  <LeftOutlined />
                </Button>
                <input
                 type="number"
                  min={5}
                  value={item.stock}
                  onChange={(e) =>
                    updateStock(index, parseFloat(e.target.value))
                  }
                  placeholder="Stock"
                  className="w-10 text-sm max-h-6 mx-7 border-current rounded-md"
                />
                <Button type="text" onClick={() => updateStock(index, item.stock + 1)}>
                  <RightOutlined style={{ marginLeft:'-55px', marginTop:'-10px' }} />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        <Button className="mx-2 w-56 rounded-2xl mb-4" onClick={() => addNewSize()}>
          <PlusOutlined /> Add new size
        </Button>

        <Card className="mx-2 w-56 rounded-2xl max-h-8 border-2 border-slate-300">
          <div className="flex mt-1">
            <p className="mx-8">Total Stock</p>
            <p className=" mx-3">{sizes.reduce((acc, curr) => acc + curr.stock, 0)}</p>
          </div>
        </Card>
        <br />
        <br />
        <Form.Item>
          <div className="flex">
            <Button onClick={closeUpCard}>Discard</Button>
            <Button
              onClick={closeUpCard}
              className="mx-3"
              type="primary"
              htmlType="submit"
            >
              Save Changes
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditStock;
