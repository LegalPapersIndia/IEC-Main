// src/components/Form/RegistrationForm.jsx
import { useState, useEffect, useRef } from "react";
import FormField from "./FormField";
import GradientButton from "../common/GradientButton";

const applicationTypes = [
  "IEC Registration",
  "IEC Modification",
  "IEC Renewal",
];

const constitutions = [
  "Proprietorship",
  "Partnership",
  "Limited Liability Partnership",
  "Private Limited",
  "opc",
  "Public Limited",
  "Govt. Undertaking",
  "Section 25 Company",
  "Registered Society",
  "Trust",
  "HUF",
];

const businessActivities = [
  "Merchant Exporter",
  "Manufacturer Exporter",
  "Merchant cum Manufacturer Exporter",
  "Service Provider",
  "Merchant cum Service Provider",
  "Manufacturer cum Service Provider",
  "Merchant cum Manufacturer cum Service Provider",
  "Others",
];

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Lakshadweep",
];

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    application_type: "",
    business_entity: "",
    constitution: "",
    description_business: "",
    business_activity: "",
    date_of_incorporation: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
    has_branch: "",
    pan_no: "",
    email: "",
    contact_no: "",
    sez: "No",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const hiddenFormRef = useRef(null);
  const iframeRef = useRef(null);

  // Load draft
  useEffect(() => {
    const saved = localStorage.getItem("iecFormDraft");
    if (saved) {
      try {
        setFormData((prev) => ({ ...prev, ...JSON.parse(saved) }));
      } catch (e) {
        console.warn("Invalid draft data");
      }
    }
  }, []);

  // Save draft on every change
  useEffect(() => {
    localStorage.setItem("iecFormDraft", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const processedValue = name === "pan_no" ? value.toUpperCase() : value;

    setFormData((prev) => ({ ...prev, [name]: processedValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.application_type)
      newErrors.application_type = "Application Type is required";
    if (!formData.business_entity.trim())
      newErrors.business_entity = "Business Entity name is required";
    if (!formData.constitution)
      newErrors.constitution = "Constitution is required";
    if (!formData.business_activity)
      newErrors.business_activity = "Business Activity is required";
    if (!formData.address_line1.trim())
      newErrors.address_line1 = "Address Line 1 is required";
    if (!formData.state) newErrors.state = "State is required";
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Pincode must be 6 digits";
    if (!formData.has_branch) newErrors.has_branch = "Please select Yes or No";
    if (formData.pan_no && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan_no))
      newErrors.pan_no = "Invalid PAN format (ABCDE1234F)";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email required";
    if (formData.contact_no && !/^[6-9]\d{9}$/.test(formData.contact_no))
      newErrors.contact_no = "Mobile must be 10 digits starting with 6-9";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("1. Form data:", formData);

    // VALIDATION - same
    if (!formData.application_type)
      return alert("Application Type select karo");
    if (!formData.business_entity.trim())
      return alert("Business name enter karo");
    if (!formData.constitution) return alert("Constitution select karo");
    if (!formData.business_activity)
      return alert("Business activity select karo");
    if (!formData.address_line1.trim())
      return alert("Address line 1 enter karo");
    if (!formData.state) return alert("State select karo");
    if (!formData.has_branch) return alert("Branch yes/no select karo");
    if (!formData.pan_no || formData.pan_no.length !== 10)
      return alert("Valid PAN enter karo");
    if (!formData.email) return alert("Email enter karo");
    if (!formData.contact_no || formData.contact_no.length !== 10)
      return alert("10 digit mobile enter karo");

    console.log("2. Validation PASS");

    setLoading(true);

    const dataToSend = {
      serviceCategory: "iecReg",
      leadSource: "india-iecregistration.org",
      ddlApplicationType: formData.application_type,
      txtBusinesEntity: formData.business_entity,
      ddlConstitution: formData.constitution,
      txtdescriptionbusiness: formData.description_business || "",
      ddlBsinessActivity: formData.business_activity,
      txtDate: formData.date_of_incorporation
        ? formatDate(formData.date_of_incorporation)
        : "",
      txtpaddress: formData.address_line1,
      txtpaddress2: formData.address_line2 || "",
      txtpcity: formData.city || "",
      txtpstate: formData.state,
      txtppincode: formData.pincode || "",
      txtPanNo: formData.pan_no.toUpperCase(),
      txtemail: formData.email,
      txtphone: formData.contact_no,
      firm: formData.sez === "Yes" ? "yes" : "no",
      ddlEntityBranch: formData.has_branch === "Yes" ? "true" : "false",
    };

    console.log("3. Final data:", dataToSend);

    try {
      const response = await fetch(
        "https://legalpapers.konceptsoftwaresolutions.com/leadRoutes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        },
      );

      console.log("4. Status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.text(); // ✅ TEXT response
      console.log("5. Raw response:", result);

      // ✅ ANY RESPONSE = SUCCESS (kyunki "Lead post successfully" aa raha hai)
      localStorage.setItem("iecSubmittedData", JSON.stringify(dataToSend));

      setLoading(false);
      setSubmitStatus({
        type: "success",
        message: "Lead posted successfully! Redirecting...",
      });

      // ✅ FORCE REDIRECT
      setTimeout(() => {
        window.location.replace("/payment-summary");
      }, 800);
    } catch (error) {
      console.error("6. ERROR:", error);
      setLoading(false);
      setSubmitStatus({ type: "error", message: "Network error" });
    }
  };

  return (
    <div
      id="registration-form"
      className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200/80"
    >
      <div className="bg-gradient-to-r from-orange-600 to-blue-900 text-white py-6 text-center text-2xl md:text-3xl font-bold tracking-wide shadow-md">
        IEC REGISTRATION FORM
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-10 lg:p-12 space-y-8">
        <FormField
          label="1. Application Type (आवेदन का प्रकार)"
          name="application_type"
          type="select"
          value={formData.application_type}
          onChange={handleChange}
          required
          options={applicationTypes}
          error={errors.application_type}
        />

        <FormField
          label="2. Name of Business Entity (बिजनेस एंटिटी का नाम)"
          name="business_entity"
          value={formData.business_entity}
          onChange={handleChange}
          required
          placeholder="Enter business entity name"
          error={errors.business_entity}
        />

        <FormField
          label="3. Constitution of Business (व्यापार का संविधान)"
          name="constitution"
          type="select"
          value={formData.constitution}
          onChange={handleChange}
          required
          options={constitutions}
          error={errors.constitution}
        />

        <FormField
          label="4. Description of Business (व्यापार का वर्णन)"
          name="description_business"
          type="textarea"
          value={formData.description_business}
          onChange={handleChange}
          placeholder="Briefly describe your business activities..."
          rows={4}
        />

        <FormField
          label="5. Business Activity (व्यावसायिक गतिविधि)"
          name="business_activity"
          type="select"
          value={formData.business_activity}
          onChange={handleChange}
          required
          options={businessActivities}
          error={errors.business_activity}
        />

        <FormField
          label="6. Date of Incorporation / Date of Birth (DD-MM-YYYY)"
          name="date_of_incorporation"
          type="date"
          value={formData.date_of_incorporation}
          onChange={handleChange}
        />

        <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <label className="block text-lg font-semibold text-gray-800">
            7. Principal Place of Business Entity (बिजनेस एंटिटी का प्रमुख
            स्थान)
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                name="address_line1"
                value={formData.address_line1}
                onChange={handleChange}
                placeholder="Address Line 1 *"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 shadow-sm text-gray-800 placeholder-gray-500"
              />
              {errors.address_line1 && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.address_line1}
                </p>
              )}
            </div>
            <input
              type="text"
              name="address_line2"
              value={formData.address_line2}
              onChange={handleChange}
              placeholder="Address Line 2 (optional)"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 shadow-sm text-gray-800 placeholder-gray-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City *"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 shadow-sm text-gray-800 placeholder-gray-500"
            />

            <FormField
              name="state"
              type="select"
              value={formData.state}
              onChange={handleChange}
              required
              options={indianStates}
              error={errors.state}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 shadow-sm text-gray-800"
            />

            <div>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode *"
                maxLength={6}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 shadow-sm text-gray-800 placeholder-gray-500"
              />
              {errors.pincode && (
                <p className="text-red-600 text-sm mt-1">{errors.pincode}</p>
              )}
            </div>
          </div>
        </div>

        <FormField
          label="8. Do You Have Any Branch (क्या आपकी कोई शाखा है)"
          name="has_branch"
          type="select"
          value={formData.has_branch}
          onChange={handleChange}
          required
          options={["Yes", "No"]}
          error={errors.has_branch}
        />

        <FormField
          label="9. PAN No. of Entity (इकाई का पैन नंबर)"
          name="pan_no"
          value={formData.pan_no}
          onChange={handleChange}
          required
          placeholder="ABCDE1234F"
          maxLength={10}
          className="uppercase"
          error={errors.pan_no}
        />

        <FormField
          label="10. E-Mail ID (ईमेल आईडी)"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="yourname@example.com"
          error={errors.email}
        />

        <FormField
          label="11. Contact No. (संपर्क संख्या)"
          name="contact_no"
          type="number"
          value={formData.contact_no}
          onChange={handleChange}
          required
          placeholder="10-digit mobile number"
          maxLength={10}
          error={errors.contact_no}
        />

        <div className="space-y-3 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <label className="block text-lg font-semibold text-gray-800">
            Whether the firm is located in Special Economic Zone (SEZ)
          </label>
          <div className="flex gap-12">
            <label className="flex items-center gap-3 cursor-pointer text-gray-700">
              <input
                type="radio"
                name="sez"
                value="Yes"
                checked={formData.sez === "Yes"}
                onChange={handleChange}
                className="w-5 h-5 text-orange-600 focus:ring-orange-500"
              />
              Yes
            </label>
            <label className="flex items-center gap-3 cursor-pointer text-gray-700">
              <input
                type="radio"
                name="sez"
                value="No"
                checked={formData.sez === "No"}
                onChange={handleChange}
                className="w-5 h-5 text-orange-600 focus:ring-orange-500"
              />
              No
            </label>
          </div>
        </div>

        {submitStatus.message && (
          <div
            className={`p-5 rounded-xl border-l-4 text-center md:text-left shadow-sm ${
              submitStatus.type === "success"
                ? "bg-green-50 border-green-500 text-green-800"
                : submitStatus.type === "error"
                  ? "bg-red-50 border-red-500 text-red-800"
                  : "bg-blue-50 border-blue-500 text-blue-800"
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        <div className="pt-8 flex justify-center">
          <GradientButton
            type="submit"
            disabled={loading}
            className="text-lg py-4 px-16"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              "Submit Application"
            )}
          </GradientButton>
        </div>
      </form>

      <form ref={hiddenFormRef} style={{ display: "none" }} />
      <iframe
        ref={iframeRef}
        name="hiddenIframe"
        style={{ display: "none" }}
        title="Hidden Submission Frame"
      />
    </div>
  );
}