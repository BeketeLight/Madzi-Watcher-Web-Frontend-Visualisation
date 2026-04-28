import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function ConfigForm({
  config,
  onConfigChange
}) {
  return (
    <Card className="bg-[#0d2137] border-[#16354f] shadow-lg">
      <CardHeader>
        <CardTitle className="text-white">
          Device Configuration
        </CardTitle>

        <CardDescription className="text-[#7aadc8]">
          Set ESP32 identity and system parameters
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* DEVICE ID */}
        <div className="space-y-2">
          <Label className="text-white">Device ID</Label>
          <Input
            value={config.deviceId}
            onChange={(e) =>
              onConfigChange('deviceId', e.target.value)
            }
            placeholder="e.g. ESP32-WQ-01"
            className="bg-[#0a2540] border-[#16354f] text-white 
                       focus:border-[#3b82f6] focus:ring-[#3b82f6]"
          />
        </div>

        {/* DISTRICT */}
        <div className="space-y-2">
          <Label className="text-white">District</Label>
          <Input
            value={config.district}
            onChange={(e) =>
              onConfigChange('district', e.target.value)
            }
            placeholder="e.g. Lilongwe"
            className="bg-[#0a2540] border-[#16354f] text-white 
                       focus:border-[#3b82f6] focus:ring-[#3b82f6]"
          />
        </div>

        {/* TREATMENT PLANT ID */}
        <div className="space-y-2">
          <Label className="text-white">Treatment Plant ID</Label>
          <Input
            value={config.treatmentPlantId}
            onChange={(e) =>
              onConfigChange('treatmentPlantId', e.target.value)
            }
            placeholder="e.g. TP-001"
            className="bg-[#0a2540] border-[#16354f] text-white 
                       focus:border-[#3b82f6] focus:ring-[#3b82f6]"
          />
        </div>

        {/* BUZZER ALERTS */}
        <div
          className="flex items-center justify-between p-4 rounded-lg 
                     bg-[#0a2540] border border-[#16354f] 
                     hover:border-[#3b82f6] transition"
        >
          <div>
            <Label className="text-white">Buzzer Alerts</Label>
            <p className="text-xs text-[#4a7a9b]">
              Enable sound alerts for unsafe water
            </p>
          </div>

          <Switch
            checked={config.buzzerEnabled}
            onCheckedChange={(checked) =>
              onConfigChange('buzzerEnabled', checked)
            }
            className="data-[state=checked]:bg-[#3b82f6]"
          />
        </div>

      </CardContent>
    </Card>
  );
}