import './App.css';

import { CenteredTextDemo } from './pages/CenteredTextDemo.tsx';
import { AdaptiveRectDemo } from './pages/AdaptiveRectDemo.tsx';
import { ConfigurableStackLayoutDemo } from './pages/ConfigurableStackLayoutDemo.tsx';
import { Header } from './pages/Header.tsx';
import { AutoStackDemo } from './pages/AutoStackDemo.tsx';
import { BasicStackDemo } from './pages/BasicStackDemo.tsx';
import { ElementAlongPathDemo } from './pages/ElementAlongPathDemo.tsx';
import { ManualLayoutDemo } from './pages/ManualLayoutDemo.tsx';
import { LayersPositioningDemo } from './pages/LayersPositioningDemo.tsx';

const App = () => (
  <div>
    <Header />
    <LayersPositioningDemo />
    <BasicStackDemo />
    <ManualLayoutDemo />
    <ConfigurableStackLayoutDemo />
    <AutoStackDemo />
    <AdaptiveRectDemo />
    <CenteredTextDemo />
    <ElementAlongPathDemo />
  </div>
);

export default App;
