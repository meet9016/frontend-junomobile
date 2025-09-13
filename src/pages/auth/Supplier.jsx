import React, { useState } from "react";
import { toast } from "react-toastify";
import endPointApi from "../utils.jsx/endPointApi";
import api from "../utils.jsx/axiosInstance";
import OtpInput from 'react-otp-input';

const SupplierForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
    capture_code: ""
  });

  const [otp, setOtp] = useState("");
  const [error, setError] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Submit Supplier Form
  const handleSubmit = async () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.businessName)
      newErrors.businessName = "Business name is required";
    if (!formData.mobile) {
      newErrors.mobile = "Mobile is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile must be a 10-digit number";
    }

    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be a 6-digit number";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    const formdata = new FormData();

    formdata.append("full_name", formData.fullName);
    formdata.append("company_name", formData.businessName);
    formdata.append("number", formData.mobile);
    formdata.append("address", formData.address);
    formdata.append("city", formData.city);
    formdata.append("pincode", formData.pincode);

    if (formData.capture_code) {
      formdata.append("otp", otp);
      formdata.append("capture_code", formData.capture_code);
    }

    // try {
    const res = await api.post(`${endPointApi.becomeSupplier}`, formdata);

    if (res.data.status === 200) {
      toast.success(res.data.message);

      if (res.data.data.capture_code) {
        setFormData(prev => ({
          ...prev,
          capture_code: res.data.data.capture_code
        }));
        // setNewSupplier(true);

      }
      if (res.data.data.token) {
        const token = res.data.data.token;
        // window.location.href = `http://localhost:5174/?token=${token}`;
        window.location.href = `https://seller.progressalliance.org/?token=${token}`;
        // window.open("http://localhost:5174/?token=78785477", "_blank");

      }
    }else if(res.data.status === 400){
      toast.error(res.data.message)
    }
    // } catch (err) {
    //   toast.error("Something went wrong. Try again.");
    // }
  };

  return (
    <div className="w-full mx-auto bg-gray-100 rounded-xl p-4 sm:p-5 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* LEFT */}
        <div className="hidden md:flex bg-[#251C4B] text-white rounded-2xl p-6 flex-col justify-between">
          {/* <div>
            <h2 className="text-2xl font-semibold leading-tight">Become a</h2>
            <h2 className="text-2xl font-semibold leading-tight">
              Progress Alliance Supplier
            </h2>
            <div className="mt-3 text-sm leading-6 text-white/90 text-justify">
              <p>
                Join us as a trusted supplier and collaborate with Progress
                Alliance. Provide your business details to get started with our
                partnership opportunities.
              </p>
            </div>
          </div> */}
          <div className="flex justify-center mt-4">
            <img
              src="https://superadmin.progressalliance.org/upload/web_logo/seller_reg.jpeg"
              alt="Supplier Illustration"
              className="w-full object-contain"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center px-4 sm:px-5 py-6 bg-white rounded-2xl shadow-md">
          <div className="text-center">
            <h3 className="text-2xl font-extrabold text-gray-900">
              Supplier Registration
            </h3>
            <p className="mt-1 font-normal text-black text-[16px]">
              Please fill in your details
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {/* Full Name */}
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full border rounded-md px-3 py-3 focus:ring-2 focus:ring-[#251C4B] outline-none"
                value={formData.fullName}
                onChange={handleChange}
              />
              {error.fullName && (
                <p className="text-red-500 text-sm">{error.fullName}</p>
              )}
            </div>

            {/* Business Name */}
            <div>
              <input
                type="text"
                name="businessName"
                placeholder="Business Name"
                className="w-full border rounded-md px-3 py-3 focus:ring-2 focus:ring-[#251C4B] outline-none"
                value={formData.businessName}
                onChange={handleChange}
              />
              {error.businessName && (
                <p className="text-red-500 text-sm">{error.businessName}</p>
              )}
            </div>

            {/* Mobile Number (Optional) */}
            <div>
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                className="w-full border rounded-md px-3 py-3 focus:ring-2 focus:ring-[#251C4B] outline-none"
                value={formData.mobile}
                onChange={handleChange}
              />
              {error.mobile && (
                <p className="text-red-500 text-sm">{error.mobile}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <textarea
                name="address"
                placeholder="Full Address"
                className="w-full border rounded-md px-3 py-3 focus:ring-2 focus:ring-[#251C4B] outline-none"
                rows={3}
                value={formData.address}
                onChange={handleChange}
              />
              {error.address && (
                <p className="text-red-500 text-sm">{error.address}</p>
              )}
            </div>

            {/* City */}
            <div>
              <input
                type="text"
                name="city"
                placeholder="City"
                className="w-full border rounded-md px-3 py-3 focus:ring-2 focus:ring-[#251C4B] outline-none"
                value={formData.city}
                onChange={handleChange}
              />
              {error.city && (
                <p className="text-red-500 text-sm">{error.city}</p>
              )}
            </div>

            {/* Pincode */}
            <div>
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                className="w-full border rounded-md px-3 py-3 focus:ring-2 focus:ring-[#251C4B] outline-none"
                value={formData.pincode}
                onChange={handleChange}
                maxLength={6}
              />
              {error.pincode && (
                <p className="text-red-500 text-sm">{error.pincode}</p>
              )}
            </div>

            {formData.capture_code && (
              <div className="flex justify-center gap-10">
                <OtpInput
                  value={otp}
                  onChange={setOtp}   // 👈 directly set the string
                  numInputs={6}
                  renderSeparator={<span className="text-white">-</span>}
                  shouldAutoFocus
                  renderInput={(props) => (
                    <input
                      {...props}
                      style={{ width: "35px", height: "40px" }}
                      className="border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#251C4B] transition"
                    />
                  )}
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-[#251C4B] text-white py-3 rounded-md font-medium hover:bg-[#251C4B]/90 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierForm;
