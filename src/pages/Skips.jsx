import { useEffect, useState } from "react";
import SkipCard from "../components/SkipCard";

const CACHE_KEY = "skip_data_cache";
const CACHE_DURATION = 1000 * 60 * 10; // 10 minutes

const Skips = () => {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchSize, setSearchSize] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      const isFresh = Date.now() - parsed.timestamp < CACHE_DURATION;
      if (isFresh) {
        setSkips(parsed.data);
        setLoading(false);
        return;
      }
    }

    fetch(
      "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
    )
      .then((res) => res.json())
      .then((data) => {
        setSkips(data);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data, timestamp: Date.now() })
        );
        setLoading(false);
      });
  }, []);

  const filteredSkips = skips.filter(
    (skip) => searchSize === "" || skip.size.toString() === searchSize
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-900">
        Available Skips in NR32
      </h1>

      <div className="flex justify-center mb-8">
        <input
          type="number"
          placeholder="Filter by size (e.g. 6)"
          value={searchSize}
          onChange={(e) => setSearchSize(e.target.value)}
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading skips...</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {filteredSkips.map((skip) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              isSelected={selectedId === skip.id}
              onSelect={(id) => setSelectedId(id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Skips;
