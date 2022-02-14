import React, { Suspense } from 'react';
import './style.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from './Utils/Loader';
const ChatDashboard = React.lazy(() => import('./Components/ChatDashboard/'));

export default function App() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <ChatDashboard />
      </Suspense>
    </div>
  );
}
