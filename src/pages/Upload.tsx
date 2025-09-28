import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Upload = () => {
  const [imageFile, setImageFile] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [csvPreview, setCsvPreview] = useState([]); // top 5 rows
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState(null);

  const resultsRef = useRef(null);

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleCsvChange = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const rows = text.split("\n").map((row) => row.split(","));
        setCsvPreview(rows.slice(0, 6)); // header + 5 rows
      };
      reader.readAsText(file);
    } else {
      setCsvPreview([]);
    }
  };

  const handleUpload = async () => {
    setErrorMessage("");
    setResult(null);

    if (!imageFile || !csvFile) {
      setErrorMessage("Please select both an image and a CSV file.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file_img", imageFile);
      formData.append("file_csv", csvFile);

      const response = await axios.post(
        "http://localhost:8000/analyze_form",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.detail || "Failed to get analysis from server."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const getResultBgColor = (isHealthy) =>
    isHealthy ? "bg-green-50 border-green-200" : "bg-red-50 border-red-400";
  const getTextColor = (isHealthy) =>
    isHealthy ? "text-green-800" : "text-red-800";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl p-10">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-6">
          Crop Disease & Dataset Analyzer
        </h1>
        <p className="text-center text-gray-600 mb-10 text-lg">
          Upload a crop image and field dataset (CSV) to get predictions and
          insights.
        </p>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
            {errorMessage}
          </div>
        )}

        {/* Upload Section - side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Image Upload */}
          <div className="w-full">
            <label className="text-lg font-medium text-gray-700">
              Select Crop Image (JPG/PNG)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mt-2 text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 hover:cursor-pointer"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg shadow-md border border-gray-300 mt-4"
              />
            )}
          </div>

          {/* CSV Upload */}
          <div className="w-full">
            <label className="text-lg font-medium text-gray-700">
              Select Dataset CSV
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={handleCsvChange}
              className="w-full mt-2 text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 hover:cursor-pointer"
            />

            {/* Dataset Preview */}
            {csvPreview.length > 0 && (
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      {csvPreview[0].map((col, idx) => (
                        <th
                          key={idx}
                          className="px-3 py-2 text-left text-sm font-semibold text-gray-700 border"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {csvPreview.slice(1).map((row, i) => (
                      <tr key={i} className="odd:bg-white even:bg-gray-50">
                        {row.map((val, j) => (
                          <td
                            key={j}
                            className="px-3 py-2 text-sm text-gray-600 border"
                          >
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className={`mt-6 w-full py-3 px-6 rounded-full font-semibold text-white shadow-lg transition-all duration-300 ${
            isUploading
              ? "bg-green-400"
              : "bg-green-600 hover:bg-green-700 hover:cursor-pointer"
          }`}
        >
          {isUploading ? "Analyzing..." : "Upload & Get Analytics"}
        </button>

        {isUploading && (
          <div className="flex justify-center mt-4">
            <div className="w-12 h-12 border-4 border-green-300 border-t-green-600 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Results Section */}
        {result && !isUploading && (
          <div ref={resultsRef} className="mt-12">
            <h2 className="text-3xl font-semibold text-center text-green-700 mb-8">
              Prediction Results
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Analysis */}
              <div
                className={`p-6 rounded-2xl shadow-lg border ${getResultBgColor(
                  result.image_analysis.prediction === "Healthy"
                )}`}
              >
                <h3
                  className={`text-2xl font-semibold mb-4 ${getTextColor(
                    result.image_analysis.prediction === "Healthy"
                  )}`}
                >
                  Image Analysis
                </h3>
                <p className="text-lg">
                  <strong>Prediction:</strong>{" "}
                  {result.image_analysis.prediction}
                </p>
                <p className="text-lg">
                  <strong>Confidence:</strong>{" "}
                  {result.image_analysis.confidence}%
                </p>
                <p className="text-lg">
                  <strong>Solution:</strong> {result.image_analysis.solution}
                </p>
              </div>

              {/* Dataset Analysis */}
              <div className="p-6 rounded-2xl shadow-lg border bg-blue-50 border-blue-200">
                <h3 className="text-2xl font-semibold mb-4 text-blue-800">
                  Dataset Analysis
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  <p className="text-lg">
                  <strong>Disease Risk Percentage: </strong>{" "}
                  {result.dataset_analysis.disease_risk_percentage}
                </p>
                <p className="text-lg">
                  <strong>Disease Observed(0/1): </strong>{" "}
                  {result.dataset_analysis.disease_observed}
                </p>
                <p className="text-lg">
                  <strong>Pesticide Amount PPM: </strong> {result.dataset_analysis.pesticide_amount_ppm}
                </p>
                <p className="text-lg">
                  <strong>Growth Stage: </strong> {result.dataset_analysis.growth_stage}
                </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;

