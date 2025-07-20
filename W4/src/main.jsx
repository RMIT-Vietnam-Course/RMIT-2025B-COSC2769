import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

//import Calculator from './calculator/Calculator'
import Calculator from './calculator-reducer/Calculator'
import GrandParentComponent from './E2'
import StateCounter from './E4-1'
import RefCounter from './E4-2'
import StateVsRefExample from './E4-3'
import CountDown from './E5-1'
import EffectExample from './E5-2'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='container d-grid gap-5'>
      <Calculator />
      <GrandParentComponent />
      <StateCounter />
      <RefCounter />
      <StateVsRefExample />
      <CountDown />
      <EffectExample />
    </div>
  </StrictMode>,
)