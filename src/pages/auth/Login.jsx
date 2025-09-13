// import React, { useState } from "react";
// import { useNavigate } from "react-router";
// import api from "../utils.jsx/axiosInstance";
// import endPointApi from "../utils.jsx/endPointApi";
// import { saveToken } from "../utils.jsx/tokenManager";
// import { toast } from "react-toastify";
// import OtpInput from 'react-otp-input';

// const Login = ({ onClose }) => {
//     const navigate = useNavigate();
//     const authToken = localStorage.getItem('auth_token')
//     const [formData, setFormData] = useState({
//         mobile: "",
//         otp: "",
//         capture_code: "",
//         full_name: "",
//         businessName: "",
//         address: "",
//         city: "",
//         pincode: "",
//     });
//     const [error, setError] = useState({});
//     const [otpSent, setOtpSent] = useState(false);
//     const [newSupplier, setNewSupplier] = useState(false);
//     const [userType, setUserType] = useState(false);

//     console.log(userType, 'userType')

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//         setError((prev) => ({
//             ...prev,
//             [name]: "",
//         }));
//     };

//     // Send OTP function
//     const sendOtp = async () => {
//         if (!formData.mobile) {
//             setError({ mobile: "Mobile number is required" });
//             return;
//         } else if (!/^\d{10}$/.test(formData.mobile)) {
//             setError({ mobile: "Please enter a valid 10-digit mobile number" });
//             return;
//         }

//         try {
//             const formdata = new FormData();
//             formdata.append("number", formData.mobile);

//             const res = await api.post(`${endPointApi.loginUser}`, formdata); // Send only mobile
//             if (res.data.status === 200) {
//                 toast.success(res.data.message);
//                 setOtpSent(true);
//             } else {
//                 toast.error(res.data.message);
//             }
//         } catch (err) {
//             toast.error("Something went wrong while sending OTP");
//         }
//     };

//     // Login function
//     const onLoginClick = async () => {
//         let newErrors = {};

//         // 🔎 Basic validations
//         if (!formData.mobile) {
//             newErrors.mobile = "Mobile number is required"
//         } else if (!/^\d{10}$/.test(formData.mobile)) {
//             newErrors.mobile = "Enter a valid 10-digit mobile number"
//         }

//         if (!formData.otp) {
//             newErrors.otp = "OTP is required"
//         } else if (!/^\d{4,6}$/.test(formData.otp)) {
//             newErrors.otp = "OTP should be 4–6 digits"
//         }

//         // 🔎 If capture_code step is required → validate extra fields
//         if (formData.capture_code) {
//             if (!formData.full_name) newErrors.full_name = "Full name is required"
//             // if (!formData.fubusinessNamell_name) newErrors.businessName = "Business name is required"
//             if (!formData.address) newErrors.address = "Address is required"
//             if (!formData.city) newErrors.city = "City is required"
//             if (!formData.pincode) {
//                 newErrors.pincode = "Pincode is required"
//             } else if (!/^\d{6}$/.test(formData.pincode)) {
//                 newErrors.pincode = "Enter a valid 6-digit pincode"
//             }
//         }

//         // 🚫 Stop if errors found
//         if (Object.keys(newErrors).length > 0) {
//             setError(newErrors)
//             return
//         }


//         const formdata = new FormData();
// formdata.append("number", formData.mobile);
// formdata.append("otp", formData.otp);

// if (formData.capture_code) formdata.append('capture_code', formData.capture_code)
// if (formData.full_name) formdata.append('full_name', formData.full_name)
// // if (formData.businessName) formdata.append('full_name', formData.businessName)
// if (formData.address) formdata.append('address', formData.address)
// if (formData.city) formdata.append('city', formData.city)
// if (formData.pincode) formdata.append('pincode', formData.pincode)

//         const res = await api.post(`${endPointApi.loginUser}`, formdata); // Send mobile + OTP
//         console.log("res", res.data.status);

//         if (res.data.status === 200) {
//             saveToken(res?.data?.data?.token)
//             if (res.data.data.user_type == 2) {
//                 setUserType(true)
//             } else {
//                 if (onClose) onClose()
//                 navigate('/')
//                 toast.success(res?.data?.message || 'Logged in')
//             }
//         } else if (res.data.status === 203) {
//             setFormData(prev => ({
//                 ...prev,
//                 capture_code: res.data.data?.capture_code ?? prev.capture_code
//             }))
//             setNewSupplier(true) // show OTP / capture-code UI
//             toast.info(res?.data?.message || 'Enter the OTP / capture code sent to you')
//         }

//     };

//     const Suuplier = () => {
//         // window.location.href = `http://localhost:5174/?token=${token}`;
//         window.location.href = `https://seller.progressalliance.org/?token=${authToken}`;
//     }

//     const onCounting = () => {
//         if (onClose) onClose()
//         navigate('/')
//     }
//     return (
//         <div className="w-full mx-auto bg-gray-100 rounded-xl p-4 sm:p-5 md:p-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* LEFT */}
//                 <div className="hidden md:flex bg-[#251C4B] text-white rounded-2xl p-4 sm:p-5 flex-col justify-between">
//                     {/* <div>
//                         <h2 className="text-xl sm:text-2xl font-semibold leading-tight">
//                             Welcome to
//                         </h2>
//                         <h2 className="text-xl sm:text-2xl font-semibold leading-tight">
//                             Progress Alliance
//                         </h2>
//                         <div className="mt-3 text-sm sm:text-[15px] leading-6 text-white/90 text-justify">
//                             <p>
//                                 Progress Alliance is a Nonprofit organization established in 2014
//                                 with 8 members consisting of entrepreneurs of varying business
//                                 fields and with experiences. We focus on providing an environment
//                                 for them to grow in the professional and personal aspects of their
//                                 lives.
//                             </p>
//                         </div>
//                     </div> */}
//                     <div className="flex justify-center mt-4">
//                         <img
//                             src="https://superadmin.progressalliance.org/upload/web_logo/be_come_seller.jpeg"
//                             alt="Welcome Illustration"
//                             className="w-full object-contain"
//                         />
//                     </div>
//                 </div>

//                 {/* RIGHT */}
//                 <div className="flex flex-col justify-center px-4 sm:px-5 py-6">
//                     <div className="flex justify-center mb-6">
//                         <img
//                             src="https://superadmin.progressalliance.org/upload/web_logo/login_popup.png"
//                             alt="Logo"
//                             className="w-28 sm:w-32 md:w-40 cursor-pointer"
//                             onClick={() => navigate('/')}
//                         />
//                     </div>
//                     <div className="text-center">
//                         <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
//                             Welcome Back
//                         </h3>
//                         <p className="mt-1 font-normal text-black text-[18px]">
//                             Please login to your account
//                         </p>
//                     </div>
//                     <div className="mt-6 space-y-4">
//                         {formData.capture_code === "" && (
//                             <>

//                                 {/* Mobile Input */}
//                                 <div>
//                                     <input
//                                         type="text"
//                                         name="mobile"
//                                         placeholder="Phone Number"
//                                         className="w-full rounded-md bg-white px-3 py-3 outline-none focus:ring-2 ring-[#251C4B]/30 placeholder-black"
//                                         value={formData.mobile}
//                                         onChange={handleChange}
//                                         maxLength={10}
//                                     // disabled={otpSent} // disable after sending OTP
//                                     />
//                                     {error.mobile && (
//                                         <p className="text-red-500 text-sm leading-tight m-1">
//                                             {error.mobile}
//                                         </p>
//                                     )}
//                                 </div>

//                                 {/* OTP Input */}
//                                 {otpSent && (
//                                     <div className="flex justify-center gap-10">
//                                         <OtpInput
//                                             value={formData.otp}
//                                             onChange={(otp) => setFormData(prev => ({ ...prev, otp }))}
//                                             numInputs={6}
//                                             renderSeparator={<span className="text-white">-</span>}
//                                             shouldAutoFocus
//                                             renderInput={(props) => (
//                                                 <input
//                                                     {...props}
//                                                     style={{ width: "35px", height: "40px" }}
//                                                     className="border  border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#251C4B] transition"
//                                                 />
//                                             )}
//                                         />
//                                         {error.otp && (
//                                             <p className="text-red-500 text-sm">
//                                                 {error.otp}
//                                             </p>
//                                         )}
//                                     </div>
//                                 )}
//                             </>
//                         )}
//                         {
//                             newSupplier && (
//                                 <>
//                                     {/* Full Name */}
//                                     <div>
//                                         <input
//                                             type="text"
//                                             name="full_name"
//                                             placeholder="Full Name"
//                                             className="w-full border rounded-md px-3 py-3 focus:ring-2 focus:ring-[#251C4B] outline-none"
//                                             value={formData.full_name}
//                                             onChange={handleChange}
//                                         />
//                                         {error.full_name && (
//                                             <p className="text-red-500 text-sm">{error.full_name}</p>
//                                         )}
//                                     </div>

//                                     {/* Business Name */}
//                                     {/* <div>
//                                         <input
//                                             type="text"
//                                             name="businessName"
//                                             placeholder="Business Name"
//                                             className="w-full border rounded-md px-3 py-3 focus:ring-2 focus:ring-[#251C4B] outline-none"
//                                             value={formData.businessName}
//                                             onChange={handleChange}
//                                         />
//                                         {error.businessName && (
//                                             <p className="text-red-500 text-sm">{error.businessName}</p>
//                                         )}
//                                     </div> */}

//                                     {/* Address */}
//                                     <div>
//                                         <textarea
//                                             name="address"
//                                             placeholder="Full Address"
//                                             className="w-full border rounded-md px-3 py-3 focus:ring-2 focus:ring-[#251C4B] outline-none"
//                                             rows={3}
//                                             value={formData.address}
//                                             onChange={handleChange}
//                                         />
//                                         {error.address && (
//                                             <p className="text-red-500 text-sm">{error.address}</p>
//                                         )}
//                                     </div>

//                                     {/* City */}
//                                     <div>
//                                         <input
//                                             type="text"
//                                             name="city"
//                                             placeholder="City"
//                                             className="w-full border rounded-md px-3 py-3 focus:ring-2 focus:ring-[#251C4B] outline-none"
//                                             value={formData.city}
//                                             onChange={handleChange}
//                                         />
//                                         {error.city && (
//                                             <p className="text-red-500 text-sm">{error.city}</p>
//                                         )}
//                                     </div>

//                                     {/* Pincode */}
//                                     <div>
//                                         <input
//                                             type="text"
//                                             name="pincode"
//                                             placeholder="Pincode"
//                                             className="w-full border rounded-md px-3 py-3 focus:ring-2 focus:ring-[#251C4B] outline-none"
//                                             value={formData.pincode}
//                                             onChange={handleChange}
//                                             maxLength={6}
//                                         />
//                                         {error.pincode && (
//                                             <p className="text-red-500 text-sm">{error.pincode}</p>
//                                         )}
//                                     </div>
//                                 </>
//                             )
//                         }
//                         {/* Button */}
//                         <div className="mt-5 w-full">
//                             {!otpSent ? (
//                                 <button
//                                     className="w-full bg-[#251C4B] text-white py-3 rounded-md font-medium hover:bg-[#251C4B]/90 transition"
//                                     onClick={sendOtp}
//                                 >
//                                     Send OTP
//                                 </button>
//                             ) : (
//                                 <>
//                                     {userType ?
//                                         <div className="flex gap-4">
//                                             <button
//                                                 className="flex-1 bg-[#251C4B] text-white py-3 rounded-md font-medium hover:bg-[#251C4B]/90 transition"
//                                                 onClick={onCounting}
//                                             >
//                                                 Become
//                                             </button>

//                                             <button
//                                                 className="flex-1 bg-[#251C4B] text-white py-3 rounded-md font-medium hover:bg-[#251C4B]/90 transition"
//                                                 onClick={Suuplier}
//                                             >
//                                                 Suuplier
//                                             </button>
//                                         </div>

//                                         :
//                                         <button
//                                             className="w-full bg-[#251C4B] text-white py-3 rounded-md font-medium hover:bg-[#251C4B]/90 transition"
//                                             onClick={onLoginClick}
//                                         >
//                                             Login
//                                         </button>
//                                     }
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div >
//     );
// };

// export default Login;



































































import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import api from "../utils.jsx/axiosInstance";
import endPointApi from "../utils.jsx/endPointApi";
import { saveToken } from "../utils.jsx/tokenManager";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";

const Login = ({ onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const param = location.pathname;

    const authToken = localStorage.getItem("auth_token");
    const [formData, setFormData] = useState({
        mobile: "",
        otp: "",
        capture_code: "",
        full_name: "",
        businessName: "",
        address: "",
        city: "",
        pincode: "",
    });
    const [error, setError] = useState({});
    const [otpSent, setOtpSent] = useState(false);
    const [newSupplier, setNewSupplier] = useState(false);

    const [showButtons, setShowButtons] = useState(false); // new state

    const [userType, setUserType] = useState(false);
    // console.log(userType, 'USERTYPE')

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;


        if (name === 'mobile') {
            newValue = value.replace(/[^0-9]/g, "");
            if (newValue.length > 10) {
                newValue = newValue.slice(0, 10);
            }
        }
        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
        setError((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    // Send OTP
    const sendOtp = async () => {
        if (!formData.mobile) {
            setError({ mobile: "Mobile number is required" });
            return;
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            setError({ mobile: "Please enter a valid 10-digit mobile number" });
            return;
        }

        try {
            const formdata = new FormData();
            formdata.append("number", formData.mobile);

            const res = await api.post(`${endPointApi.loginUser}`, formdata);
            if (res.data.status === 200) {
                toast.success(res.data.message);
                setOtpSent(true);
            } else {
                toast.error(res.data.message)
            }
        } catch (err) {
            console.log("aaa")
        }
    };

    // Login
    const onLoginClick = async () => {
        let newErrors = {};
        if (!formData.mobile) {
            newErrors.mobile = "Mobile number is required";
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = "Enter a valid 10-digit mobile number";
        }

        if (!formData.otp) {
            newErrors.otp = "OTP is required";
        } else if (!/^\d{4,6}$/.test(formData.otp)) {
            newErrors.otp = "OTP should be 4–6 digits";
        }

        if (formData.capture_code) {
            if (!formData.full_name) newErrors.full_name = "Full name is required"
            // if (!formData.fubusinessNamell_name) newErrors.businessName = "Business name is required"
            // if (!formData.address) newErrors.address = "Address is required"
            if (!formData.city) newErrors.city = "City is required"
            if (!formData.pincode) {
                newErrors.pincode = "Pincode is required"
            } else if (!/^\d{6}$/.test(formData.pincode)) {
                newErrors.pincode = "Enter a valid 6-digit pincode"
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }

        const formdata = new FormData();
        // formdata.append("number", formData.mobile);
        // formdata.append("otp", formData.otp);

        formdata.append("number", formData.mobile);
        formdata.append("otp", formData.otp);

        if (formData.capture_code) formdata.append('capture_code', formData.capture_code)
        if (formData.full_name) formdata.append('full_name', formData.full_name)
        // if (formData.businessName) formdata.append('full_name', formData.businessName)
        // if (formData.address) formdata.append('address', formData.address)
        if (formData.city) formdata.append('city', formData.city)
        if (formData.pincode) formdata.append('pincode', formData.pincode)

        const res = await api.post(`${endPointApi.loginUser}`, formdata);

        if (res.data.status === 200) {
            saveToken(res?.data?.data?.token);
            setShowButtons(true); //  only show Become & Supplier buttons
            if (res.data.data.user_type == 2) {
                setUserType(true)
                setShowButtons(true); // only show Become & Supplier buttons
            } else {
                const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
                localStorage.removeItem("redirectAfterLogin");
                if (onClose) onClose()
                navigate(redirectPath);
                toast.success(res?.data?.message || 'Logged in')
            }
        } else if (res.data.status === 203) {
            setFormData((prev) => ({
                ...prev,
                capture_code: res.data.data?.capture_code ?? prev.capture_code,
            }));
            setNewSupplier(true);
            toast.info(
                res?.data?.message || "Enter the OTP / capture code sent to you"
            );
        } else {
            toast.error(res.data.message)
        }
    };

    const Suuplier = () => {
        window.location.href = `https://seller.progressalliance.org/?token=${authToken}`;
    };

    const onCounting = () => {
        if (onClose) onClose();
        if (param) {
            navigate(param)
        } else {
            navigate("/");
        }
    };

    return (
        <div className="w-full mx-auto bg-gray-100 rounded-xl p-4 sm:p-5 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LEFT */}
                <div className="hidden md:flex bg-[#251C4B] text-white rounded-2xl p-4 sm:p-5 flex-col justify-between">
                    <div className="flex justify-center mt-4">
                        <img
                            src="https://superadmin.progressalliance.org/upload/web_logo/be_come_seller.jpeg"
                            alt="Welcome Illustration"
                            className="w-full object-contain"
                        />
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col justify-center px-4 sm:px-5 py-6">
                    {!showButtons && !newSupplier && (
                        <div className="flex justify-center mb-6">
                            <img
                                src="https://superadmin.progressalliance.org/upload/web_logo/login_popup.png"
                                alt="Logo"
                                className="w-28 sm:w-32 md:w-40 lg:w-52 xl:w-60 border border-white rounded-2xl cursor-pointer"
                                onClick={() => navigate("/")}
                            />
                        </div>
                    )}

                    {/* ✅ If showButtons true → only show 2 buttons */}
                    {showButtons ? (
                        <div className="flex flex-col items-center gap-8 p-0 w-full max-w-sm mx-auto">
                            {/* Image Section */}
                            <div className="relative w-32 h-32 sm:w-40 sm:h-40 border border-white p-5 rounded-2xl bg-white overflow-hidden">
                                <img
                                    src="https://superadmin.progressalliance.org/upload/web_logo/switch-roles.png"
                                    alt="Switch Role"
                                    className="w-full h-full object-cover "
                                />
                                {/* Overlay tint color if needed */}
                                <div className="absolute inset-0 bg-white mix-blend-multiply"></div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col gap-4 w-full">
                                <button
                                    className="w-full cursor-pointer bg-gradient-to-r from-[#251C4B] to-[#3b2c6e] text-white py-3 rounded-lg font-semibold shadow-md hover:scale-105 transition duration-300"
                                    onClick={Suuplier}
                                >
                                    Continue as Supplier
                                </button>
                                <button
                                    className="w-full cursor-pointer bg-gradient-to-r from-[#3b2c6e] to-[#251C4B] text-white py-3 rounded-lg font-semibold shadow-md hover:scale-105 transition duration-300"
                                    onClick={onCounting}
                                >
                                    Continue as Buyer
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {
                                newSupplier ? (
                                    <div className="text-center">
                                        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                                            Welcome
                                        </h3>
                                        <p className="mt-1 font-normal text-black text-[18px]">
                                            Add details to create your account
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                                            Welcome Back
                                        </h3>
                                        <p className="mt-1 font-normal text-black text-[18px]">
                                            Please login to your account
                                        </p>
                                    </div>
                                )
                            }

                            <div className="mt-6 space-y-4">
                                {/* Mobile */}
                                <div>
                                    <input
                                        type="text"
                                        name="mobile"
                                        placeholder="Phone Number"
                                        className="w-full rounded-md bg-white px-3 py-3 outline-none focus:ring-2 ring-[#251C4B]/30 placeholder-black"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        maxLength={10}
                                        disabled={newSupplier}
                                    />
                                    {error.mobile && (
                                        <p className="text-red-500 text-sm leading-tight m-1">
                                            {error.mobile}
                                        </p>
                                    )}
                                </div>

                                {/* OTP */}
                                {otpSent && !newSupplier && (
                                    <div className="flex justify-center gap-12">
                                        <OtpInput
                                            value={formData.otp}
                                            onChange={(otp) =>
                                                setFormData((prev) => ({ ...prev, otp }))
                                            }
                                            numInputs={6}
                                            renderSeparator={<span className="text-[#f3f4f6]">-</span>}
                                            shouldAutoFocus
                                            renderInput={(props) => (
                                                <input
                                                    {...props}
                                                    type="text"
                                                    inputMode="numeric"
                                                    pattern="[0-9]"
                                                    maxLength="6"

                                                    style={{ width: "35px", height: "40px" }}
                                                    className="border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#251C4B] transition"
                                                />
                                            )}
                                        />
                                        {error.otp && (
                                            <p className="text-red-500 text-sm">{error.otp}</p>
                                        )}
                                    </div>
                                )}

                                {
                                    newSupplier && (
                                        <>
                                            {/* Full Name */}
                                            <div>
                                                <input
                                                    type="text"
                                                    name="full_name"
                                                    placeholder="Full Name"
                                                    className="w-full border rounded-md px-3 py-3 focus:ring-2 focus:ring-[#251C4B] outline-none"
                                                    value={formData.full_name}
                                                    onChange={handleChange}
                                                />
                                                {error.full_name && (
                                                    <p className="text-red-500 text-sm">{error.full_name}</p>
                                                )}
                                            </div>

                                            {/* Business Name */}
                                            {/* <div>
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
                                    </div> */}

                                            {/* Address */}
                                            {/* <div>
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
                                            </div> */}

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
                                        </>
                                    )
                                }

                                {/* Button */}
                                <div className="mt-5 w-full">
                                    {!otpSent ? (
                                        <button
                                            className="w-full bg-[#251C4B] cursor-pointer text-white py-3 rounded-md font-medium hover:bg-[#251C4B]/90 transition"
                                            onClick={sendOtp}
                                        >
                                            Send OTP
                                        </button>
                                    ) : (
                                        <button
                                            className="w-full cursor-pointer bg-[#251C4B] text-white py-3 rounded-md font-medium hover:bg-[#251C4B]/90 transition"
                                            onClick={onLoginClick}
                                        >
                                            {newSupplier ? "Register" : "Login"}

                                        </button>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;




