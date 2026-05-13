import { useEffect, useState, lazy, Suspense } from "react";
import { MapPin } from "lucide-react";

// Client-only Leaflet map (Leaflet touches `window` and breaks SSR).
const MapInner = lazy(() => import("./LocationPickerMap"));

export interface PickedLocation {
  lat: number;
  lng: number;
  address: string;
}

interface Props {
  value: PickedLocation | null;
  onChange: (loc: PickedLocation) => void;
}

/**
 * Reverse-geocode lat/lng to a readable address using OpenStreetMap Nominatim.
 */
async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14&addressdetails=1`,
      { headers: { Accept: "application/json" } }
    );
    const data = await res.json();
    return data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  } catch {
    return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  }
}

export default function LocationPicker({ value, onChange }: Props) {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handlePick = async (lat: number, lng: number) => {
    setLoading(true);
    const address = await reverseGeocode(lat, lng);
    setLoading(false);
    onChange({ lat, lng, address });
  };

  return (
    <div className="space-y-2">
      <div className="relative h-64 w-full overflow-hidden rounded-xl border border-border shadow-sm">
        {mounted ? (
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center bg-muted text-xs text-muted-foreground">
                Loading map…
              </div>
            }
          >
            <MapInner value={value} onPick={handlePick} />
          </Suspense>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-xs text-muted-foreground">
            Loading map…
          </div>
        )}
        {loading && (
          <div className="pointer-events-none absolute inset-0 z-[500] flex items-center justify-center bg-background/40 backdrop-blur-sm">
            <span className="rounded-full bg-card px-3 py-1 text-xs font-medium text-foreground shadow">
              Locating…
            </span>
          </div>
        )}
      </div>
      <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-muted-foreground">
          {value
            ? value.address
            : "Click on the map to select your exact farm location."}
        </p>
      </div>
    </div>
  );
}