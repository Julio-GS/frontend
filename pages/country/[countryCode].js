import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CountryInfo() {
  const router = useRouter();
  const { countryCode } = router.query;
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    if (!countryCode) return;

    async function fetchCountryInfo() {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/countries/${countryCode}`
        );
        setCountryData(response.data);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    }
    fetchCountryInfo();
  }, [countryCode]);

  if (!countryData) {
    return <div>Loading...</div>;
  }
  //   console.log(countryData);
  //   const populationData = {
  //     labels: countryData.population.map((entry) => entry.year),
  //     datasets: [
  //       {
  //         label: "Population",
  //         data: countryData.population.map((entry) => entry.value),
  //         fill: false,
  //         borderColor: "rgba(75,192,192,1)",
  //         tension: 0.1,
  //       },
  //     ],
  //   };
  console.log(countryData.borders);
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white text-center py-4">
        <h1 className="text-2xl font-bold">{countryData.name}</h1>
      </header>

      <main className="container mx-auto py-8">
        <div className="bg-white p-6 rounded shadow">
          <img
            src={countryData.flag}
            alt={`Flag of ${countryData.name}`}
            className="w-32 h-20 mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">Bordering Countries</h2>
          <ul className="mb-6">
            {countryData.borders.length > 0 ? (
              countryData.borders.map((borderCountry) => (
                <li key={borderCountry.commonName}>
                  <a
                    href={`/country/${borderCountry.countryCode}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {borderCountry.commonName}
                  </a>
                </li>
              ))
            ) : (
              <li>No bordering countries</li>
            )}
          </ul>

          {/* <h2 className="text-xl font-semibold mb-2">Population Over Time</h2>
          <div className="bg-gray-200 p-4 rounded">
            <Line data={populationData} />
          </div> */}
        </div>
      </main>
    </div>
  );
}
