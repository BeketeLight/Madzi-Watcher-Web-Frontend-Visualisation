import WaterMonitorsPage from "../components/Watermonitor";
import { useEffect, useState } from "react";
export default function DashboardWaterMonitors() {

    return (
        <div className="flex flex-col gap-6">
            <WaterMonitorsPage 
             watermonitors={[]}
             />
        </div>
    )
}