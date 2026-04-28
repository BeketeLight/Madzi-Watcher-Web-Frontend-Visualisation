import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Power, PowerOff, Zap } from 'lucide-react';

export default function SystemControl({ onTurnOn, onTurnOff, onDeepSleep }) {
  return (
    <Card className="mb-8 bg-[#0d2137] border-[#16354f] shadow-lg">
      <CardHeader>
        <CardTitle className="text-white">System Control</CardTitle>
        <CardDescription className="text-[#7aadc8]">
          Send immediate commands to ESP32
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-4">
        {/* ON */}
        <Button
          onClick={onTurnOn}
          size="lg"
          className="bg-[#10b981] hover:bg-[#059669] active:scale-95 transition-all text-white shadow-md hover:shadow-lg"
        >
          <Power className="mr-2 h-4 w-4" />
          Turn ON
        </Button>

        {/* OFF */}
        <Button
          onClick={onTurnOff}
          size="lg"
          className="bg-[#ef4444] hover:bg-[#dc2626] active:scale-95 transition-all text-white shadow-md"
        >
          <PowerOff className="mr-2 h-4 w-4" />
          Turn OFF
        </Button>

        {/* SLEEP */}
        <Button
          onClick={onDeepSleep}
          size="lg"
          className="bg-transparent border border-[#f59e0b] text-[#f59e0b]
                     hover:bg-[#f59e0b]/10 active:scale-95 transition-all"
        >
          <Zap className="mr-2 h-4 w-4" />
          Deep Sleep
        </Button>
      </CardContent>
    </Card>
  );
}