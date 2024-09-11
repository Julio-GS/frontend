"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Home() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchCountries() {
      const response = await axios.get("http://localhost:4000/api/countries");

      setCountries(response.data);
    }
    fetchCountries();
  }, []);
  console.log(countries[0]);
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white text-center py-4">
        <h1 className="text-2xl font-bold">Country Info App</h1>
      </header>

      <main className="container mx-auto py-8">
        <h2 className="text-xl mb-4 text-black">Available Countries</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {countries.map((country) => (
            <li
              key={country.countryCode}
              className="bg-white p-4 rounded shadow"
            >
              <Link
                href={`/country/${country.countryCode}`}
                className=" hover:text-blue-800 font-bold text-black"
              >
                {country.name}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
