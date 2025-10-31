import ScoreBar from "./ScoreBar";

const ScoreDetails = ({ scores }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">
      Chi tiết điểm số
    </h2>
    <ScoreBar title="Task Response" score={scores.task} />
    <ScoreBar title="Coherence & Cohesion" score={scores.coherence} />
    <ScoreBar title="Grammar & Accuracy" score={scores.grammar} />
    <ScoreBar title="Lexical Resource" score={scores.lexical} />
  </div>
);

export default ScoreDetails;
