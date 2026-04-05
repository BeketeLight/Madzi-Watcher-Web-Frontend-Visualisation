import Hero from '@/components/hero'
import Pricing from '@/components/pricing'
import Contact from '@/components/contact'
import { WaterDashboardPage } from '@/features/waterQuality/pages/WaterDashboardPage'

function LandingPage() {
  return (
    <div className="w-full min-h-screen">
      <WaterDashboardPage />
      {/* <Pricing/> */}
      {/* <Contact/> */}
    </div>
  )
}

export default LandingPage
