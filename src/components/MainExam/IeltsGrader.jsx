import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// --- THÊM IMPORT CHO CHART UPLOAD ---
import { InboxOutlined } from "@ant-design/icons";
// Sửa: Bỏ import { Image } từ 'antd' vì không dùng nữa
import { message, Upload, Button } from "antd";

const { Dragger } = Upload;

// ====================================================================
// === COMPONENT ChartUpload (ĐÃ ĐƯỢC GỘP VÀO ĐÂY) ===
// ====================================================================

// --- Component Preview Item (Cập nhật) ---
const PreviewItem = ({ file, onRemove }) => {
  return (
    // THÊM 'group' ĐỂ KÍCH HOẠT HIỆU ỨNG HOVER
    // === SỬA LỖI: Thêm onClick stopPropagation và cursor-default ===
    <div
      key={file.uid}
      onClick={(e) => e.stopPropagation()} // Ngăn click lan lên Dragger
      // THAY ĐỔI: Tăng chiều cao từ h-80 lên h-96 (384px)
      className="relative group w-full h-96 rounded-lg overflow-hidden shadow-md bg-gray-100 cursor-default" // Đặt cursor bình thường
    >
      <img
        src={file.url}
        alt={file.name}
        className="w-full h-full object-contain" // Giữ object-contain
      />

      {/* THAY ĐỔI: Thêm 'hidden', 'group-hover:block', và 'cursor-pointer' */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // Ngăn click lan lên div cha
          onRemove(file);
        }}
        aria-label="Remove"
        className="absolute top-2 right-2 z-10 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-all hidden group-hover:block cursor-pointer" // Thêm cursor-pointer
      >
        {/* Icon X (Close) bằng SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5" // Tăng kích thước icon lên 1 chút
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
  handleFileSelect,
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

      // --- Báo cho cha biết có file ---
      if (typeof handleFileSelect === "function") {
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

    // --- Báo cho cha biết nếu fileList rỗng ---
    if (newList.length === 0 && typeof handleFileSelect === "function") {
      handleFileSelect({ target: { files: [] } }); // Gửi mảng rỗng
    }
  };

  const handleRemove = (file) => {
    const newList = fileList.filter((f) => f.uid !== file.uid);
    setFileList(newList);

    // --- Báo cho cha biết nếu fileList rỗng sau khi xóa ---
    if (newList.length === 0 && typeof handleFileSelect === "function") {
      handleFileSelect({ target: { files: [] } }); // Gửi mảng rỗng
    }
  };

  // ... (Hàm startUpload giữ nguyên) ...
  const startUpload = async () => {
    /* (code giữ nguyên) */
  };

  return (
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
            {/* THAY ĐỔI: Bỏ grid, dùng flex-col để ảnh xếp dọc và to */}
            <div className="preview-gallery flex flex-col gap-4">
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
            // --- Báo cho cha biết khi clear all ---
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
  );
};
// ====================================================================
// === KẾT THÚC COMPONENT ChartUpload ===
// ====================================================================

// === COMPONENT CỘT NHẬP LIỆU (BÊN TRÁI) ===
const InputColumn = ({ onGrade, isLoading }) => {
  const [selectedTask, setSelectedTask] = useState(1);
  const [promptText, setPromptText] = useState("");
  const [essayText, setEssayText] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null); // State để giữ file
  const [errors, setErrors] = useState({ prompt: null, essay: null });

  const handleTaskChange = (task) => {
    setSelectedTask(task);
    setErrors((prev) => ({ ...prev, prompt: null }));
  };

  // Xử lý khi tải file (nhận từ ChartUpload)
  const handleFileChange = (event) => {
    // Kiểm tra xem event có file hay không (có thể là mảng rỗng khi clear)
    const file = event.target.files && event.target.files[0];
    if (file) {
      setUploadedFile(file);
      // Xóa lỗi prompt nếu người dùng upload file
      setErrors((prev) => ({ ...prev, prompt: null }));
    } else {
      // Nếu không có file (ví dụ: người dùng xóa hết)
      setUploadedFile(null);
    }
  };

  // Xử lý khi nhấn nút chấm điểm
  const handleSubmit = () => {
    let hasError = false;
    let newErrors = { prompt: null, essay: null };

    // Validate: Cần kiểm tra state 'uploadedFile'
    if (selectedTask === 1 && promptText.trim() === "" && !uploadedFile) {
      newErrors.prompt = "Vui lòng nhập đề bài hoặc tải ảnh lên.";
      hasError = true;
    } else if (selectedTask === 2 && promptText.trim() === "") {
      newErrors.prompt = "Vui lòng nhập đề bài.";
      hasError = true;
    }

    if (essayText.trim() === "") {
      newErrors.essay = "Vui lòng nhập bài làm của bạn.";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      return;
    }

    onGrade({
      task: selectedTask,
      prompt: promptText,
      essay: essayText,
      image: uploadedFile, // Gửi file đi
    });
  };

  // Hàm đếm chữ
  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  // Hàm Clear
  const handleClear = (setter) => {
    setter("");
  };

  const essayWordCount = countWords(essayText);

  return (
    <div className="flex flex-col gap-6 mt-12">
      {/* KHỐI 1: CHỌN LOẠI BÀI VIẾT */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          Chọn Loại Bài Viết
        </h2>
        <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-2 sm:space-y-0">
          <label
            htmlFor="radio-task1"
            className="flex items-center cursor-pointer"
          >
            <input
              type="radio"
              id="radio-task1"
              name="task-type"
              value="1"
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              checked={selectedTask === 1}
              onChange={() => handleTaskChange(1)}
            />
            <span className="ml-3 text-lg text-gray-700 font-medium">
              Task 1 - Chart/Graph
            </span>
          </label>
          <label
            htmlFor="radio-task2"
            className="flex items-center cursor-pointer"
          >
            <input
              type="radio"
              id="radio-task2"
              name="task-type"
              value="2"
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              checked={selectedTask === 2}
              onChange={() => handleTaskChange(2)}
            />
            <span className="ml-3 text-lg text-gray-700 font-medium">
              Task 2 - Essay
            </span>
          </label>
        </div>
      </div>

      {/* KHỐI 1.5: UPLOAD ẢNH (Conditional) */}
      {/* Chỉ hiển thị khi chọn Task 1 */}
      {selectedTask === 1 && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transition-all duration-300">
          <ChartUpload
            handleFileSelect={handleFileChange} // Truyền hàm xử lý file xuống
            // handleFileDrop={...} // (Bạn có thể thêm nếu cần)
          />
        </div>
      )}

      {/* KHỐI 2: NHẬP ĐỀ BÀI */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Nhập Đề Bài</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => handleClear(setPromptText)}
              className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
              title="Xóa"
            >
              Xóa
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          Nếu đề bài là dạng chữ, dán (paste) vào đây.
        </p>
        <textarea
          id="prompt-input"
          rows="5"
          className={`w-full p-4 rounded-lg border transition ${
            errors.prompt
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }`}
          placeholder="Ví dụ: 'The chart below shows the percentage of the population...'"
          value={promptText}
          onChange={(e) => {
            setPromptText(e.target.value);
            if (e.target.value.trim() !== "") {
              setErrors((prev) => ({ ...prev, prompt: null }));
            }
          }}
        />
        {errors.prompt && (
          <div className="text-red-600 text-sm mt-1">{errors.prompt}</div>
        )}
      </div>

      {/* KHỐI 3: NHẬP BÀI LÀM */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Nhập Bài Làm Của Bạn
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => handleClear(setEssayText)}
              className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
              title="Xóa"
            >
              Xóa
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          Dán (paste) toàn bộ bài làm của bạn vào đây.
        </p>
        <textarea
          id="essay-input"
          rows="15"
          className={`w-full p-4 rounded-lg border transition ${
            errors.essay
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }`}
          placeholder="Dán bài làm của bạn tại đây..."
          value={essayText}
          onChange={(e) => {
            setEssayText(e.target.value);
            if (e.target.value.trim() !== "") {
              setErrors((prev) => ({ ...prev, essay: null }));
            }
          }}
        />
        <div className="flex justify-between items-center mt-2">
          <div
            className={`text-sm ${
              essayWordCount > 0 ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Số chữ: <span className="font-semibold">{essayWordCount}</span>
          </div>
          {errors.essay && (
            <div className="text-red-600 text-sm">{errors.essay}</div>
          )}
        </div>
      </div>

      {/* NÚT CHẤM ĐIỂM */}
      <button
        id="grade-button"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition duration-200 flex items-center justify-center shadow-lg disabled:opacity-75 disabled:cursor-not-allowed"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        <span>{isLoading ? "Đang Xử Lý..." : "Chấm Điểm Bằng AI"}</span>
      </button>
    </div>
  );
};

// === COMPONENT IeltsGrader ===
function IeltsGrader() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGrade = useCallback(
    (formData) => {
      setIsLoading(true);

      console.log("Đang gửi đi để chấm điểm:", formData);

      setTimeout(() => {
        setIsLoading(false);
        // Điều hướng tới route /WritingDone và truyền formData bằng location.state
        navigate("/WritingDone", { state: { formData } });
      }, 2500);
    },
    [navigate]
  );

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 md:p-10 rounded-xl shadow-lg mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Trình Chấm Điểm IELTS Writing AI
          </h1>
          <p className="text-lg opacity-90">
            Tải lên bài viết của bạn và nhận phân tích chi tiết ngay lập tức.
          </p>
        </div>

        {/* Cột nhập liệu */}
        <InputColumn onGrade={handleGrade} isLoading={isLoading} />
      </div>
    </div>
  );
}

// === COMPONENT App (root) ===
// Component App gốc chịu trách nhiệm đặt nền và gọi IeltsGrader
export default IeltsGrader;
