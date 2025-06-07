import { IoLocationOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LuTruck } from "react-icons/lu";
import { SiAuth0 } from "react-icons/si";
import { MdOutlineDateRange, MdPayment } from "react-icons/md";

export const STAGE_KEYS = {
  POSTCODE: "postcode",
  WASTE: "waste",
  SKIP: "skip",
  PERMIT: "permit",
  DATE: "date",
  PAYMENT: "payment",
};

export const stages = [
  { key: STAGE_KEYS.POSTCODE, icon: IoLocationOutline, label: "Postcode" },
  { key: STAGE_KEYS.WASTE, icon: RiDeleteBin5Line, label: "Waste Type" },
  { key: STAGE_KEYS.SKIP, icon: LuTruck, label: "Select Skip" },
  { key: STAGE_KEYS.PERMIT, icon: SiAuth0, label: "Permit Check" },
  { key: STAGE_KEYS.DATE, icon: MdOutlineDateRange, label: "Choose Date" },
  { key: STAGE_KEYS.PAYMENT, icon: MdPayment, label: "Payment" },
];
