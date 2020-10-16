import React from 'react';
import './App.css';
import { Provider as DashboardProvider } from './context/dashboard';
import Dashboard from './containers/dashboard';

function App() {
  return (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  );
}

export default App;
