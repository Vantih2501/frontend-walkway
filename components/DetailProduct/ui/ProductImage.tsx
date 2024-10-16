"use client";

import React from "react";
import {
	DownloadOutlined,
	LeftOutlined,
	RightOutlined,
	RotateLeftOutlined,
	RotateRightOutlined,
	SwapOutlined,
	UndoOutlined,
	ZoomInOutlined,
	ZoomOutOutlined,
} from "@ant-design/icons";
import { Image, Space } from "antd";

const imageList = [
	"/mock/shoe-mock-1.png",
	"/mock/shoe-mock-2.png",
	"/mock/shoe-mock-3.png",
	"/mock/shoe-mock-4.png",
];

// you can download flipped and rotated image
// https://codesandbox.io/s/zi-ding-yi-gong-ju-lan-antd-5-7-0-forked-c9jvmp
const ProductImage = () => {
	const image = imageList[0]
	const images = imageList.slice(1)

	const [current, setCurrent] = React.useState(0);

	// or you can download flipped and rotated image
	// https://codesandbox.io/s/zi-ding-yi-gong-ju-lan-antd-5-7-0-forked-c9jvmp
	const onDownload = () => {
		const url = imageList[current];
		const suffix = url.slice(url.lastIndexOf("."));
		const filename = Date.now() + suffix;

		fetch(url)
			.then((response) => response.blob())
			.then((blob) => {
				const blobUrl = URL.createObjectURL(new Blob([blob]));
				const link = document.createElement("a");
				link.href = blobUrl;
				link.download = filename;
				document.body.appendChild(link);
				link.click();
				URL.revokeObjectURL(blobUrl);
				link.remove();
			});
	};

	return (
		<Image.PreviewGroup
			preview={{
				toolbarRender: (
					_,
					{
						transform: { scale },
						actions: {
							onActive,
							onFlipY,
							onFlipX,
							onRotateLeft,
							onRotateRight,
							onZoomOut,
							onZoomIn,
							onReset,
						},
					}
				) => (
					<Space size={12} className="toolbar-wrapper">
						<LeftOutlined onClick={() => onActive?.(-1)} />
						<RightOutlined onClick={() => onActive?.(1)} />
						<DownloadOutlined onClick={onDownload} />
						<SwapOutlined rotate={90} onClick={onFlipY} />
						<SwapOutlined onClick={onFlipX} />
						<RotateLeftOutlined onClick={onRotateLeft} />
						<RotateRightOutlined onClick={onRotateRight} />
						<ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
						<ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
						<UndoOutlined onClick={onReset} />
					</Space>
				),
				onChange: (index) => {
					setCurrent(index);
				},
			}}
		>
			<div className="aspect-square w-full relative mb-3 overflow-hidden rounded-xl group">
				<Image
					src={image}
					alt="Current Image"
                    width={"100%"}
					className="bg-primary-100 h-auto transition-transform duration-300 ease-in-out group-hover:scale-105"
				/>
			</div>
			<div className="grid grid-cols-3 gap-3">
				{images.map((item, index) => (
					<div key={index} className="group aspect-square border border-zinc-300 rounded-xl flex justify-center items-center overflow-hidden">
						<Image
							src={item}
							width={"100%"}
							alt={`Image ${index}`}
							className="aspect-square transition-transform duration-300 ease-in-out group-hover:scale-105"
						/>
					</div>
				))}
			</div>
		</Image.PreviewGroup>
	);
};

export default ProductImage;
