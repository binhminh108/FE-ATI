import Header from "./components/Header";
import QuestionInput from "./components/QuestionInput";
import TaskSelector from "./components/TaskSelector";
import ChartUpload from "./components/ChartUpload";
import WritingInput from "./components/WritingInput";
import TargetScoreSelector from "./components/TargetScoreSelector";
import ActionButtons from "./components/ActionButtons";
import OverallScore from "./components/OverallScore";
import ScoreDetails from "./components/ScoreDetails";
import FeedbackCollapse from "./components/FeedbackCollapse";

// ...utility functions...

const IELTSWritingAssessment = () => {
  // ...state & logic...

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <Header />
      <div className="w-full py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-full max-w-7xl mx-auto px-6">
          {/* Left Column */}
          <div className="space-y-6 bg-gray-100 p-6 rounded-xl shadow-inner">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Hoạt động của người dùng
            </h2>
            <QuestionInput question={question} setQuestion={setQuestion} />
            <TaskSelector taskType={taskType} setTaskType={setTaskType} />
            {taskType === "task1" && (
              <ChartUpload
                filePreview={filePreview}
                handleFileDrop={handleFileDrop}
                handleFileSelect={handleFileSelect}
              />
            )}
            <WritingInput
              writing={writing}
              setWriting={setWriting}
              wordCount={wordCount}
            />
          </div>
          {/* Right Column */}
          <div className="space-y-6 bg-teal-50 p-6 rounded-xl shadow-inner">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Điểm số và đánh giá
            </h2>
            <TargetScoreSelector
              targetScore={targetScore}
              setTargetScore={setTargetScore}
            />
            <ActionButtons
              handleAssess={handleAssess}
              isLoading={isLoading}
              isReadyToAssess={isReadyToAssess}
              showFeedback={showFeedback}
              setShowFeedback={setShowFeedback}
              scores={scores}
            />
            <OverallScore
              score={scores.overall}
              getScoreCircleStyle={getScoreCircleStyle}
              getScoreLevel={getScoreLevel}
            />
            <ScoreDetails scores={scores} />
            <FeedbackCollapse showFeedback={showFeedback} scores={scores} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IELTSWritingAssessment;
