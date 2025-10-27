// ...existing code...
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Button } from "antd";

const { Dragger, LIST_IGNORE } = Upload;

const ChartUpload = ({
  uploadUrl, // nếu bỏ trống => chỉ preview local
  handleFileSelect,
  handleFileDrop,
  maxSizeMB = 20, // MB
}) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Validate and add preview — return LIST_IGNORE to avoid antd adding the file
  const beforeUpload = (file) => {
    if (!file.type.match("image.*")) {
      message.error("Chỉ cho phép file hình (jpg/png/webp).");
      return LIST_IGNORE;
    }
    if (file.size / 1024 / 1024 >= maxSizeMB) {
      message.error(`Ảnh phải nhỏ hơn ${maxSizeMB} MB.`);
      return LIST_IGNORE;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const previewFile = {
        uid: `${Date.now()}_${Math.random()}`,
        name: file.name,
        status: "done",
        url: e.target.result,
        originFileObj: file,
      };
      setFileList((prev) => [...prev, previewFile]);
    };
    reader.readAsDataURL(file);

    if (typeof handleFileSelect === "function") {
      handleFileSelect({ target: { files: [file] } });
    }

    // Prevent antd from auto-adding the file (avoids duplicates)
    return LIST_IGNORE;
  };

  // Keep controlled list in sync if antd triggers change (removes etc.)
  const handleChange = ({ fileList: newList }) => {
    // Normalize entries
    const normalized = newList
      .filter((f) => f && (f.uid || f.url || f.originFileObj))
      .map((f) =>
        f.url
          ? f
          : {
              uid: f.uid || `${Date.now()}_${Math.random()}`,
              name: f.name,
              status: f.status || "done",
              url: f.url || f.thumbUrl || undefined,
              originFileObj: f.originFileObj,
            }
      );
    setFileList(normalized);
  };

  const handleRemove = (file) => {
    setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  const startUpload = async () => {
    if (!fileList.length) {
      message.warning("Chọn file trước khi upload.");
      return;
    }
    if (!uploadUrl) {
      message.info("Không có uploadUrl — chỉ preview local.");
      return;
    }

    const formData = new FormData();
    fileList.forEach((f) => {
      const real = f.originFileObj || f;
      formData.append("files[]", real);
    });

    setUploading(true);
    try {
      const res = await fetch(uploadUrl, { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok) {
        const serverMsg = json?.message || JSON.stringify(json);
        message.error(serverMsg);
        console.error("Upload error response:", json);
        return;
      }
      message.success("Upload thành công.");
      setFileList([]);
    } catch (err) {
      console.error(err);
      message.error(err.message || "Upload thất bại.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Tải lên biểu đồ
      </h2>

      <Dragger
        accept=".jpg,.jpeg,.png,.webp"
        multiple={true} // allow any number of files
        fileList={fileList}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        onRemove={handleRemove}
        showUploadList={false} // hide default list (we render custom gallery)
        onDrop={(e) => {
          if (typeof handleFileDrop === "function") handleFileDrop(e);
        }}
        style={{ padding: 12 }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Files are previewed locally. Provide uploadUrl prop to enable manual
          upload.
        </p>
      </Dragger>

      {/* Custom horizontal gallery: larger thumbnails, no filenames */}
      <div
        className="preview-gallery"
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          paddingTop: 12,
          paddingBottom: 6,
        }}
      >
        {fileList.map((f) => (
          <div
            key={f.uid}
            style={{
              width: 200,
              height: 140,
              flex: "0 0 auto",
              borderRadius: 10,
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              position: "relative",
            }}
          >
            <img
              src={f.url}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <button
              type="button"
              onClick={() => handleRemove(f)}
              aria-label="Remove"
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                background: "rgba(0,0,0,0.5)",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "4px 6px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <Button
          onClick={() => {
            setFileList([]);
            message.info("Đã xoá danh sách file.");
          }}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ChartUpload;
// ...existing code...
