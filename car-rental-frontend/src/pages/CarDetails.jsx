import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const cars = [
  { id: 1, name: "Tata Nexon EV", year: 2023, price: 3000, description: "Electric SUV", image: "https://english.cdn.zeenews.com/sites/default/files/2023/09/07/1277268-tata-nexon.ev.jpg" },
  { id: 2, name: "Mahindra Thar", year: 2023, price: 4500, description: "4x4 Offroader", image: "https://tse1.mm.bing.net/th?id=OIP.2jZuvOLpQoJsFL-XC4By0QHaEK&pid=Api&P=0&h=180" },
  { id: 3, name: "Hyundai Creta", year: 2022, price: 2800, description: "Popular family SUV ", image: "https://tse2.mm.bing.net/th?id=OIP.0saf42GMfatFSk0MYWenxQHaEK&pid=Api&P=0&h=180" },
  { id: 4, name: "Maruti Suzuki Swift", year: 2021, price: 1500, description: "fun-to-drive hatchback for city rides", image: "https://tse2.mm.bing.net/th?id=OIP.CmjMBxKM8vAxZ62scALlVAHaEo&pid=Api&P=0&h=180" },
  { id: 5, name: "Kia Seltos", year: 2023, price: 3200, description: "stylish SUV with excellent ride quality", image: "https://wallpaperaccess.com/full/5483457.jpg" },
];

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find((c) => c.id === parseInt(id));

  if (!car) return <div>Car not found</div>;

  const handleBookNow = () => {
    navigate(`/booking/${car.id}`);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <img src={car.image} alt={car.name} className="w-full h-64 object-cover rounded mb-4" />
      <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
      <p className="mb-2">Year: {car.year}</p>
      <p className="mb-4">{car.description}</p>
      <p className="text-xl font-semibold mb-6">₹{car.price}/day</p>
      <button
        onClick={handleBookNow}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Book Now
      </button>
    </div>
  );
}
