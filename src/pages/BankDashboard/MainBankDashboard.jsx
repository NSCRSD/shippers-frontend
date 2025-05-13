import React from 'react';
import { DashboardHeader } from '../../components';


const MainBankDashboard = () => {
    return (
        <main className="flex-1 p-6 space-y-6 md:h-screen md:overflow-y-auto">
          {/* Header */}
          <DashboardHeader />   
        </main>
      )
}

export default MainBankDashboard
