import './App.css';

import { CenteredTextDemo } from './pages/CenteredTextDemo.tsx';
import { AdaptiveRectDemo } from './pages/AdaptiveRectDemo.tsx';
import { ConfigurableStackLayoutDemo } from './pages/ConfigurableStackLayoutDemo.tsx';
import { Header } from './pages/Header.tsx';
import { AutoStackLayoutDemo } from './pages/AutoStackLayoutDemo.tsx';
import { LineByLineDemo } from './pages/LineByLineDemo.tsx';
import { ElementAlongPathDemo } from './pages/ElementAlongPathDemo.tsx';
import { ManualLayoutDemo } from './pages/ManualLayoutDemo.tsx';
import { LayersPositioningDemo } from './pages/LayersPositioningDemo.tsx';

const App = () => (
  <div>
    <Header />
    <LayersPositioningDemo />
    <LineByLineDemo />
    <ManualLayoutDemo />
    <ConfigurableStackLayoutDemo />
    <AutoStackLayoutDemo />
    <AdaptiveRectDemo />
    <CenteredTextDemo />
    <ElementAlongPathDemo />
  </div>
);

export default App;
