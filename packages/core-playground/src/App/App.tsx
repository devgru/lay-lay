import './App.css';

import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Center } from './pages/Center.tsx';
import { SquareSVG } from './pages/SquareSVG.tsx';
import { Rects } from './pages/Rects.tsx';
import { Index } from './pages/Index.tsx';
import { FitMe } from './pages/FitMe.tsx';
import { LineByLine } from './pages/LineByLine.tsx';
import { Html } from './pages/Html.tsx';

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
    path: '/center',
    element: <Center />,
  },
  {
    path: '/fit-me',
    element: <FitMe />,
  },
  {
    path: '/lines',
    element: <LineByLine />,
  },
  {
    path: '/html',
    element: <Html />,
  },
  {
    path: '/',
    element: <Index />,
  },
]);

const App = () => (
  <div>
    <p>
      <code>@lay-lay/core</code> example gallery
    </p>
    <nav>
      <a href="#">What it's all about</a> • <a href="#rects">Pushing rects</a> •{' '}
      <a href="#fit-me">Fitting container</a> •{' '}
      <a href="#square-svg">Square container</a> •{' '}
      <a href="#lines">Line by line</a>
    </nav>
    <RouterProvider router={router} />
  </div>
);

export default App;
