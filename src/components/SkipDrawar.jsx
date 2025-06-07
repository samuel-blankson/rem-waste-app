import React, { useContext, useEffect } from "react";
import { SkipContext } from "../context/SkipContext";
import { STAGE_KEYS } from "../constants/stageKeys";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const SkipDrawer = ({ selectedSkip, onClose }) => {
  const { selectedStageId, setSelectedStageId } = useContext(SkipContext);

  const stages = Object.values(STAGE_KEYS);
  const currentIndex = stages.indexOf(selectedStageId);

  useEffect(() => {
    console.log({ selectedSkip });
  }, []);

  const goToPreviousStage = () => {
    if (currentIndex > 0) {
      setSelectedStageId(stages[currentIndex - 1]);
      onClose();
    }
  };

  const goToNextStage = () => {
    if (currentIndex < stages.length - 1) {
      setSelectedStageId(stages[currentIndex + 1]);
      onClose();
    }
  };

  if (!selectedSkip) return null;

  const {
    size,
    hire_period_days,
    price_before_vat,
    vat,
    allowed_on_road,
    allows_heavy_waste,
  } = selectedSkip;

  const totalPrice = (
    price_before_vat +
    (price_before_vat * vat) / 100
  ).toFixed(2);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 w-full bg-white shadow-2xl rounded-t-2xl px-6 py-6 z-50"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            {size} Yard Skip
          </h2>
          <div className="text-gray-700 text-sm sm:text-base space-y-1">
            <p>Hire Duration: {hire_period_days} days</p>
            <p>Total Price: £{totalPrice} (incl. VAT)</p>
            <p>Allowed on Road: {allowed_on_road ? "✅" : "❌"}</p>
            <p>Heavy Waste: {allows_heavy_waste ? "✅" : "❌"}</p>
            <p className="text-xs text-gray-500 mt-4 italic">
              Imagery and information shown throughout this website may not
              reflect the exact shape or size specification. Colours may vary,
              and options and/or accessories may be featured at additional cost.
            </p>
          </div>

          <div className="flex justify-between mt-6 gap-4">
            <button
              onClick={goToPreviousStage}
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-sm transition"
            >
              <FaArrowLeft /> Back
            </button>
            <button
              onClick={goToNextStage}
              className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              Continue <FaArrowRight />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SkipDrawer;
