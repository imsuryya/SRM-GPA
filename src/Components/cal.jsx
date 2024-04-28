import React, { useState } from 'react';
import fileDownload from 'js-file-download';
import html2canvas from 'html2canvas';

const SemesterMarksCalculator = () => {
  const [marks, setMarks] = useState(Array.from({ length: 5 }, () => ({ credit: 0, grade: '' })));
  const [cgpa, setCgpa] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const calculateCgpa = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    marks.forEach(mark => {
      let credit = mark.credit;
      let grade = mark.grade;
      let gradePoint = 0;

      if (grade === 'O') gradePoint = 10;
      else if (grade === 'A+') gradePoint = 9;
      else if (grade === 'A') gradePoint = 8;
      else if (grade === 'B+') gradePoint = 7;
      else if (grade === 'B') gradePoint = 6;
      else if (grade === 'C') gradePoint = 5;
      else gradePoint = 0;

      totalCredits += credit;
      totalGradePoints += credit * gradePoint;
    });

    const calculatedCgpa = totalGradePoints / totalCredits;
    setCgpa(calculatedCgpa);
  };

  const handleMarksChange = (index, value, type) => {
    const updatedMarks = [...marks];
    updatedMarks[index][type] = value;
    setMarks(updatedMarks);
  };

  const addSubject = () => {
    if (marks.length < 12) {
      setMarks([...marks, { credit: 0, grade: '' }]);
    } else {
      alert("You've reached the maximum limit of subjects (12).");
    }
  };

  const downloadAsImage = () => {
    setDownloading(true);
    html2canvas(document.getElementById('calculator-container')).then(canvas => {
      canvas.toBlob(blob => {
        fileDownload(blob, 'semester_marks.png');
        setDownloading(false);
      });
    });
  };

  return (
    <div className="flex justify-center items-center h-full bg-white">
      <div className="w-full max-w-md p-6" id="calculator-container">
     {/* <h4 className="text-3xl font-bold mb-6 text-left" style={{ fontFamily: 'RoyalFont', color: 'royalblue' }}>SRM University GPA Calculator</h4>*/}
        {marks.map((mark, index) => (
          <div key={index} className="mb-4 flex items-center">
            <span className="mr-4 text-lg font-semibold">{index + 1}.</span>
            <input
              type="number"
              placeholder="Credit"
              value={mark.credit}
              onChange={(e) => handleMarksChange(index, parseInt(e.target.value), 'credit')}
              className="w-3/4 py-2 px-4 mr-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-blue-500"
            />
            <select
              value={mark.grade}
              onChange={(e) => handleMarksChange(index, e.target.value, 'grade')}
              className="w-3/4 py-2 px-4 mr-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Grade</option>
              <option value="O">O</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="F">F</option>
              <option value="A">A (Absent)</option>
              <option value="I">I (Low Attendance)</option>
            </select>
          </div>
        ))}
        <div className="flex justify-center space-x-4">
          <button onClick={addSubject} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Add Subject
          </button>
          <button onClick={calculateCgpa} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Calculate CGPA
          </button>
          <button onClick={downloadAsImage} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Download as Image
          </button>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-bold text-center">CGPA: {cgpa.toFixed(2)}</h3>
        </div>
      </div>
      {downloading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <p className="text-white">Downloading...</p>
        </div>
      )}
    </div>
  );
};

export default SemesterMarksCalculator;
