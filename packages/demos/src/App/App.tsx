import './App.css';

import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Center } from './pages/Center.tsx';
import { SquareContainer } from './pages/SquareContainer.tsx';
import { Rects } from './pages/Rects.tsx';
import { Index } from './pages/Index.tsx';
import { Axes } from './pages/Axes.tsx';

const router = createHashRouter([
  {
    path: '/rects',
    element: <Rects />,
  },
  {
    path: '/square-container',
    element: <SquareContainer />,
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
      <a href="#square-container">Square container</a> •{' '}
      <a href="#axes">Axes</a> •{' '}
      <a href="#center">Center Line</a>
    </nav>
    <RouterProvider router={router} />
  </div>
);

export default App;
