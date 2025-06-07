import React from "react";
import { motion } from "framer-motion";
import { IoLocationOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LuTruck } from "react-icons/lu";
import { SiAuth0 } from "react-icons/si";
import { MdOutlineDateRange, MdPayment } from "react-icons/md";

const stages = [
  { key: "postcode", icon: IoLocationOutline, label: "Postcode" },
  { key: "waste", icon: RiDeleteBin5Line, label: "Waste Type" },
  { key: "skip", icon: LuTruck, label: "Select Skip" },
  { key: "permit", icon: SiAuth0, label: "Permit Check" },
  { key: "date", icon: MdOutlineDateRange, label: "Choose Date" },
  { key: "payment", icon: MdPayment, label: "Payment" },
];

const Navbar = ({ currentStage }) => {
  const currentIndex = stages.findIndex((s) => s.key === currentStage);

  return (
    <div className="w-full px-4 py-6 bg-white shadow-md">
      {/* Progress bar */}
      <div className="relative mb-6">
        <div className="h-1 bg-gray-300 w-full rounded-full" />
        <motion.div
          className="h-1 bg-orange-500 absolute top-0 left-0 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(currentIndex / (stages.length - 1)) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Steps */}
      <div className="flex justify-between items-center overflow-x-auto gap-2 sm:gap-4">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <motion.div
              key={stage.key}
              className="flex flex-col items-center flex-shrink-0 text-center w-20 sm:w-28"
              initial={{ scale: 1 }}
              animate={{ scale: isCurrent ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                  isCompleted
                    ? "bg-orange-500 text-white border-orange-500"
                    : isCurrent
                    ? "bg-white text-orange-500 border-orange-500"
                    : "bg-white text-gray-400 border-gray-300"
                }`}
              >
                <Icon className="text-xl" />
              </div>
              <span
                className={`text-xs sm:text-sm mt-2 ${
                  isCompleted || isCurrent
                    ? "text-orange-600 font-medium"
                    : "text-gray-400"
                }`}
              >
                {stage.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
