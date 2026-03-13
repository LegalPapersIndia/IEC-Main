// src/components/PaymentSummary.jsx
import { useEffect, useState } from "react";

export default function PaymentSummary() {
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("iecSubmittedData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
        console.log("Loaded IEC data:", parsed);
      } catch (err) {
        console.error("Parse error:", err);
        setError("Invalid data found. Please try again.");
      }
    } else {
      setError("No application data found. Redirecting...");
      setTimeout(() => window.location.href = "/", 3000);
    }
  }, []);

  const handlePay = () => {
    window.location.href = "https://www.instamojo.com/@LegalPapersIndia/l52d2d917f393479baf14f1e829a0a65c/";
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-10 bg-white rounded-2xl shadow-xl max-w-md w-full">
          <p className="text-red-600 text-xl font-semibold mb-4">{error}</p>
          <p className="text-gray-600">Redirecting in few seconds...</p>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
        <p className="ml-4 text-gray-600 text-lg">Loading your details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-blue-700 text-white py-12 px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">IEC Application Summary & Payment</h1>
          <p className="text-lg opacity-90">Please review your details before proceeding</p>
        </div>

        {/* Details */}
        <div className="p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Your Application Details
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5 bg-gray-50 p-6 rounded-2xl">
              <Detail label="Application Type" value={formData.ddlApplicationType || formData.application_type || "—"} />
              <Detail label="Business Entity Name" value={formData.txtBusinesEntity || formData.business_entity || "—"} />
              <Detail label="Constitution" value={formData.ddlConstitution || formData.constitution || "—"} />
              <Detail label="PAN Number" value={<span className="uppercase">{formData.txtPanNo || formData.pan_no || "—"}</span>} />
              <Detail label="Email" value={formData.txtemail || formData.email || "—"} />
              <Detail label="Contact Number" value={formData.txtphone || formData.contact_no || "—"} />
            </div>

            <div className="space-y-5 bg-gray-50 p-6 rounded-2xl">
              <Detail
                label="Address"
                value={
                  [
                    formData.txtpaddress || formData.address_line1 || "",
                    formData.txtpaddress2 || formData.address_line2 || "",
                    formData.txtpcity || formData.city || "",
                    formData.txtpstate || formData.state || "",
                    formData.txtppincode || formData.pincode ? `- ${formData.txtppincode || formData.pincode}` : ""
                  ]
                    .filter(Boolean)
                    .join(", ") || "—"
                }
              />
              <Detail label="Business Activity" value={formData.ddlBsinessActivity || formData.business_activity || "—"} />
              <Detail label="SEZ" value={formData.firm === "yes" ? "Yes" : "No"} />
              {formData.txtdescriptionbusiness || formData.description_business ? (
                <Detail label="Description" value={formData.txtdescriptionbusiness || formData.description_business || "—"} />
              ) : null}
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="p-6 md:p-10 bg-gray-50 border-t border-gray-200">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">IEC Processing Fee</h3>
            <p className="text-5xl font-extrabold text-orange-600 mb-6">₹ 1,950</p>
            <p className="text-gray-600 mb-8">One-time consultancy & processing fee</p>

            <button
              onClick={handlePay}
              className="w-full py-5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-xl rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a5 5 0 00-10 0v2m-3 5a5 5 0 0110 0v2a5 5 0 01-10 0v-2z" />
              </svg>
              Pay Securely Now
            </button>

            <p className="text-sm text-gray-500 mt-6">
              Secure payment via Instamojo • Encrypted & Protected
            </p>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => window.location.href = "/iec-registration"}
              className="px-12 py-4 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-full shadow-lg transition-all duration-300"
            >
              ← Edit Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between py-3 border-b border-gray-200 last:border-none">
      <span className="font-semibold text-gray-700 min-w-[180px]">{label}:</span>
      <span className="text-gray-900 font-medium break-words">{value}</span>
    </div>
  );
}