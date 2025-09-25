import { useState } from "react";
import Button from "./Button";
import axios, { AxiosError } from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

interface IBRequestProps {
  user: {
    email: string;
    ibRequestPending?: boolean;
  };
  refreshUser?: () => void;
  setUser?: (user: IBRequestProps["user"]) => void;
}

interface FormData {
  existingClientBase: string;
  offerEducation: string;
  expectedClientsNext3Months: string;
  expectedCommissionDirect: string;
  expectedCommissionSubIB: string;
  yourShare: string;
  clientShare: string;
}

function IBRequest({ user, refreshUser, setUser }: IBRequestProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    existingClientBase: "",
    offerEducation: "",
    expectedClientsNext3Months: "",
    expectedCommissionDirect: "",
    expectedCommissionSubIB: "0",
    yourShare: "0",
    clientShare: "0",
  });
  const [loading, setLoading] = useState(false);

  // Update form values
  const handleChange = (field: keyof FormData, value: string) => {
    const updated: FormData = { ...formData, [field]: value };

    if (field === "expectedCommissionDirect") {
      const commissionValue = parseInt(value, 10) || 0;
      updated.yourShare = String(commissionValue / 2);
      updated.clientShare = String(commissionValue / 2);
    }

    setFormData(updated);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(`${baseURL}/api/ib/register`, {
        ...formData,
        email: user.email,
      });

      alert("✅ IB Request Submitted!");
      setShowForm(false);

      // mark request as pending instantly
      setUser?.({ ...user, ibRequestPending: true });

      // refresh user from backend
      refreshUser?.();
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      if (
        axiosErr.response?.status === 400 &&
        axiosErr.response?.data?.message
      ) {
        alert(`⚠️ ${axiosErr.response.data.message}`);
      } else {
        alert("❌ Something went wrong while submitting IB request");
      }
      console.error("❌ Error submitting IB request:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-fit bg-gradient-to-br from-[#0a0f1d] to-[#0f172a] px-6 md:px-12 py-10 text-white">
      <div>
        <h1 className="text-lg md:text-xl border-b font-bold mb-4">
          Become an Introducing Broker With Billion Dollar FX
        </h1>
        <p className="text-gray-400 mb-6 leading-relaxed">
          Join our Introducing Broker (IB) program and unlock the potential to
          grow your business and increase your revenue. As a valued partner,
          you&#39;ll gain access to our world-class trading technology,
          dedicated support, and competitive compensation structures.
        </p>

        {/* Benefits */}
        <h2 className="text-xl text-gray-300 font-semibold mb-3">
          Benefits of Being an Introducing Broker:
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-400 mb-6">
          <li>
            <span className="font-medium text-white">Attractive Rebates:</span>{" "}
            Earn commissions on referred client activity.
          </li>
          <li>
            <span className="font-medium text-white">Marketing Support:</span>{" "}
            Access tools to grow your reach.
          </li>
          <li>
            <span className="font-medium text-white">Dedicated Manager:</span>{" "}
            Personalized support to help you scale.
          </li>
          <li>
            <span className="font-medium text-white">
              Transparent Reporting:
            </span>{" "}
            Track earnings and client activity easily.
          </li>
        </ul>

        {/* Steps */}
        <h2 className="text-xl text-gray-300 font-semibold mb-3">
          How to Become an IB?
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-400 mb-6">
          <li>Place a request</li>
          <li>Receive confirmation and your IB link</li>
          <li>Start promoting and earning!</li>
        </ol>

        {/* Status Button */}
        <div className="text-center">
          {user.ibRequestPending ? (
            <Button text="IB Request Awaiting Approval" disabled />
          ) : (
            <Button
              text="Enroll To Become IB"
              onClick={() => setShowForm(true)}
            />
          )}
        </div>
      </div>

      {/* Modal Form */}
      {showForm && !user.ibRequestPending && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-[#111a2e] p-6 rounded-lg w-[90%] md:w-[500px]">
            <h2 className="text-xl font-semibold mb-4">
              IB Onboarding Questions
            </h2>

            {/* Q1 */}
            <label className="block mb-2">
              Do you have an existing client base?
            </label>
            <select
              value={formData.existingClientBase}
              onChange={(e) =>
                handleChange("existingClientBase", e.target.value)
              }
              className="w-full p-2 mb-4 bg-gray-800 rounded"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            {/* Q2 */}
            <label className="block mb-2">
              Do you offer client education, mentorship, or training?
            </label>
            <select
              value={formData.offerEducation}
              onChange={(e) => handleChange("offerEducation", e.target.value)}
              className="w-full p-2 mb-4 bg-gray-800 rounded"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            {/* Q3 */}
            <label className="block mb-2">
              How many clients do you expect to onboard in the next 3 months?
            </label>
            <select
              value={formData.expectedClientsNext3Months}
              onChange={(e) =>
                handleChange("expectedClientsNext3Months", e.target.value)
              }
              className="w-full p-2 mb-4 bg-gray-800 rounded"
            >
              <option value="">Select</option>
              <option value="0-10">0-10</option> {/* ✅ FIXED */}
              <option value="10-50">10-50</option>
              <option value="50-100">50-100</option>
              <option value="100+">100+</option>
            </select>

            {/* Q4 */}
            <label className="block mb-2">
              What commission per lot do you expect from your direct client?
            </label>
            <select
              value={formData.expectedCommissionDirect}
              onChange={(e) =>
                handleChange("expectedCommissionDirect", e.target.value)
              }
              className="w-full p-2 mb-4 bg-gray-800 rounded"
            >
              <option value="">Select</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="8">8</option>
              <option value="10">10</option>
            </select>

            {/* Q5 & Q6 */}
            <div className="flex justify-between mb-6">
              <div>
                <label className="block mb-2">Your Share</label>
                <input
                  type="text"
                  value={formData.yourShare}
                  readOnly
                  className="w-full p-2 bg-gray-700 rounded text-center"
                />
              </div>
              <div>
                <label className="block mb-2">Client Share</label>
                <input
                  type="text"
                  value={formData.clientShare}
                  readOnly
                  className="w-full p-2 bg-gray-700 rounded text-center"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <button
                className="px-4  bg-gray-600 rounded-md hover:bg-gray-700"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <Button
                onClick={handleSubmit}
                text={loading ? "Submitting..." : "Submit Request"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IBRequest;
