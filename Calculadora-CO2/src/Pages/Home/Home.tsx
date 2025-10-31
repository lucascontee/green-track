/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'; // <-- 1. Importar hooks
import { MainCard } from '../../Components/MainCard/MainCard';
import { MoreEmissionCard } from '../../Components/MoreEmissionCard/MoreEmissionCard';
import { InfoCard } from '../../Components/InfoCard/InfoCard';
import { HelpCard } from '../../Components/HelpCard/HelpCard';

import { getTravelHistory } from '../../Service/TravelService';
import { getGoal } from '../../Service/GoalService';


export function Home() {

  const [totalEmissions, setTotalEmissions] = useState<number>(0);
  const [totalCleanTrips, setTotalCleanTrips] = useState<number>(0);
  const [lastTrip, setLastTrip] = useState<any>(0);
  const [topVehicleName, setTopVehicleName] = useState<string>("")
  const [topVehicleEmission, setTopVehicleEmission] = useState<number>(0);
  const [ monthlyGoal, setMonthlyGoal] = useState<number| null>(null);
  const [thisMonthEmissions, setThisMonthEmissions] = useState<number>(0);


  useEffect(() => {
    const fetchAndSumEmissions = async () => {
      try {

         const [history, goalResponse] = await Promise.all([
          getTravelHistory(),
          getGoal()
        ]);

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

        const now = new Date();
          const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

          const thisMonthHistory = history.filter(trip => {
            const tripDate = new Date(trip.date);
            return tripDate >= firstDayOfMonth && tripDate.getFullYear() === now.getFullYear();
          });

          const thisMonthSum = thisMonthHistory.reduce((accumulator, trip) => {
            return accumulator + trip.emission;
          }, 0);

        setTotalEmissions(sum);
        setTotalCleanTrips(zeroEmittedCount)
        setLastTrip(lastTripEmission)
        setTopVehicleName(calcTopName);
        setTopVehicleEmission(calcTopEmission);
        setThisMonthEmissions(thisMonthSum)

        if (goalResponse) {
          setMonthlyGoal(goalResponse.monthlyEmissionGoalKg);
        } else {
          setMonthlyGoal(null);
        }

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
        <InfoCard cleanTripsCount={totalCleanTrips} lastTrip={lastTrip} monthlyGoal={monthlyGoal} totalEmitted={thisMonthEmissions}/>
        <HelpCard/>
    </div>
  )
}

export default Home
