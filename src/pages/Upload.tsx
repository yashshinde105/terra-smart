import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, FileImage, FileSpreadsheet, CheckCircle, AlertCircle, Loader2, X, TrendingUp, Shield } from 'lucide-react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';

const Upload: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<'image' | 'csv' | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const handleDrag = useCallback((e: React.DragEvent, type: 'image' | 'csv') => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragOver(type);
    } else if (e.type === 'dragleave') {
      setDragOver(null);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, type: 'image' | 'csv') => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(null);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (type === 'image' && file?.type.startsWith('image/')) {
      handleImageFile(file);
    } else if (type === 'csv' && file?.name.endsWith('.csv')) {
      handleCsvFile(file);
    }
  }, []);

  const handleImageFile = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
    setError(null);
  };

  const handleCsvFile = (file: File) => {
    setCsvFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split('\n').map(row => row.split(','));
      setCsvData(rows.filter(row => row.some(cell => cell.trim())));
    };
    reader.readAsText(file);
    setError(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
  };

  const handleCsvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleCsvFile(file);
  };

  const removeFile = (type: 'image' | 'csv') => {
    if (type === 'image') {
      setImageFile(null);
      setImagePreview(null);
    } else {
      setCsvFile(null);
      setCsvData([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !csvFile) {
      setError('Please select both image and CSV files');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    const formData = new FormData();
    formData.append('file_img', imageFile);
    formData.append('file_csv', csvFile);

    try {
      const response = await axios.post('http://localhost:8000/analyze_form', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.response?.data?.detail || 'Failed to get analysis from server.');
    } finally {
      setLoading(false);
    }
  };

  const getResultBgColor = (isHealthy: boolean) =>
    isHealthy ? "bg-green-50 border-green-200" : "bg-red-50 border-red-400";
  const getTextColor = (isHealthy: boolean) =>
    isHealthy ? "text-green-800" : "text-red-800";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 pt-24 max-w-7xl"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center mb-10"
      >
        <h1 className="text-5xl top-2px font-bold text-gray-900 mb-4">Crop Disease & Dataset Analyzer</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Upload your crop image and field dataset (CSV) to get AI-powered predictions and comprehensive insights
        </p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Upload Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileImage className="h-6 w-6 text-green-600" />
                  </div>
                  Crop Image Analysis
                </CardTitle>
                <CardDescription className="text-base">
                  Upload a clear, high-quality image of your crop for visual disease detection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!imageFile ? (
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 cursor-pointer hover:border-green-400 hover:bg-green-50 ${
                      dragOver === 'image' 
                        ? 'border-green-500 bg-green-50 scale-105' 
                        : 'border-gray-300'
                    }`}
                    onDragEnter={(e) => handleDrag(e, 'image')}
                    onDragLeave={(e) => handleDrag(e, 'image')}
                    onDragOver={(e) => handleDrag(e, 'image')}
                    onDrop={(e) => handleDrop(e, 'image')}
                    onClick={() => document.getElementById('image-input')?.click()}
                  >
                    <motion.div
                      animate={dragOver === 'image' ? { scale: 1.1 } : { scale: 1 }}
                      className="space-y-4"
                    >
                      <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                        <UploadIcon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-gray-700 mb-2">
                          Drop your crop image here
                        </p>
                        <p className="text-sm text-gray-500 mb-2">
                          or click to browse files
                        </p>
                        <p className="text-xs text-gray-400">
                          PNG, JPG, JPEG up to 10MB
                        </p>
                      </div>
                    </motion.div>
                    <input
                      id="image-input"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="relative rounded-xl overflow-hidden bg-gray-100 group">
                      <img 
                        src={imagePreview!} 
                        alt="Crop preview" 
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          onClick={() => removeFile('image')}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-green-700">
                        <CheckCircle className="h-4 w-4" />
                        <span className="font-medium">{imageFile.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {(imageFile.size / 1024 / 1024).toFixed(1)} MB
                      </Badge>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* CSV Upload Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="h-full transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileSpreadsheet className="h-6 w-6 text-blue-600" />
                  </div>
                  Dataset Analysis
                </CardTitle>
                <CardDescription className="text-base">
                  Upload CSV file with environmental and soil parameters for comprehensive analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!csvFile ? (
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 cursor-pointer hover:border-blue-400 hover:bg-blue-50 ${
                      dragOver === 'csv' 
                        ? 'border-blue-500 bg-blue-50 scale-105' 
                        : 'border-gray-300'
                    }`}
                    onDragEnter={(e) => handleDrag(e, 'csv')}
                    onDragLeave={(e) => handleDrag(e, 'csv')}
                    onDragOver={(e) => handleDrag(e, 'csv')}
                    onDrop={(e) => handleDrop(e, 'csv')}
                    onClick={() => document.getElementById('csv-input')?.click()}
                  >
                    <motion.div
                      animate={dragOver === 'csv' ? { scale: 1.1 } : { scale: 1 }}
                      className="space-y-4"
                    >
                      <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                        <FileSpreadsheet className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-gray-700 mb-2">
                          Drop your dataset here
                        </p>
                        <p className="text-sm text-gray-500 mb-2">
                          or click to browse files
                        </p>
                        <p className="text-xs text-gray-400">
                          CSV format only
                        </p>
                      </div>
                    </motion.div>
                    <input
                      id="csv-input"
                      type="file"
                      accept=".csv"
                      onChange={handleCsvChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="relative group">
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={() => removeFile('csv')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="bg-gray-50 rounded-xl p-4 max-h-64 overflow-auto border">
                        <table className="w-full text-xs">
                          <tbody>
                            {csvData.slice(0, 6).map((row, index) => (
                              <tr key={index} className={index === 0 ? 'font-semibold text-gray-800' : 'text-gray-600'}>
                                {row.map((cell, cellIndex) => (
                                  <td key={cellIndex} className="border border-gray-200 px-2 py-1 bg-white">
                                    {cell.trim()}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {csvData.length > 6 && (
                          <p className="text-gray-500 mt-3 text-center text-sm">
                            ... and {csvData.length - 6} more rows
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-blue-700">
                        <CheckCircle className="h-4 w-4" />
                        <span className="font-medium">{csvFile.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {csvData.length} rows
                      </Badge>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Button
            type="submit"
            disabled={loading || !imageFile || !csvFile}
            size="lg"
            className="px-12 py-4 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {loading ? (
              <>
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                Analyzing Your Data...
              </>
            ) : (
              <>
                <TrendingUp className="mr-3 h-5 w-5" />
                Start AI Analysis
              </>
            )}
          </Button>
        </motion.div>
      </form>

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mt-8"
        >
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
        </motion.div>
      )}

      {/* Results */}
      {result && !loading && (
        <motion.div
          ref={resultsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-center text-gray-900 mb-10"
          >
            Analysis Results
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Analysis Results */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className={`transition-all duration-300 hover:shadow-lg ${getResultBgColor(
                result.image_analysis.prediction === "Healthy"
              )}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-3 text-2xl ${getTextColor(
                    result.image_analysis.prediction === "Healthy"
                  )}`}>
                    <div className={`p-2 rounded-lg ${
                      result.image_analysis.prediction === "Healthy" 
                        ? 'bg-green-200' 
                        : 'bg-red-200'
                    }`}>
                      <Shield className="h-6 w-6" />
                    </div>
                    Image Analysis
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Visual crop health assessment results
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                      <span className="font-medium text-gray-700">Prediction:</span>
                      <Badge variant={result.image_analysis.prediction === "Healthy" ? "default" : "destructive"} className="text-sm px-3 py-1">
                        {result.image_analysis.prediction}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                      <span className="font-medium text-gray-700">Confidence:</span>
                      <span className="font-bold text-lg">{result.image_analysis.confidence}%</span>
                    </div>
                    <div className="p-3 bg-white/50 rounded-lg">
                      <span className="font-medium text-gray-700 block mb-2">Recommended Solution:</span>
                      <p className="text-gray-800">{result.image_analysis.solution}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Dataset Analysis Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="transition-all duration-300 hover:shadow-lg bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-blue-800">
                    <div className="p-2 bg-blue-200 rounded-lg">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    Dataset Analysis
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Environmental and field parameter insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                      <span className="font-medium text-gray-700">Disease Risk:</span>
                      <Badge variant="outline" className="text-sm px-3 py-1">
                        {result.dataset_analysis.disease_risk_percentage}%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                      <span className="font-medium text-gray-700">Disease Status:</span>
                      <Badge variant={result.dataset_analysis.disease_observed === 1 ? "destructive" : "default"}>
                        {result.dataset_analysis.disease_observed === 1 ? 'Detected' : 'Not Detected'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                      <span className="font-medium text-gray-700">Pesticide Level:</span>
                      <span className="font-bold">{result.dataset_analysis.pesticide_amount_ppm} PPM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                      <span className="font-medium text-gray-700">Growth Stage:</span>
                      <Badge variant="secondary">{result.dataset_analysis.growth_stage}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Upload;

