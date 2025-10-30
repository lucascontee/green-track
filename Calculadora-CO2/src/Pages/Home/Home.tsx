/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'; // <-- 1. Importar hooks
import { MainCard } from '../../Components/MainCard/MainCard';
import { MoreEmissionCard } from '../../Components/MoreEmissionCard/MoreEmissionCard';
import { InfoCard } from '../../Components/InfoCard/InfoCard';
import { HelpCard } from '../../Components/HelpCard/HelpCard';

// --- 2. Importar o serviço ---
import { getTravelHistory } from '../../Service/TravelService';
import type { ITripHistory } from '../../Types/travel.types';

export function Home() {

  const [totalEmissions, setTotalEmissions] = useState<number>(0);
  const [totalCleanTrips, setTotalCleanTrips] = useState<number>(0);
  const [lastTrip, setLastTrip] = useState<any>(0);
  const [topVehicleName, setTopVehicleName] = useState<string>("")
  const [topVehicleEmission, setTopVehicleEmission] = useState<number>(0);


  useEffect(() => {
    const fetchAndSumEmissions = async () => {
      try {

        const history: ITripHistory[] = await getTravelHistory();

        
        const sum = history.reduce((accumulator, trip) => {
          return accumulator + trip.emission;
        }, 0);
        const zeroEmittedCount = history.filter(trip => trip.emission === 0).length;
        const lastTripEmission = history.length > 0 ? history[0] : null;

        const emissionsByVehicle = history.reduce((acc, trip) => {
          const label = trip.transportLabel || "Desconhecido";
          acc[label] = (acc[label] || 0) + trip.emission;
          return acc;
        }, {} as Record<string, number>);

        const [calcTopName, calcTopEmission] = Object.entries(emissionsByVehicle)
          .sort(([, a], [, b]) => b - a)[0] || ["Nenhum", 0];

        setTotalEmissions(sum);
        setTotalCleanTrips(zeroEmittedCount)
        setLastTrip(lastTripEmission)
        setTopVehicleName(calcTopName);
        setTopVehicleEmission(calcTopEmission);

      } catch (err: any) {
        console.error("Erro ao buscar total de emissões:", err);
      } 
    };

    fetchAndSumEmissions();
  }, []);
  return (
    <div className='m-5'>     
      <div className='flex-fill d-flex justify-content-center gap-4'>
        <MainCard totalEmissions={totalEmissions} />
        <MoreEmissionCard transportMode={topVehicleName} emissions={topVehicleEmission} />
      </div>
        <InfoCard cleanTripsCount={totalCleanTrips} lastTrip={lastTrip} />
        <HelpCard/>
    </div>
  )
}

export default Home
