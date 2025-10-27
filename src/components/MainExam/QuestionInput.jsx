const QuestionInput = ({ question, setQuestion }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">Đề bài</h2>
    <textarea
      id="questionInput"
      className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
      placeholder={question}
      value={question === "Nhập đề bài IELTS Writing..." ? "" : question}
      onChange={(e) => setQuestion(e.target.value)}
    ></textarea>
  </div>
);

export default QuestionInput;
