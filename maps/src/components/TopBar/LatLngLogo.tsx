import Leaflet from 'leaflet'
import { Compass } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'

import { useMap } from '@/context/map-context'

const LatLngLogo = () => {
  const { map } = useMap()
  const [location, setLocation] = useState<Leaflet.LatLng | undefined>()
  const lat = location?.lat.toFixed(4)
  const lng = location?.lng.toFixed(4)

  // Define the move handler as a callback to maintain reference
  const handleMove = useCallback(() => {
    if (!map) return;
    const center = map.getCenter();
    setLocation(new Leaflet.LatLng(center.lat, center.lng));
  }, [map]);

  useEffect(() => {
    if (!map) return undefined

    // Initial center position
    const center = map.getCenter()
    setLocation(new Leaflet.LatLng(center.lat, center.lng))

    // Add event listener
    map.on('move', handleMove)

    // cleanup - properly remove the specific event listener
    return () => {
      map.off('move', handleMove)
    }
  }, [map, handleMove])

  return (
    <div className="flex gap-2 text-lg font-black leading-none text-white md:text-2xl md:leading-none">
      <div className="flex items-center">
        <Compass size={36} className="text-slate-50 md:hidden" />
        <Compass size={48} className="text-slate-50 hidden md:block" />
      </div>
      <div className="text-slate-50 flex items-center">
        {lat}
        <br />
        {lng}
      </div>
    </div>
  )
}

export default LatLngLogo
