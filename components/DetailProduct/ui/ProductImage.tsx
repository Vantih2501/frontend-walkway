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

interface ImageProps {
	imageUrl: string[]
}
// you can download flipped and rotated image
// https://codesandbox.io/s/zi-ding-yi-gong-ju-lan-antd-5-7-0-forked-c9jvmp
const ProductImage = ({ imageUrl }: ImageProps) => {
	const image = imageUrl[0]
	const images = imageUrl.slice(1)

	const [current, setCurrent] = React.useState(0);

	// or you can download flipped and rotated image
	// https://codesandbox.io/s/zi-ding-yi-gong-ju-lan-antd-5-7-0-forked-c9jvmp
	const onDownload = () => {
		const url = imageUrl[current];
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
			<div className="relative w-full mb-3 overflow-hidden aspect-square rounded-xl group">
				<Image
					src={image}
					alt="Current Image"
                    width={"100%"}
					className="h-auto transition-transform duration-300 ease-in-out bg-primary-100 group-hover:scale-105"
				/>
			</div>
			<div className="grid grid-cols-3 gap-3">
				{images.map((item, index) => (
					<div key={index} className="flex items-center justify-center overflow-hidden border group aspect-square border-zinc-300 rounded-xl">
						<Image
							src={item}
							width={"100%"}
							alt={`Image ${index}`}
							className="transition-transform duration-300 ease-in-out aspect-square group-hover:scale-105"
						/>
					</div>
				))}
			</div>
		</Image.PreviewGroup>
	);
};

export default ProductImage;
