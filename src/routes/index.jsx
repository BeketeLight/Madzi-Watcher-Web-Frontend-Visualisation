import { BrowserRouter, Routes, Route } from "react-router-dom";
import WaterDashboardPage from "../features/waterQuality/pages/WaterDashboardPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WaterDashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}