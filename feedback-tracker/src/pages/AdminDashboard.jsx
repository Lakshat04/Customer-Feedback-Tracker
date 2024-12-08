
// import React, { useState } from "react";
// import { Bar, Pie } from "react-chartjs-2";
// import { useNavigate } from "react-router-dom";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// } from "chart.js";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import html2canvas from "html2canvas";
// import * as XLSX from "xlsx";

// // Register Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// const AdminDashboard = ({ feedbacks, setFeedbacks }) => {
//   const [showDownloadOptions, setShowDownloadOptions] = useState(false);
//   const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
//   const navigate = useNavigate();

//   // Status colors
//   const statusColors = {
//     Open: "#f44336", // Red
//     Pending: "#ffcd56", // Yellow
//     Closed: "#4caf50", // Green
//     Resolved: "#2196f3", // Blue
//   };

//   // Calculate feedback counts by type and status dynamically
//   const feedbackByType = feedbacks.reduce(
//     (acc, feedback) => {
//       acc[feedback.type] = (acc[feedback.type] || 0) + 1;
//       return acc;
//     },
//     {}
//   );

//   const feedbackByStatus = feedbacks.reduce(
//     (acc, feedback) => {
//       acc[feedback.status] = (acc[feedback.status] || 0) + 1;
//       return acc;
//     },
//     {}
//   );

//   // Update feedback status
//   const updateStatus = (id, status) => {
//     setFeedbacks(
//       feedbacks.map((fb) => (fb.id === id ? { ...fb, status } : fb))
//     );
//   };

//   // Handle download as PDF
//   const downloadAsPDF = async () => {
//     setIsGeneratingPDF(true);
//     const element = document.querySelector(".admin-dashboard");
//     const canvas = await html2canvas(element, { scale: 2 });
//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF("p", "mm", "a4");
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("admin_dashboard.pdf");
//     setIsGeneratingPDF(false);
//   };

//   // Handle download as Excel
//   const downloadAsExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(
//       feedbacks.map((fb) => ({
//         Type: fb.type,
//         Message: fb.message,
//         Status: fb.status,
//       }))
//     );
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Feedback");
//     XLSX.writeFile(workbook, "feedback_dashboard.xlsx");
//   };

//   const handleDownload = (type) => {
//     if (type === "pdf") {
//       downloadAsPDF();
//     } else if (type === "excel") {
//       downloadAsExcel();
//     }
//     setShowDownloadOptions(false);
//   };

//   // Chart data and options
//   const typeChartData = {
//     labels: Object.keys(feedbackByType),
//     datasets: [
//       {
//         label: "Feedback by Type",
//         data: Object.values(feedbackByType),
//         backgroundColor: ["#6a84f6", "#8dc8f4", "#ffcd56", "#ff6384"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const statusChartData = {
//     labels: Object.keys(feedbackByStatus),
//     datasets: [
//       {
//         label: "Feedback by Status",
//         data: Object.values(feedbackByStatus),
//         backgroundColor: Object.keys(feedbackByStatus).map(
//           (status) => statusColors[status] || "#ddd"
//         ),
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: true,
//     aspectRatio: 1.5,
//   };

//   return (
//     <div className="admin-dashboard">
//       {/* Admin Dashboard Header */}
//       <div className="dashboard-header">
//         <h1>Admin Dashboard</h1>
//         {!isGeneratingPDF && (
//           <div className="download-icon">
//             <button
//               className="icon-button"
//               onClick={() => setShowDownloadOptions((prev) => !prev)}
//             >
//               <i className="fas fa-download"></i>
//             </button>

//             {showDownloadOptions && (
//               <div className="download-options">
//                 <button onClick={() => handleDownload("pdf")}>Download as PDF</button>
//                 <button onClick={() => handleDownload("excel")}>
//                   Download as Excel
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Real-Time Tracker */}
//       <div className="realtime-tracker">
//         <h2>Real-Time Feedback Tracker</h2>
//         <p>
//           <strong>Total Feedback:</strong> {feedbacks.length}
//         </p>
//       </div>

//       {/* Feedback Sections */}
//       <div className="dashboard-sections">
//         {/* Feedback Management Section */}
//         <div className="dashboard-management">
//           <h3>Feedback Management</h3>
//           {feedbacks.length > 0 ? (
//             feedbacks.map((feedback) => (
//               <div key={feedback.id} className="feedback-item">
//                 <p>
//                   <strong>Type:</strong> {feedback.type}
//                 </p>
//                 <p>
//                   <strong>Message:</strong> {feedback.message}
//                 </p>
//                 <p>
//                   <strong>Status:</strong> {feedback.status}
//                 </p>
//                 {feedback.status !== "Closed" && (
//                   <button
//                     onClick={() => updateStatus(feedback.id, "Closed")}
//                     className="btn-close"
//                   >
//                     Mark as Closed
//                   </button>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p>No feedback available.</p>
//           )}
//         </div>

//         {/* Feedback Summary Section */}
//         <div className="dashboard-summary">
//           <h3>Feedback Summary</h3>
//           <div className="chart-container">
//             <div className="chart-wrapper">
//               <h4>Feedback by Type</h4>
//               <Bar data={typeChartData} options={chartOptions} />
//             </div>

//             {/* Now place Feedback by Status below Feedback by Type */}
//             <div className="chart-wrapper">
//               <h4>Feedback by Status</h4>
//               <Pie data={statusChartData} options={chartOptions} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//   );

// };

// export default AdminDashboard;































import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AdminDashboard = ({ feedbacks, setFeedbacks }) => {
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const navigate = useNavigate();

  // Status colors
  const statusColors = {
    Open: "#f44336", // Red
    Pending: "#ffcd56", // Yellow
    Closed: "#4caf50", // Green
    Resolved: "#2196f3", // Blue
  };

  // Calculate feedback counts by type and status dynamically
  const feedbackByType = feedbacks.reduce(
    (acc, feedback) => {
      acc[feedback.type] = (acc[feedback.type] || 0) + 1;
      return acc;
    },
    {}
  );

  const feedbackByStatus = feedbacks.reduce(
    (acc, feedback) => {
      acc[feedback.status] = (acc[feedback.status] || 0) + 1;
      return acc;
    },
    {}
  );

  // Update feedback status
  const updateStatus = (id, status) => {
    setFeedbacks(
      feedbacks.map((fb) => (fb.id === id ? { ...fb, status } : fb))
    );
  };

  // Handle download as PDF
  const downloadAsPDF = async () => {
    setIsGeneratingPDF(true);
    const element = document.querySelector(".admin-dashboard");
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("admin_dashboard.pdf");
    setIsGeneratingPDF(false);
  };

  // Handle download as Excel
  const downloadAsExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      feedbacks.map((fb) => ({
        Type: fb.type,
        Message: fb.message,
        Status: fb.status,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Feedback");
    XLSX.writeFile(workbook, "feedback_dashboard.xlsx");
  };

  const handleDownload = (type) => {
    if (type === "pdf") {
      downloadAsPDF();
    } else if (type === "excel") {
      downloadAsExcel();
    }
    setShowDownloadOptions(false);
  };

  // Chart data and options
  const typeChartData = {
    labels: Object.keys(feedbackByType),
    datasets: [
      {
        label: "Feedback by Type",
        data: Object.values(feedbackByType),
        backgroundColor: Object.keys(feedbackByType).map((type) => {
          if (type === "Suggestion") {
            return "#FFEB3B"; // Yellow for Suggestion
          }
          if (type === "Complaint") {
            return "#D5006D"; // Dark pink for Compliment
          }
          return "#6a84f6"; // Default color for other types
        }),
        borderWidth: 1,
      },
    ],
  };

  const statusChartData = {
    labels: Object.keys(feedbackByStatus),
    datasets: [
      {
        label: "Feedback by Status",
        data: Object.values(feedbackByStatus),
        backgroundColor: Object.keys(feedbackByStatus).map(
          (status) => statusColors[status] || "#ddd"
        ),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.5,
  };

  return (
    <div className="admin-dashboard">
      {/* Admin Dashboard Header */}
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        {!isGeneratingPDF && (
          <div className="download-icon">
            <button
              className="icon-button"
              onClick={() => setShowDownloadOptions((prev) => !prev)}
            >
              <i className="fas fa-download"></i>
            </button>

            {showDownloadOptions && (
              <div className="download-options">
                <button onClick={() => handleDownload("pdf")}>Download as PDF</button>
                <button onClick={() => handleDownload("excel")}>
                  Download as Excel
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Real-Time Tracker */}
      <div className="realtime-tracker">
        <h2>Real-Time Feedback Tracker</h2>
        <p>
          <strong>Total Feedback:</strong> {feedbacks.length}
        </p>
      </div>

      {/* Feedback Sections */}
      <div className="dashboard-sections">
        {/* Feedback Management Section */}
        <div className="dashboard-management">
          <h3>Feedback Management</h3>
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <div key={feedback.id} className="feedback-item">
                <p>
                  <strong>Type:</strong> {feedback.type}
                </p>
                <p>
                  <strong>Message:</strong> {feedback.message}
                </p>
                <p>
                  <strong>Status:</strong> {feedback.status}
                </p>
                {feedback.status !== "Closed" && (
                  <button
                    onClick={() => updateStatus(feedback.id, "Closed")}
                    className="btn-close"
                  >
                    Mark as Closed
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No feedback available.</p>
          )}
        </div>

        {/* Feedback Summary Section */}
        <div className="dashboard-summary">
          <h3>Feedback Summary</h3>
          <div className="chart-container">
            <div className="chart-wrapper">
              <h4>Feedback by Type</h4>
              <Bar data={typeChartData} options={chartOptions} />
            </div>

            {/* Now place Feedback by Status below Feedback by Type */}
            <div className="chart-wrapper">
              <h4>Feedback by Status</h4>
              <Pie data={statusChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
