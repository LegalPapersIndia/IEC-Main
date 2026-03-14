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
  "Partnership Firm",
  "Limited Liability Partnership",
  "Private Limited",
  "OPC",
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

const initialFormData = {
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
};

export default function RegistrationForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const [formAlert, setFormAlert] = useState(null);

  const firstErrorRef = useRef(null);

  // No draft loading → form always starts empty on page load / visit

  const handleChange = (e) => {
    const { name, value } = e.target;
    const processedValue = name === "pan_no" ? value.toUpperCase() : value;

    setFormData((prev) => ({ ...prev, [name]: processedValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (formAlert) setFormAlert(null);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setFormAlert(null);
    setSubmitStatus({ type: "", message: "" });
    // No localStorage.removeItem needed since we don't save anymore
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.application_type) newErrors.application_type = "Application Type is required";
    if (!formData.business_entity.trim()) newErrors.business_entity = "Business Entity name is required";
    if (!formData.constitution) newErrors.constitution = "Constitution is required";
    if (!formData.business_activity) newErrors.business_activity = "Business Activity is required";

    // Only state required in address
    if (!formData.state) newErrors.state = "State is required";

    // PAN, Email, Mobile required + format check
    if (!formData.pan_no) newErrors.pan_no = "PAN number is required";
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan_no)) {
      newErrors.pan_no = "Invalid PAN format (ABCDE1234F)";
    }

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";

    if (!formData.contact_no) newErrors.contact_no = "Contact number is required";
    else if (!/^[6-9]\d{9}$/.test(formData.contact_no)) {
      newErrors.contact_no = "Mobile must be 10 digits starting with 6-9";
    }


    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstInvalidName = Object.keys(newErrors)[0];
      const element = document.querySelector(`[name="${firstInvalidName}"]`);
      if (element) firstErrorRef.current = element;
    }

    return Object.keys(newErrors).length === 0;
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormAlert(null);

    if (!validateForm()) {
      setFormAlert({
        type: "error",
        message: "Please fill all required fields correctly.",
      });

      setTimeout(() => {
        if (firstErrorRef.current) {
          firstErrorRef.current.focus();
          firstErrorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 150);

      return;
    }

    setLoading(true);

    const dataToSend = {
      serviceCategory: "iecReg",
      leadSource: "india-iecregistration.org",
      ddlApplicationType: formData.application_type,
      txtBusinesEntity: formData.business_entity,
      ddlConstitution: formData.constitution,
      txtdescriptionbusiness: formData.description_business || "",
      ddlBsinessActivity: formData.business_activity,
      txtDate: formData.date_of_incorporation ? formatDate(formData.date_of_incorporation) : "",
      txtpaddress: formData.address_line1 || "",
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

    try {
      const response = await fetch(
        "https://legalpapers.konceptsoftwaresolutions.com/leadRoutes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      await response.text();

      localStorage.setItem("iecSubmittedData", JSON.stringify(dataToSend));
      resetForm();

      setSubmitStatus({
        type: "success",
        message: "Lead submitted successfully! Redirecting...",
      });

      setTimeout(() => {
        window.location.replace("/payment-summary");
      }, 1800);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="registration-form"
      className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200/80 max-w-4xl mx-auto"
    >
      <div className="bg-gradient-to-r from-orange-600 to-blue-900 text-white py-6 text-center text-2xl md:text-3xl font-bold tracking-wide shadow-md">
        IEC REGISTRATION FORM
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-10 lg:p-12 space-y-8">

        {formAlert && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-5 rounded-xl shadow-sm">
            <strong className="block mb-1">Form not submitted!</strong>
            {formAlert.message}
            <p className="mt-2 text-sm">Please check the highlighted fields below.</p>
          </div>
        )}

        {submitStatus.message && (
          <div
            className={`p-5 rounded-xl border-l-4 text-center shadow-sm ${
              submitStatus.type === "success"
                ? "bg-green-50 border-green-500 text-green-800"
                : "bg-red-50 border-red-500 text-red-800"
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        <FormField
          label="1. Application Type (आवेदन का प्रकार)"
          name="application_type"
          type="select"
          options={applicationTypes}
          value={formData.application_type}
          onChange={handleChange}
          required
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
          options={constitutions}
          value={formData.constitution}
          onChange={handleChange}
          required
          error={errors.constitution}
        />

        <FormField
          label="4. Description of Business (व्यापार का वर्णन) "
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
          options={businessActivities}
          value={formData.business_activity}
          onChange={handleChange}
          required
          error={errors.business_activity}
        />

        <FormField
          label="6. Date of Incorporation / Date of Birth (DD-MM-YYYY) "
          name="date_of_incorporation"
          type="date"
          value={formData.date_of_incorporation}
          onChange={handleChange}
        />

        <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <label className="block text-lg font-semibold text-gray-800">
            7. Principal Place of Business Entity (बिजनेस एंटिटी का प्रमुख स्थान)
          </label>
          <p className="text-sm text-gray-600 -mt-1 mb-4">
            (केवल राज्य अनिवार्य है • बाकी वैकल्पिक)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              name="address_line1"
              placeholder="Address Line 1"
              value={formData.address_line1}
              onChange={handleChange}
            />
            <FormField
              name="address_line2"
              placeholder="Address Line 2"
              value={formData.address_line2}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />

            <FormField
              name="state"
              type="select"
              options={indianStates}
              value={formData.state}
              onChange={handleChange}
              required
              error={errors.state}
            />

            <FormField
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              maxLength={6}
              error={errors.pincode}
            />
          </div>
        </div>

        <FormField
          label="8. Do You Have Any Branch (क्या आपकी कोई शाखा है)"
          name="has_branch"
          type="select"
          options={["Yes", "No"]}
          value={formData.has_branch}
          onChange={handleChange}
          placeholder="Select Yes or No"
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

        <div className="pt-8 flex justify-center">
          <GradientButton
            type="submit"
            disabled={loading}
            className="text-lg py-4 px-20"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
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
    </div>
  );
}