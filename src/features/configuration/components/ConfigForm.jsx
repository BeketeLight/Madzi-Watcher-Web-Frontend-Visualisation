import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ConfigForm() {
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
        {/* Form content will be added next */}
      </CardContent>
    </Card>
  );
}