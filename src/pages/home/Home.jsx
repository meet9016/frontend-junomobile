import React, { Suspense, useEffect, useRef, useState } from "react";
import "remixicon/fonts/remixicon.css";
import { useNavigate } from "react-router";
import Header from "../../component/Header";
import api from "../utils.jsx/axiosInstance";
import endPointApi from "../utils.jsx/endPointApi";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Login from "../auth/Login";
import Aos from "aos";
// import PageMeta from "../utils.jsx/PageMeta";
import Skeleton from "react-loading-skeleton";
import CommanButton from "../../comman/CommanButton";
import {
  Accordion,
  AccordionItem,
} from "@szhsin/react-accordion";



const Home = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false)
  const [skeletonCount, setSkeletonCount] = useState(2);

  
  const stories = [
    {
      name: "Shafi Anwar",
      city: "Patna",
      message: "I sold my old phone on Cashify recently. I loved how the whole process was super quick and easy. I got a fair price, and the payment came through fast!",
      img: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Shafi Anwar",
      city: "Patna",
      message: "I sold my old phone on Cashify recently. I loved how the whole process was super quick and easy. I got a fair price, and the payment came through fast!",
      img: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Priyank Rawat",
      city: "Noida",
      message: "I trust Cashify to sell any phone online. They are super professional, fast, give good price and don’t cause delays in payment.",
      img: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Ram Balram",
      city: "Udaipur",
      message: "Great experience! The staff was professional, and the process was smooth. Got a fair price for my old phone.",
      img: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Satish Ram",
      city: "Jaipur",
      message: "I liked the Cashify service. I was able to sell my used phone from Redmi finally. There was no issue with the payment as well. Thanks!",
      img: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    },
  ];
  const faqs = [
    {
      question: "What is your return policy?",
      answer: "You can return any product within 7 days of delivery for a full refund.",
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship worldwide. Delivery time depends on your country.",
    },
    {
      question: "How can I track my order?",
      answer: "Once shipped, you’ll get a tracking link on your email and SMS.",
    },
    {
      question: "Can I cancel my order?",
      answer: "Yes, cancellation is possible before the order is dispatched.",
    },
    {
      question: "Do you provide warranty on products?",
      answer: "Yes, most products come with a 6–12 months warranty depending on the brand.",
    },
  ];




  const getProduct = async () => {
    try {
      setLoading(true);
      const res = await api.post(endPointApi.postHome, {});
      if (res.data && res.data.data) {
        setProduct(res.data.data|| []);
      }
    } catch (err) {
      console.log("Error Fetch data", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Header />
      {/* <PageMeta title="Home" description="This is the Dashboard page" /> */}
      <div className="w-full pt-[60px] bg-[#EAEBEF] sm:pt-[80px] md:pt-[100px]">
        {/* Main Container with fixed width */}
        <div className="w-full max-w-[1300px] mx-auto px-4 flex flex-col items-center">

          {/* Login pop-up open */}
          {showLogin && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]">
              <div
                data-aos="fade-up"
                data-aos-duration="600"
                className="relative bg-white rounded-lg w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] max-h-[90vh] overflow-y-auto p-4"
              >
                <span
                  onClick={() => setShowLogin(false)}
                  className="absolute cursor-pointer top-5 right-10 translate-x-[-4px] translate-y-[4px] text-black text-xl"
                >
                  <i className="ri-close-large-line"></i>
                </span>

                <Login onClose={() => setShowLogin(false)} />
              </div>
            </div>
          )}
          {/* Top Banner */}
          <div className="w-full mt-4 sm:mt-4 md:mt-4">
            {
              loading ? (
                <Skeleton
                  className="w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl"
                  baseColor="#D1D5DB"
                  highlightColor="#E5E7EB"
                />
              ) : (
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                  loop={true}
                  className="rounded-2xl"
                >
                  {product?.slider?.map((slide) => (
                    <SwiperSlide key={slide.slider_id}>
                      <a href="#" rel="noopener noreferrer">
                        <img
                          src={slide.image}
                          alt="Slider"
                          className="
    w-full
    h-auto
    sm:h-[300px] md:h-[400px] lg:h-[500px]
    object-contain sm:object-cover
    rounded-sm sm:rounded-2xl
    mx-auto
  "
                        />
                      </a>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )
            }
          </div>

          {/* Three Category Cards */}
          <div className="w-full mt-4 sm:mt-9">
            {
              loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
                  {Array.from({ length: skeletonCount }).map((_, idx) => (
                    <Skeleton
                      key={idx}
                      className="w-full h-30 sm:h-60 rounded-full"
                      baseColor="#D1D5DB"
                      highlightColor="#E5E7EB"
                    />
                  ))}
                </div>
              ) : (

                <>
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={3}
                    loop={true}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    breakpoints={{
                      200: { slidesPerView: 2 },
                      640: { slidesPerView: 2 },
                      768: { slidesPerView: 3 },
                      1024: { slidesPerView: 3 },
                    }}
                    modules={[Autoplay]}
                  >
                    {product?.banner?.map((banners) => (
                      <SwiperSlide key={banners.banner_id}>
                        <a href="#" rel="noopener noreferrer">
                          <img
                            src={banners.image}
                            alt="banner"
                            className="w-full rounded-md sm:rounded-2xl object-cover"
                          />
                        </a>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </>
              )
            }
          </div>

          {/* All Categories with Subcategories */}
          <div className="w-full mt-4 sm:mt-6 md:mt-9">
            {
              loading ? (
                Array.from({ length: 2 }).map((_, catIdx) => (
                  <div key={catIdx} className="mb-4 sm:mb-1 flex flex-col w-full">
                    <Skeleton className="w-1/3 h-6 sm:h-8 mb-4" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 bg-white rounded-2xl p-4">
                      {Array.from({ length: 8 }).map((_, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <Skeleton className="w-[120px] h-[120px] rounded-xl" />
                          <Skeleton className="w-16 h-4 mt-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (

                <div className="mb-4 sm:mb-9 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-black flex items-center gap-2">
                      {/* {cat.categories_name} */}
                      Top Selling Brands
                    </h2>
                  </div>

                  {/* Subcategories Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-7 bg-white rounded-2xl p-5">
                    {product.all_categories?.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-6 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-[120px] sm:w-[150px] lg:w-[180px] h-auto object-contain mb-0"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )
            }

            <div className="bg-[#d9f4f1] p-6 sm:p-12  rounded-xl">
              <h2 className="text-xl sm:text-3xl font-bold mb-6">Why Us</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Item 1 */}
                <div className="flex items-start gap-3">
                  <img src="https://s3ng.cashify.in/estore/99953fd419e2416ba7dc25e0164372c3.png?w=70" alt="Best Prices" className="w-16 h-16 object-contain" />
                  <div>
                    <h3 className="font-bold text-xl">Best Prices</h3>
                    <p className="text-gray-500 text-sm">Objective AI-based pricing</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-3">
                  <img src="https://s3ng.cashify.in/estore/acef68f939a84a8884640ae56f70867f.png?w=70" alt="Instant Payment" className="w-16 h-16 object-contain" />
                  <div>
                    <h3 className="font-bold text-xl">Instant Payment</h3>
                    <p className="text-gray-500 text-sm">Instant Money Transfer in your preferred mode at time of pick up or store drop off</p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-start gap-3">
                  <img src="https://s3ng.cashify.in/estore/7989ad6b9431414481a1e9dcda098d45.png?w=70" alt="Simple & Convenient" className="w-16 h-16 object-contain" />
                  <div>
                    <h3 className="font-bold text-xl">Simple & Convenient</h3>
                    <p className="text-gray-500 text-sm">Check price, schedule pickup & get paid</p>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="flex items-start gap-3">
                  <img src="https://s3ng.cashify.in/estore/3c0a0e2e0f4945c09e941a10bcf66e83.png?w=70" alt="Free Doorstep Pickup" className="w-16 h-16 object-contain" />
                  <div>
                    <h3 className="font-bold text-xl">Free Doorstep Pickup</h3>
                    <p className="text-gray-500 text-sm">No fees for pickup across 1500 cities across India</p>
                  </div>
                </div>

                {/* Item 5 */}
                <div className="flex items-start gap-3">
                  <img src="https://s3ng.cashify.in/estore/09bf461127cd48acb409f207e1664438.png?w=70" alt="Factory Grade Data Wipe" className="w-16 h-16 object-contain" />
                  <div>
                    <h3 className="font-bold text-xl">Factory Grade Data Wipe</h3>
                    <p className="text-gray-500 text-sm">100% Safe and Data Security Guaranteed</p>
                  </div>
                </div>

                {/* Item 6 */}
                <div className="flex items-start gap-3">
                  <img src="https://s3ng.cashify.in/estore/4413e4f7e0e448f88a73bd4e6047e93d.png?w=70" alt="Valid Purchase Invoice" className="w-16 h-16 object-contain" />
                  <div>
                    <h3 className="font-bold text-xl">Valid Purchase Invoice</h3>
                    <p className="text-gray-500 text-sm">Genuine Bill of Sale</p>
                  </div>
                </div>
              </div>
            </div>



            <div className=" w-full mt-4 sm:mt-9">
              <h2 className="text-black text-3xl font-bold text-center mb-5">
                Customer Stories
              </h2>
              <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: { slidesPerView: 2 }, // tablet
                  1024: { slidesPerView: 4 }, // desktop
                }}
                className="pb-5"
              >
                {stories.map((story, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-white p-6 rounded-xl shadow-md w-[300px] mx-auto flex flex-col justify-between">
                      <div>
                        <div className="text-7xl text-teal-200 mb-4">
                          <i className="ri-double-quotes-r"></i>
                        </div>
                        <p className="text-gray-800 mb-6">{story.message}</p>
                      </div>
                      <div className="flex items-center mt-10 gap-3">
                        <img
                          src={story.img}
                          alt={story.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-bold text-gray-800">{story.name}</p>
                          <p className="text-gray-500 text-sm">{story.city}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>



            <div className="w-full mt-4 sm:mt-9">
              <h2 className="text-black text-3xl font-bold text-left mb-4">FAQs</h2>

              <Accordion transition transitionTimeout={250}>
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    header={({ state }) => (
                      <div className="flex justify-between items-center py-3 text-gray-800 font-medium">
                        {faq.question}
                        {state.isEnter ? (
                          <i class="ri-arrow-up-wide-line text-2xl cursor-pointer text-teal-500"></i>
                        ) : (
                          <i class="ri-arrow-down-wide-line text-2xl cursor-pointer text-gray-500"></i>
                        )}
                      </div>
                    )}
                    className="border-b last:border-none"
                    buttonProps={{
                      className: "w-full text-left focus:outline-none",
                    }}
                  >
                    <div className="py-3 text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>



            <div className="w-full mt-4 sm:mt-9">
              <h2 className="text-black text-3xl font-bold text-left mb-4">
                Why Choose Cashify?
              </h2>

              <div className="p-0 mb-12 mt-8 flex flex-col sm:flex-row justify-center gap-10">
                <div className="w-full sm:w-72 md:w-130 h-[250px] rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.youtube.com/embed/p6u7svjBc80?si=t6qFjZ39y4cGyiPF"
                    title="Video 1"
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>

                <div className="w-full sm:w-72 md:w-130 h-[250px] rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.youtube.com/embed/p6u7svjBc80?si=t6qFjZ39y4cGyiPF"
                    title="Video 2"
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>

                <div className="w-full sm:w-72 md:w-130 h-[250px] rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.youtube.com/embed/p6u7svjBc80?si=t6qFjZ39y4cGyiPF"
                    title="Video 3"
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>


          </div>
        </div>

      </div >
    </>
  );
};

export default Home;





































