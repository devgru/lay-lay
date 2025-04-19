import './App.css';

import { TextCenterDemo } from './pages/TextCenterDemo.tsx';
import { AdaptiveRectDemo } from './pages/AdaptiveRectDemo.tsx';
import { ConfigurableStackLayoutDemo } from './pages/ConfigurableStackLayoutDemo.tsx';
import { Header } from './pages/Header.tsx';
import { MultipleStackLayoutDemo } from './pages/MultipleStackLayoutDemo.tsx';
import { LineByLineDemo } from './pages/LineByLineDemo.tsx';
import { ElementAlongPathDemo } from './pages/ElementAlongPathDemo.tsx';
import { PositioningDemo } from './pages/PositioningDemo.tsx';

const App = () => (
  <div>
    <Header />
    <PositioningDemo />
    <LineByLineDemo />
    <ConfigurableStackLayoutDemo />
    <MultipleStackLayoutDemo />
    <AdaptiveRectDemo />
    <TextCenterDemo />
    <ElementAlongPathDemo />
  </div>
);

export default App;
