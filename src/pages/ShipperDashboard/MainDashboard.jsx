import { DashboardHeader } from '../../components';
import { statCards} from "../../constants/dummy";


const MainDashboard = () => {
  return (
    <main className="flex-1 p-6 space-y-6 md:h-screen md:overflow-y-auto">
      {/* Header */}
      <DashboardHeader />
      {/* Stat Cards */}
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
       {statCards.map((card, index) => {
            const isPositive = card.change.startsWith('+');
            const changeColor = isPositive ? 'text-green-500' : 'text-red-500';

            return (
            <div key={index} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-xl font-bold">{card.value}</p>
                <p className={`text-sm ${changeColor}`}>{card.change}</p>
                </div>
                <div className="text-2xl text-blue-500">
                {card.icon}
                </div>
            </div>
            );
        })}
        </div>

      {/* <section className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h3>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>✅ You completed a task yesterday.</li>
          <li>📈 Your performance increased by 12% this week.</li>
          <li>📬 You received 3 new messages.</li>
        </ul>
      </section>   */}
 
    </main>
  )
}

export default MainDashboard

