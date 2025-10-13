import { Routes, Route } from "react-router";
import Login from "../auth/Login";
import Home from "../home/Home";
import Product from "../product/Index";
import ProductDetails from "../product/ProductDetails";
import ProtectedRoute from "./ProtectedRoute";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import Search from "../search/Search";
import Category from "../category/Category";
import { useState } from "react";
import Inquiry from "../home/Inquiry";
import PrivacyPolicy from "../home/PrivacyPolicy";
import TermsCondition from "../home/TermsCondition";
import MyProfile from "../home/MyProfile";
import EditProfile from "../home/EditProfile";
import ViewShop from "../product/ViewShop";
import Model from "../product/Model";
import Index from "../product/Index";
import WishList from "../product/WishList";


const AppRoutes = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-[#EAEBEF]">
          <Routes>
            {/* <Route path="/" element={<LayoutWithHeader />} /> */}
            <Route
              path="/"
              element={
                <Home />
              }
            />
            {/* <Route path="/product/:id" element={<Product />} /> */}
            {/* <Route path="/product/:categories_id/:sub_category_id" element={<Index />} /> */}
            <Route path="/product/:categories_id/:sub_category_id" element={<Index />} />

            <Route path="/single-product/:id" element={<ProductDetails />} />
            <Route path="/search/:id" element={<Search />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-condition" element={<TermsCondition />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/view-shop/:id" element={<ViewShop />} />
            <Route path="/model/:categories_id" element={<Model />} />
            <Route path="/wishlist" element={<WishList />} />
            {/* Public routes */}
            {/* <Route path="/" element={<Login />} /> */}

            {/* Fallback */}
            {/* <Route path="*" element={<NotFound />} /> */}
            <Route path="/category/:categoryId" element={<Category />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AppRoutes;
