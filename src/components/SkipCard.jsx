const SkipCard = ({ skip, isSelected, onSelect }) => {
  const {
    size,
    hire_period_days,
    price_before_vat,
    vat,
    allowed_on_road,
    allows_heavy_waste,
  } = skip;

  const total = price_before_vat + (price_before_vat * vat) / 100;

  const imageUrl = `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${size}-yarder-skip.jpg`;

  return (
    <div
      onClick={() => onSelect(skip.id)}
      className={`cursor-pointer bg-white rounded-2xl shadow-md p-6 w-full sm:w-80 transform transition-transform duration-200 hover:scale-105 border-2 ${
        isSelected ? "border-orange-500 shadow-lg" : "border-transparent"
      }`}
    >
      <img
        src={imageUrl}
        alt={`${size} Yard Skip`}
        className="w-full h-40 object-cover rounded-xl mb-4"
      />
      <h2 className="text-lg sm:text-xl font-bold text-orange-600 mb-2">
        {size} Yard Skip
      </h2>
      <p className="text-sm sm:text-base text-gray-800 mb-1">
        Hire Duration: {hire_period_days} days
      </p>
      <p className="text-sm sm:text-base text-gray-800 mb-1">
        Total Price: £{total.toFixed(2)} (incl. VAT)
      </p>
      <p className="text-xs sm:text-sm text-gray-700">
        <span className="font-medium">Allowed on Road:</span>{" "}
        {allowed_on_road ? "✅" : "❌"}
      </p>
      <p className="text-xs sm:text-sm text-gray-700">
        <span className="font-medium">Heavy Waste:</span>{" "}
        {allows_heavy_waste ? "✅" : "❌"}
      </p>
    </div>
  );
};

export default SkipCard;
