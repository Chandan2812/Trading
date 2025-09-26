import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import docImage from "../../assets/doc_upload-tuKFdIoz.png";
import ProfileImage from "./ProfileImage";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const steps = [
  "Instructions",
  "Proof Of Identity",
  "Proof Of Address",
  "Selfie Proof",
];

export default function IdentityVerification() {
  const [loading, setLoading] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [hasSubmittedDocuments, setHasSubmittedDocuments] = useState(false);
  const [isKycVerified, setIsKycVerified] = useState(false);
  const [_email, setEmail] = useState("");
  const [formFiles, setFormFiles] = useState<{
    identityFront?: File;
    identityBack?: File;
    addressProof?: File;
    selfieProof?: File;
  }>({});

  useEffect(() => {
    const fetchUser = async () => {
      const email = JSON.parse(localStorage.getItem("user") || "{}").email;
      if (!email) {
        alert("User email not found.");
        return;
      }
      setEmail(email);

      try {
        const response = await axios.get(`${baseURL}/api/auth/user/${email}`);
        console.log(response.data.hasSubmittedDocuments);
        setHasSubmittedDocuments(response.data.hasSubmittedDocuments);
        setIsKycVerified(response.data.isKycVerified);
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };

    fetchUser();
  }, []);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: keyof typeof formFiles
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormFiles((prev) => ({ ...prev, [name]: file }));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (formFiles.identityFront)
      formData.append("identityFront", formFiles.identityFront);
    if (formFiles.identityBack)
      formData.append("identityBack", formFiles.identityBack);
    if (formFiles.addressProof)
      formData.append("addressProof", formFiles.addressProof);
    if (formFiles.selfieProof)
      formData.append("selfieProof", formFiles.selfieProof);
    setLoading(true);

    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }

    const email = JSON.parse(localStorage.getItem("user") || "{}").email;
    if (!email) {
      alert("User email not found.");
      return;
    }

    try {
      await axios.put(`${baseURL}/api/auth/documents/${email}`, formData);
      alert("Documents submitted successfully!");

      window.location.reload();
      setFormFiles({});
    } catch (err) {
      console.error(err);
      alert("Submission failed. Try again.");
    } finally {
      setLoading(false); // ⬅️ Turn off loading state
    }
  };

  const filePreview = (file?: File) => {
    if (!file) return null;
    const url = URL.createObjectURL(file);
    if (file.type.includes("image")) {
      return <img src={url} alt="preview" className="h-20 mt-2" />;
    } else {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline block mt-2 text-sm"
        >
          View Uploaded Document
        </a>
      );
    }
  };
  if (hasSubmittedDocuments) {
    if (isKycVerified) {
      return (
        <div className="space-y-6">
          <ProfileImage />

          <div className="bg-[#121a2a]  p-6 rounded-xl shadow-lg text-center">
            {/* Icon + Badge */}
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-green-600/20 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="px-3 py-1 text-sm font-medium bg-green-600/20 text-green-400 rounded-full">
                Verified
              </span>
            </div>

            <h2 className="text-xl font-semibold mt-4 text-white">
              Documents Verified
            </h2>
            <p className="text-gray-400 mt-2">
              Your documents have been successfully verified. You can now
              continue using all available services without restrictions.
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-6">
          <ProfileImage />

          <div className="bg-[#121a2a] border border-yellow-600/40 p-6 rounded-xl shadow-lg text-center">
            {/* Icon + Badge */}
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-yellow-600/20 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-yellow-400 animate-pulse"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                  />
                </svg>
              </div>
              <span className="px-3 py-1 text-sm font-medium bg-yellow-600/20 text-yellow-400 rounded-full">
                Pending Review
              </span>
            </div>

            <h2 className="text-xl font-semibold mt-4 text-white">
              Documents Under Review
            </h2>
            <p className="text-gray-400 mt-2">
              You have already submitted your documents. Our team is reviewing
              them, and you’ll be notified once they are approved.
            </p>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="space-y-4">
      <ProfileImage />

      {/* Timeline */}
      <div className="w-full flex flex-col items-center">
        <div className="flex items-center justify-between w-full">
          {steps.map((_step, index) => (
            <div
              key={index}
              className="flex-1 flex items-center justify-center relative"
            >
              {index !== 0 && (
                <div
                  className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1/2 h-1 ${
                    currentStep > index ? "bg-[var(--primary)]" : "bg-gray-600"
                  }`}
                />
              )}
              {index !== steps.length - 1 && (
                <div
                  className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-1 ${
                    currentStep > index + 1
                      ? "bg-[var(--primary)]"
                      : "bg-gray-600"
                  }`}
                />
              )}
              <div
                className={`w-8 h-8 rounded-full z-10 flex items-center justify-center text-sm font-semibold ${
                  currentStep === index + 1
                    ? "bg-[var(--primary)] text-white"
                    : currentStep > index + 1
                      ? "bg-[var(--primary)] text-white"
                      : "bg-gray-600 text-white"
                }`}
              >
                {currentStep > index + 1 ? (
                  <CheckCircle size={16} />
                ) : (
                  index + 1
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between w-full mt-2 text-xs text-white">
          {steps.map((step, i) => (
            <div key={i} className="w-1/4 text-center">
              {step}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1 - Instructions */}
      {currentStep === 1 && (
        <div className="bg-[#121a2a] border border-gray-800 p-6 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              INSTRUCTIONS TO UPLOAD DOCUMENTS
            </h2>
            <p className="text-sm text-gray-400">
              Your document security is our top priority.
              <br />
              Rest assured, all files uploaded through this portal are securely
              stored.
            </p>
            {[
              "Accepted File Formats: PDF, JPG, JPEG, PNG",
              "File Size Limitation: 5 MB per file",
              "Document Clarity: The document must be clear and readable.",
              "Valid Identity Card",
              "Selfie Clarity: Selfie with Document",
            ].map((text, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-6 h-6 bg-[var(--primary)] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <p className="text-sm text-gray-300">{text}</p>
              </div>
            ))}
            <button
              onClick={() => setCurrentStep(2)}
              className="mt-6 bg-[var(--primary)] cursor-pointer text-white font-semibold px-6 py-2 rounded-md"
            >
              Next
            </button>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <img src={docImage} alt="doc" className="w-60 h-auto" />
          </div>
        </div>
      )}

      {/* Step 2 - Proof of Identity */}
      {currentStep === 2 && (
        <div className="bg-[#121a2a] border border-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4">
            UPLOAD YOUR PROOF OF IDENTITY
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            BOTH FILES ARE MANDATORY. Upload front and back of your ID card.
          </p>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white">
                Front Side
              </label>
              <input
                name="identityFront"
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => handleFileChange(e, "identityFront")}
                className="mt-1 file:bg-white file:text-black file:px-3 file:py-1 file:rounded file:border-0 file:font-medium text-sm text-white w-full cursor-pointer"
              />
              {filePreview(formFiles.identityFront)}
            </div>
            <div>
              <label className="text-sm font-medium text-white">
                Back Side
              </label>
              <input
                name="identityBack"
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => handleFileChange(e, "identityBack")}
                className="mt-1 file:bg-white file:text-black file:px-3 file:py-1 file:rounded file:border-0 file:font-medium text-sm text-white w-full cursor-pointer"
              />
              {filePreview(formFiles.identityBack)}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Note: Images should be in JPG or PNG format only.
            </p>
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentStep(1)}
              className="bg-gray-600 px-6 py-2 rounded-md text-white"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              disabled={!formFiles.identityFront || !formFiles.identityBack}
              className={`px-6 py-2 rounded-md text-white cursor-pointer ${
                formFiles.identityFront && formFiles.identityBack
                  ? "bg-[var(--primary)]"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3 - Address Proof */}
      {currentStep === 3 && (
        <div className="bg-[#121a2a] border border-gray-800 p-6 rounded-xl shadow-lg">
          <label className="text-sm font-medium text-white">
            ADDRESS PROOF
          </label>
          <input
            name="addressProof"
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => handleFileChange(e, "addressProof")}
            className="mt-1 file:bg-white file:text-black file:px-3 file:py-1 file:rounded file:border-0 file:font-medium text-sm text-white w-full cursor-pointer"
          />
          <p className="text-xs text-gray-400 mt-2">
            Note: Images should be in JPG or PNG format only.
          </p>
          {filePreview(formFiles.addressProof)}

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentStep(2)}
              className="bg-gray-600 px-6 py-2 rounded-md text-white"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              disabled={!formFiles.addressProof}
              className={`px-6 py-2 rounded-md text-white cursor-pointer ${
                formFiles.addressProof
                  ? "bg-[var(--primary)]"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 4 - Selfie Proof */}
      {currentStep === 4 && (
        <div className="bg-[#121a2a] border border-gray-800 p-6 rounded-xl shadow-lg">
          <label className="text-sm font-medium text-white">SELFIE PROOF</label>
          <input
            name="selfieProof"
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => handleFileChange(e, "selfieProof")}
            className="mt-1 file:bg-white file:text-black file:px-3 file:py-1 file:rounded file:border-0 file:font-medium text-sm text-white w-full cursor-pointer"
          />
          <p className="text-xs text-gray-400 mt-2">
            Note: Images should be in JPG or PNG format only.
          </p>
          {filePreview(formFiles.selfieProof)}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentStep(3)}
              className="bg-gray-600 px-6 py-2 rounded-md text-white"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formFiles.selfieProof || loading}
              className={`px-6 py-2 rounded-md text-white cursor-pointer ${
                formFiles.selfieProof || loading
                  ? "bg-[var(--primary)]"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
