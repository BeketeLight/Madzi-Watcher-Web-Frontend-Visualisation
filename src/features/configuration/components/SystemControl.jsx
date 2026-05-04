import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Power, PowerOff, RefreshCw ,Icon} from 'lucide-react';
import { faucet } from '@lucide/lab';

export default function SystemControl({ onTurnOn, onCloseValve, onOpenValve, onTurnOff, onDeepSleep }) {
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
          onClick={onOpenValve}
          size="lg"
          className="bg-[#10b981] hover:bg-[#059669] active:scale-95 transition-all text-white shadow-md hover:shadow-lg rounded-full px-3 py-2"
        >
          <Icon  className="mr-2 h-4 w-4" iconNode={faucet} />
          Open Valve
        </Button>
        <Button
          onClick={onCloseValve}
          size="lg"
          className="bg-[#ef4444] hover:bg-[#dc2626]  active:scale-95 transition-all text-white shadow-md hover:shadow-lg rounded-full px-3 py-2"
        >
          <Icon  className="mr-2 h-4 w-4" iconNode={faucet} />
          Close Valve
        </Button>


        <Button
          onClick={onTurnOn}
          size="lg"
          className="bg-[#10b981] hover:bg-[#059669] active:scale-95 transition-all text-white shadow-md hover:shadow-lg rounded-full px-3 py-2"
        >
          <Power className="mr-2 h-4 w-4" />
          Turn ON
        </Button>

        {/* OFF */}
        <Button
          onClick={onTurnOff}
          size="lg"
          className="bg-[#ef4444] hover:bg-[#dc2626] active:scale-95 transition-all text-white shadow-md hover:shadow-lg rounded-full px-3 py-2"
        >
          <PowerOff className="mr-2 h-4 w-4" />
          Turn OFF
        </Button>

        {/* SLEEP */}
        <Button
          onClick={onDeepSleep}
          size="lg"
          className="bg-transparent border border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b]/10 active:scale-95 transition-all rounded-full px-3 py-2"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Restart
        </Button>
      </CardContent>
    </Card>
  );
}