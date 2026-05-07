import { ShieldCheck, Cpu, Map, Globe, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center bg-theme-primary/10 p-4 rounded-full mb-4">
          <ShieldCheck className="w-12 h-12 text-theme-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">About EleGuardLK</h1>
        <p className="text-lg text-theme-secondary max-w-2xl mx-auto">
          A smart, IoT and AI-driven early warning system designed to mitigate human-elephant conflicts in Sri Lanka by protecting farming communities and preserving wildlife.
        </p>
      </div>

      <div className="bg-theme-surface rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-theme-primary/5 rounded-bl-full pointer-events-none"></div>
        <h2 className="text-2xl font-bold mb-4">The Mission</h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          Human-elephant conflict (HEC) is a major socio-environmental issue in Sri Lanka. Farmers lose crops and livelihoods, while elephants face fatal retaliation. EleGuardLK bridges the gap between technology and conservation. By deploying an intelligent mesh of geophones (seismic sensors), we detect the unique vibrational patterns of elephant herds long before they reach human settlements.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-theme-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium">Zero-Harm approach to wildlife deterrence.</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-theme-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium">Protecting agricultural livelihoods and economies.</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-theme-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium">Data-driven insights for conservationists.</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-theme-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium">Automated multi-tier alert systems.</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Core Technologies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <Cpu className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="font-bold text-lg mb-2">IoT Edge Devices</h3>
            <p className="text-sm text-theme-secondary">Low-power geophone nodes buried underground, running local DSP algorithms to filter out background noise and identify elephant footfalls.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <Globe className="w-8 h-8 text-green-500 mb-4" />
            <h3 className="font-bold text-lg mb-2">Cloud Analytics</h3>
            <p className="text-sm text-theme-secondary">Real-time data streaming to a centralized cloud architecture where AI models predict movement vectors and assess threat severity.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <Map className="w-8 h-8 text-purple-500 mb-4" />
            <h3 className="font-bold text-lg mb-2">GIS Mapping</h3>
            <p className="text-sm text-theme-secondary">Interactive geographic information systems plotting active threats, historic corridors, and safe zones on top of detailed topological maps.</p>
          </div>
        </div>
      </div>

    </div>
  );
}