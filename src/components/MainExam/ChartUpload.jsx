import React, { useState } from "react";
// --- THAY ĐỔI: Import thêm 'Image' từ antd ---
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Button, Image } from "antd";

const { Dragger } = Upload;

// --- Component Preview Item (Cập nhật) ---
const PreviewItem = ({ file, onRemove }) => {
  return (
    <div
      key={file.uid}
      className="relative w-full h-48 md:h-56 rounded-lg overflow-hidden shadow-md bg-gray-100" // Tăng chiều cao, thêm nền
    >
      {/* --- THAY ĐỔI: Dùng <Image> của AntD để có preview --- */}
      <Image
        wrapperClassName="w-full h-full"
        src={file.url}
        alt={file.name}
        // Thêm style để đảm bảo ảnh và wrapper hoạt động tốt
        style={{ width: "100%", height: "100%", objectFit: "contain" }} // Đổi sang 'contain'
        preview={{
          // Tùy chọn: Thêm các thiết lập cho lightbox
          maskClassName: "rounded-lg",
        }}
      />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // Ngăn Dragger bị kích hoạt khi bấm nút X
          onRemove(file);
        }}
        aria-label="Remove"
        className="absolute top-2 right-2 z-10 bg-black/60 text-white rounded-full p-0.5 hover:bg-black/80 transition-all"
      >
        {/* Icon X (Close) bằng SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

const ChartUpload = ({
  uploadUrl,
  handleFileSelect, // Nhận prop này từ IeltsGrader
  handleFileDrop,
  maxSizeMB = 20,
}) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Validate and add preview
  const beforeUpload = (file) => {
    if (!file.type.match("image.*")) {
      message.error("Chỉ cho phép file hình (jpg/png/webp).");
      return Upload.LIST_IGNORE;
    }
    if (file.size / 1024 / 1024 >= maxSizeMB) {
      message.error(`Ảnh phải nhỏ hơn ${maxSizeMB} MB.`);
      return Upload.LIST_IGNORE;
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

      // --- THAY ĐỔI: Gọi handleFileSelect để báo cho cha biết có file ---
      if (typeof handleFileSelect === "function") {
        // Chúng ta tạo một "event" giả để IeltsGrader có thể đọc được
        handleFileSelect({ target: { files: [file] } });
      }
    };
    reader.readAsDataURL(file);

    return Upload.LIST_IGNORE;
  };

  // Keep controlled list in sync if antd triggers change (removes etc.)
  const handleChange = ({ fileList: newList }) => {
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

    // --- THAY ĐỔI: Báo cho cha biết nếu fileList rỗng ---
    if (newList.length === 0 && typeof handleFileSelect === "function") {
      handleFileSelect({ target: { files: [] } }); // Gửi mảng rỗng
    }
  };

  const handleRemove = (file) => {
    const newList = fileList.filter((f) => f.uid !== file.uid);
    setFileList(newList);

    // --- THAY ĐỔI: Báo cho cha biết nếu fileList rỗng sau khi xóa ---
    if (newList.length === 0 && typeof handleFileSelect === "function") {
      handleFileSelect({ target: { files: [] } }); // Gửi mảng rỗng
    }
  };

  // ... (Hàm startUpload giữ nguyên) ...
  const startUpload = async () => {
    // ... (code giữ nguyên) ...
  };

  return (
    // --- THAY ĐỔI: Chuyển div này vào IeltsGrader.jsx ---
    // <div className="bg-white rounded-lg shadow-md p-6">
    //   <h2 className="text-lg font-semibold text-gray-800 mb-4">
    //     Tải lên biểu đồ
    //   </h2>
    // ...
    // --- Bọc trong Fragment (hoặc giữ div nếu muốn) ---
    <>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        Tải Lên Ảnh Đề Bài
      </h2>
      <p className="text-sm text-gray-600 mb-3">
        Nếu đề bài của bạn là hình ảnh (biểu đồ, bản đồ...), hãy tải nó lên đây.
      </p>

      <Dragger
        accept=".jpg,.jpeg,.png,.webp"
        multiple={true}
        fileList={fileList}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        onRemove={handleRemove}
        showUploadList={false}
        onDrop={(e) => {
          if (typeof handleFileDrop === "function") handleFileDrop(e);
        }}
        className="transition-all"
        style={
          fileList.length > 0 ? { padding: 0, border: "none" } : { padding: 12 }
        }
      >
        {fileList.length === 0 ? (
          <>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Nhấn hoặc kéo thả file vào khu vực này để tải lên
            </p>
            <p className="ant-upload-hint">
              Ảnh biểu đồ sẽ được hiển thị rõ nét tại đây.
            </p>
          </>
        ) : (
          <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            {/* --- THAY ĐỔI: Giảm số cột để ảnh to hơn --- */}
            <div className="preview-gallery grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fileList.map((f) => (
                <PreviewItem key={f.uid} file={f} onRemove={handleRemove} />
              ))}
            </div>
            <p className="text-center text-gray-500 mt-4 text-sm font-medium">
              Bạn vẫn có thể kéo thả hoặc click vào đây để tải thêm ảnh.
            </p>
          </div>
        )}
      </Dragger>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <Button
          onClick={() => {
            setFileList([]);
            message.info("Đã xoá tất cả file.");
            // --- THAY ĐỔI: Báo cho cha biết khi clear all ---
            if (typeof handleFileSelect === "function") {
              handleFileSelect({ target: { files: [] } });
            }
          }}
          disabled={fileList.length === 0}
        >
          Xóa tất cả
        </Button>
      </div>
    </>
    // </div>
  );
};

export default ChartUpload;
