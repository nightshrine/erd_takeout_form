import { useEffect, useState } from "react";
import { InitMasterService } from "./services/InitMasterService";
import TakeOutFrom from "./components/takeOutForm/TakeOutForm";

function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    const initialize = async () => {
      // マスタ初期化処理
      await InitMasterService.init();
      setIsInitialized(true);
    };

    initialize();
  }, []);

  return <>{isInitialized ? <TakeOutFrom /> : <p>Loading...</p>}</>;
}

export default App;
