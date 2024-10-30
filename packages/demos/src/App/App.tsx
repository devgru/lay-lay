import './App.css';

import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Center } from '../routes/Center.tsx';
import { SquareContainer } from '../routes/SquareContainer.tsx';
import { Rects } from '../routes/Rects.tsx';
import { Root } from '../routes/Root.tsx';

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
    path: '/center',
    element: <Center />,
  },
  {
    path: '/',
    element: <Root />,
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
      <a href="#center">Center Line</a>
    </nav>
    <RouterProvider router={router} />
  </div>
);

export default App;
