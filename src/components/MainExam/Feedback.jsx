const Feedback = ({ showFeedback, scores }) => (
  <div
    id="feedbackCollapseWrapper"
    className={`transition-all duration-500 ease-in-out overflow-hidden ${
      showFeedback && scores.overall > 0
        ? "max-h-[500px] opacity-100"
        : "max-h-0 opacity-0"
    }`}
  >
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Nhận xét chi tiết
      </h2>
      <div className="space-y-4 text-sm text-gray-600">
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
          <h4 className="font-semibold text-blue-800 mb-2">Điểm mạnh:</h4>
          <ul className="list-disc list-inside text-blue-700 space-y-1">
            <li>
              <b>Task Response ({scores.task.toFixed(1)})</b>: Phản hồi tốt với
              các phần của đề bài.
            </li>
            <li>
              <b>Coherence ({scores.coherence.toFixed(1)})</b>: Bài viết được tổ
              chức logic, có các đoạn văn rõ ràng.
            </li>
          </ul>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
          <h4 className="font-semibold text-yellow-800 mb-2">Cần cải thiện:</h4>
          <ul className="list-disc list-inside text-yellow-700 space-y-1">
            <li>
              <b>Grammar ({scores.grammar.toFixed(1)})</b>: Có một vài lỗi nhỏ
              về sự hòa hợp chủ-vị và sử dụng giới từ.
            </li>
            <li>
              <b>Lexical ({scores.lexical.toFixed(1)})</b>: Có thể thay thế một
              số từ thông dụng bằng các từ vựng học thuật (less common
              vocabulary) để nâng band.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default Feedback;
