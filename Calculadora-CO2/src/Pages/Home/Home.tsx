import { MainCard } from '../../Components/MainCard/MainCard'
import { MoreEmissionCard } from '../../Components/MoreEmissionCard/MoreEmissionCard'
import { InfoCard } from '../../Components/InfoCard/InfoCard';
import { HelpCard } from '../../Components/HelpCard/HelpCard';

export function Home() {


  return (
    <>     
      <div className='flex-fill d-flex justify-content-center gap-4'>
        <MainCard totalEmissions={124} />
        <MoreEmissionCard transportMode={'Carro a gasolina'} emissions={53} />
      </div>
        <InfoCard />
        <HelpCard/>
    </>
  )
}

export default Home
