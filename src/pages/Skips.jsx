import { useEffect, useState } from "react";
import SkipCard from "../components/SkipCard";
import SkipDrawer from "../components/SkipDrawar";

const CACHE_KEY = "skip_data_cache";
const CACHE_DURATION = 1000 * 60 * 10; // 10 minutes

const Skips = () => {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchSize, setSearchSize] = useState("");
  const [selectedSkip, setSelectedSkip] = useState(null);

  const [priceFilter, setPriceFilter] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [filterRoad, setFilterRoad] = useState(null);
  const [filterHeavyWaste, setFilterHeavyWaste] = useState(null);

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

    fetchData();
  }, []);

  const fetchData = () => {
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
  };

  const handleSelect = (skip) => {
    setSelectedSkip((prevSkip) => (prevSkip?.id === skip.id ? null : skip));
  };

  const clearFilters = () => {
    setSearchSize("");
    setPriceFilter("");
    setPriceValue("");
    setFilterRoad(null);
    setFilterHeavyWaste(null);
  };

  const filteredSkips = skips.filter((skip) => {
    const total =
      skip.price_before_vat + (skip.price_before_vat * skip.vat) / 100;
    const matchSize = searchSize === "" || skip.size.toString() === searchSize;
    const matchPrice =
      priceFilter === "" ||
      priceValue === "" ||
      (priceFilter === ">" && total > parseFloat(priceValue)) ||
      (priceFilter === "<" && total < parseFloat(priceValue)) ||
      (priceFilter === "=" && total === parseFloat(priceValue));
    const matchRoad =
      filterRoad === null || skip.allowed_on_road === filterRoad;
    const matchHeavy =
      filterHeavyWaste === null || skip.allows_heavy_waste === filterHeavyWaste;

    return matchSize && matchPrice && matchRoad && matchHeavy;
  });

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
        Choose Your Skip Size
      </h1>
      <p className="text-center text-gray-600 text-base sm:text-lg mb-6">
        Select the skip size that best suits your needs
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 max-w-5xl mx-auto">
        <input
          type="number"
          placeholder="Filter by size (e.g. 6)"
          value={searchSize}
          onChange={(e) => setSearchSize(e.target.value)}
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <div className="flex gap-2">
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="px-2 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Price Filter</option>
            <option value=">">Above</option>
            <option value="<">Below</option>
            <option value="=">Equal</option>
          </select>

          <input
            type="number"
            placeholder="Price (£)"
            value={priceValue}
            onChange={(e) => setPriceValue(e.target.value)}
            className="w-full px-2 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <select
          value={filterRoad === null ? "" : filterRoad ? "yes" : "no"}
          onChange={(e) =>
            setFilterRoad(
              e.target.value === "" ? null : e.target.value === "yes"
            )
          }
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Allowed on Road?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <select
          value={
            filterHeavyWaste === null ? "" : filterHeavyWaste ? "yes" : "no"
          }
          onChange={(e) =>
            setFilterHeavyWaste(
              e.target.value === "" ? null : e.target.value === "yes"
            )
          }
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Heavy Waste?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      {(searchSize ||
        priceFilter ||
        priceValue ||
        filterRoad !== null ||
        filterHeavyWaste !== null) && (
        <div className="text-center mb-6">
          <button
            onClick={clearFilters}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-600">Loading skips...</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {filteredSkips.map((skip) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              isSelected={selectedSkip?.id === skip.id}
              onSelect={() => handleSelect(skip)}
            />
          ))}
        </div>
      )}

      {selectedSkip && (
        <SkipDrawer
          selectedSkip={selectedSkip}
          onClose={() => setSelectedSkip(null)}
        />
      )}
    </div>
  );
};

export default Skips;
