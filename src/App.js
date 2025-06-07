import Skips from "./pages/Skips";
import "./index.css";
import Navbar from "./components/Navbar";
import { SkipContext } from "./context/SkipContext";
import { STAGE_KEYS } from "./constants/stageKeys";
import PermitCheck from "./pages/PermitCheck";
import Postcode from "./pages/Postcode";
import WasteType from "./pages/WasteType";
import ChooseDate from "./pages/ChooseDate";
import Payment from "./pages/Payment";
import { useContext } from "react";

function App() {
  const { selectedStageId } = useContext(SkipContext);

  const renderStageComponent = () => {
    switch (selectedStageId) {
      case STAGE_KEYS.POSTCODE:
        return <Postcode />;
      case STAGE_KEYS.WASTE:
        return <WasteType />;
      case STAGE_KEYS.SKIP:
        return <Skips />;
      case STAGE_KEYS.PERMIT:
        return <PermitCheck />;
      case STAGE_KEYS.DATE:
        return <ChooseDate />;
      case STAGE_KEYS.PAYMENT:
        return <Payment />;
      default:
        return <Skips />;
    }
  };

  return (
    <div className="App">
      <Navbar />
      {renderStageComponent()}
    </div>
  );
}

export default App;
