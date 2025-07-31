import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Images
import categoryAttaRiceDal from "../assets/categoryAttaRiceDal.jpg";
import categoryFruitsVegetables from "../assets/categoryFruitsVegetables.jpg";
import categoryBakeryBiscuits from "../assets/categoryBakeryBiscuits.jpg";
import categoryChickenMeatFish from "../assets/categoryChickenMeatFish.jpg";
import categoryCleaningEssentials from "../assets/categoryCleaningEssentials.jpg";
import categoryColdDrinksJuices from "../assets/categoryColdDrinksJuices.jpg";
import categoryDairyBreadEggs from "../assets/categoryDairyBreadEggs.jpg";
import categoryInstantFood from "../assets/categoryInstantFood.jpg";
import categoryPetCare from "../assets/categoryPetCare.jpg";
import categorySnackMunchies from "../assets/categorySnackMunchies.jpg";
import categoryTeaCoffeeDrinks from "../assets/categoryTeaCoffeeDrinks.jpg";

const categories = [
    { id: 1, name: "Atta, Rice & Dal", image: categoryAttaRiceDal },
    { id: 2, name: "Fruits & Vegetables", image: categoryFruitsVegetables },
    { id: 3, name: "Bakery & Biscuits", image: categoryBakeryBiscuits },
    { id: 4, name: "Chicken, Meat & Fish", image: categoryChickenMeatFish },
    { id: 5, name: "Cleaning Essentials", image: categoryCleaningEssentials },
    { id: 6, name: "Cold Drinks & Juices", image: categoryColdDrinksJuices },
    { id: 7, name: "Dairy, Bread & Eggs", image: categoryDairyBreadEggs },
    { id: 8, name: "Instant Food", image: categoryInstantFood },
    { id: 9, name: "Pet Care", image: categoryPetCare },
    { id: 10, name: "Snack & Munchies", image: categorySnackMunchies },
    { id: 11, name: "Tea, Coffee & Drinks", image: categoryTeaCoffeeDrinks },
];

function FeaturedCategories() {
    return (
        <div className="w-full py-12 bg-gradient-to-br from-white via-gray-50 to-blue-50">
            <section className="max-w-7xl mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-left">
                    Featured Categories
                </h2>
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={24}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1280: { slidesPerView: 5 },
                    }}
                    className="pb-10 custom-swiper"
                >
                    {categories.map((category) => (
                        <SwiperSlide key={category.id}>
                            <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 overflow-hidden group">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="h-28 mx-auto object-contain p-4 transition duration-300 group-hover:scale-105"
                                />
                                <div className="p-4 text-center">
                                    <h3 className="text-md font-semibold text-gray-800 group-hover:text-gray-600">
                                        {category.name}
                                    </h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </div>
    );
};

export default FeaturedCategories;