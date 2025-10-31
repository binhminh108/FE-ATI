const WritingInput = ({ writing, setWriting, wordCount }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">
      Bài viết của bạn
    </h2>
    <textarea
      id="writingInput"
      className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
      placeholder="Viết bài IELTS của bạn tại đây..."
      value={writing}
      onChange={(e) => setWriting(e.target.value)}
    ></textarea>
    <div className="mt-2 text-sm text-gray-500 flex justify-between">
      <span>
        Số từ: <span className="font-semibold text-teal-600">{wordCount}</span>
      </span>
      <span className={wordCount < 250 ? "text-red-500" : "text-green-500"}>
        {wordCount < 250 ? `(Cần tối thiểu ${250 - wordCount} từ)` : "Đủ số từ"}
      </span>
    </div>
  </div>
);

export default WritingInput;
