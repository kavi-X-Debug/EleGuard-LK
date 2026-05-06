import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ZONES, LIVE_ELEPHANTS } from '../data/mockData';
import { Activity, Clock, Navigation } from 'lucide-react';

// Custom Map Marker Icons
const createCustomIcon = (color) => {
  return new L.DivIcon({
    className: 'custom-leaflet-marker',
    html: `<div style="
      background-color: ${color};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const activeIcon = createCustomIcon('#E53935'); // Alert Red
const missingIcon = createCustomIcon('#9E9E9E'); // Gray for missing

export default function LiveMap() {
  const sriLankaCenter = [7.8731, 80.7718];
  const [elephants, setElephants] = useState(LIVE_ELEPHANTS);

  // Simulate slight movement
  useEffect(() => {
    const interval = setInterval(() => {
      setElephants(prev => prev.map(elephant => {
        if (elephant.status === 'Missing Data') return elephant;
        // Jitter lat/lng slightly to simulate movement
        const jitter = (Math.random() - 0.5) * 0.002;
        return {
          ...elephant,
          lat: elephant.lat + jitter,
          lng: elephant.lng + jitter,
        };
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getZoneColor = (status) => {
    switch (status) {
      case 'Critical': return '#E53935';
      case 'High': return '#FB8C00';
      case 'Medium': return '#FDD835';
      case 'Safe': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Live Elephant Tracking</h1>
          <p className="text-theme-secondary text-sm">Real-time GPS and Geophone predicted locations.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full bg-theme-alert"></span> Critical Zone
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full bg-green-500"></span> Safe Zone
          </div>
        </div>
      </div>

      <div className="flex-1 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 relative z-0">
        <MapContainer 
          center={sriLankaCenter} 
          zoom={7} 
          className="w-full h-full"
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Render Danger Zones */}
          {ZONES.map((zone) => (
            <Circle
              key={zone.id}
              center={[zone.lat, zone.lng]}
              radius={8000} // 8km radius
              pathOptions={{ 
                color: getZoneColor(zone.status), 
                fillColor: getZoneColor(zone.status), 
                fillOpacity: 0.2,
                weight: 2
              }}
            >
              <Popup>
                <div className="font-sans">
                  <h3 className="font-bold text-lg mb-1">{zone.name}</h3>
                  <p className="text-sm">Status: <strong style={{color: getZoneColor(zone.status)}}>{zone.status}</strong></p>
                  <p className="text-sm">Risk: {zone.riskPercentage}%</p>
                </div>
              </Popup>
            </Circle>
          ))}

          {/* Render Elephant Markers */}
          {elephants.map((elephant) => (
            <Marker 
              key={elephant.id} 
              position={[elephant.lat, elephant.lng]}
              icon={elephant.status === 'Missing Data' ? missingIcon : activeIcon}
            >
              <Popup className="elephant-popup">
                <div className="p-1 min-w-[200px]">
                  <div className="flex items-center gap-2 border-b pb-2 mb-2">
                    <div className={`p-1.5 rounded-lg ${elephant.status === 'Missing Data' ? 'bg-gray-100 text-gray-500' : 'bg-red-100 text-red-600'}`}>
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 leading-tight">{elephant.name}</h4>
                      <p className="text-xs text-gray-500">{elephant.id}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="flex justify-between items-center">
                      <span className="text-gray-500 flex items-center gap-1"><Navigation className="w-3.5 h-3.5"/> Speed</span>
                      <span className="font-medium">{elephant.speed}</span>
                    </p>
                    <p className="flex justify-between items-center">
                      <span className="text-gray-500 flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> Last Seen</span>
                      <span className="font-medium">{elephant.lastDetected}</span>
                    </p>
                    <p className="flex justify-between items-center pt-2 mt-2 border-t">
                      <span className="text-gray-500">Status</span>
                      <span className={`font-bold ${elephant.status === 'Missing Data' ? 'text-gray-500' : 'text-red-600'}`}>
                        {elephant.status}
                      </span>
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}