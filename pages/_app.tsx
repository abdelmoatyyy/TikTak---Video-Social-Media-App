import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {useState , useEffect} from 'react'
import NavBar from '@/components/NavBar'
import Sidebar from '@/components/Sidebar'

const App = ({ Component, pageProps }: AppProps)=> {
  const [isSSR , setisSSR] = useState(true);
  useEffect( ()=>{
    setisSSR(false);
    
  },[])
  if (isSSR){
    return null ;
  }

  return (
    <div>
      <NavBar/>
      <div className='flex gap-6 md:gap-20'>
        <div className='h-[92vh] overflow-hidden xl:overflow-auto'>
          <Sidebar/>
        </div>
        <div className='mt-4 flex flex-column gap-10 overflow-auto h-[88vh] videos flex-1'>
      
      <Component {...pageProps} />

        </div>
      </div>
      

    </div>
  )
}
export default App ;