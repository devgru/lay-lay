import './App.css';

import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Center } from './pages/Center.tsx';
import { SquareSVG } from './pages/SquareSVG.tsx';
import { Rects } from './pages/Rects.tsx';
import { Index } from './pages/Index.tsx';
import { Axes } from './pages/Axes.tsx';
import { FitMe } from './pages/FitMe.tsx';

const router = createHashRouter([
  {
    path: '/rects',
    element: <Rects />,
  },
  {
    path: '/square-svg',
    element: <SquareSVG />,
  },
  {
    path: '/axes',
    element: <Axes />,
  },
  {
    path: '/center',
    element: <Center />,
  },
  {
    path: '/fit-me',
    element: <FitMe />,
  },
  {
    path: '/',
    element: <Index />,
  },
]);

const App = () => (
  <div>
    <p>
      <code>react-svg-guides</code> example gallery
    </p>
    <nav>
      <a href="#">What it's all about</a> • <a href="#rects">Pushing rects</a> •{' '}
      <a href="#fit-me">Fitting container</a> •{' '}
      <a href="#square-svg">Square container</a> •{' '}
      <a href="#center">Center Line</a>
    </nav>
    <RouterProvider router={router} />
  </div>
);

export default App;
