import './App.css';

import { CenteredTextDemo } from './pages/CenteredTextDemo.tsx';
import { AdaptiveRectDemo } from './pages/AdaptiveRectDemo.tsx';
import { ConfigurableStackLayoutDemo } from './pages/ConfigurableStackLayoutDemo.tsx';
import { Header } from './pages/Header.tsx';
import { AutoStackLayoutDemo } from './pages/AutoStackLayoutDemo.tsx';
import { LineByLineDemo } from './pages/LineByLineDemo.tsx';
import { ElementAlongPathDemo } from './pages/ElementAlongPathDemo.tsx';
import { SvgPositioningDemo } from './pages/SvgPositioningDemo.tsx';
import { ManualLayoutDemo } from './pages/ManualLayoutDemo.tsx';
import { HtmlPositioningDemo } from './pages/HtmlPositioningDemo.tsx';

const App = () => (
  <div>
    <Header />
    <HtmlPositioningDemo />
    <SvgPositioningDemo />
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
