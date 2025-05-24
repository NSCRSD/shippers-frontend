import { FaFileAlt, FaUser, FaTruck, FaChartBar, FaTachometerAlt, FaUniversity, FaGlobe, FaSlidersH } from "react-icons/fa";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const statCards = [
  { title: 'FREIGHTS REQUESTED', value: 55, change: '+3.01%', icon: <FaTruck /> },
  { title: 'FREIGHT SHEETS CONFIRMED', value: 38, change: '+5.20%', icon: <FaFileAlt /> },
  { title: 'FREIGHT PENDING APPROVAL', value: 12, change: '-2.82%', icon: <FaFileAlt /> },
  { title: 'AMOUNT SAVED', value: 97, change: '+8.12%', icon: <FaChartBar /> },
];


export const FreightOverviewChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Freight Requests",
        data: [500, 300, 250, 400, 600, 550, 500, 400, 350, 600, 700, 650],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg p-4 text-white">
      <h4 className="mb-2">Freight overview (+%) more in 2025</h4>
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
};

export const barData = {
  labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
      {
      label: 'Total Orders',
      data: [25, 18, 30, 22, 16, 28],
      backgroundColor: '#F97316',
      },
  ],
};

/* Shipper Dashboard paths */
export const shipperMainLinks = [
  { name: 'Dashboard', icon: FaTachometerAlt, path: '/shipper-dashboard/dashboard' },
  { name: 'Bank', icon: FaUniversity, path: '/shipper-dashboard/bank' },
  { name: 'Freight Rate Form', icon: FaFileAlt, path: '/shipper-dashboard/freight-rate-form' },
  { name: 'Freight Rate Request', icon: FaGlobe, path: '/shipper-dashboard/freight-rate-request' },
  { name: 'Freight Analysis', icon: FaChartBar, path: '/shipper-dashboard/freight-analysis' },
];
  
export const ShipperAccountLinks = [
  { name: 'My Profile', icon: FaUser, path: '/shipper-dashboard/profile' },
  { name: 'Settings', icon: FaSlidersH, path: '/shipper-dashboard/settings' },
];

/* Bank Dashboard paths */
export const bankMainLinks = [
  { name: 'Dashboard', icon: FaTachometerAlt, path: '/bank-dashboard/dashboard' },
  { name: 'Freight Rate Request', icon: FaUniversity, path: '/bank-dashboard/freight-rate-request' },
  { name: 'Charter Party Request', icon: FaFileAlt, path: '/bank-dashboard/charter-party-request' },
  { name: 'Demurrage Request', icon: FaGlobe, path: '/bank-dashboard/demurrage-request' },
  { name: 'Vessel Charterers', icon: FaChartBar, path: '/bank-dashboard/vessel-charterers' },
  { name: 'Submission Request', icon: FaChartBar, path: '/bank-dashboard/submission-request' },
  { name: 'Connections', icon: FaChartBar, path: '/bank-dashboard/connection-requests' },
];

export const bankAccountLinks = [
  { name: 'My Profile', icon: FaUser, path: '/bank-dashboard/profile' },
  { name: 'Settings', icon: FaSlidersH, path: '/bank-dashboard/settings' },
];

/* Regulator Dashboard paths */
export const regulatorMainLinks = [
  { name: 'Dashboard', icon: FaTachometerAlt, path: '/regulator-dashboard/dashboard' },
  { name: 'Freight Rate Request', icon: FaUniversity, path: '/regulator-dashboard/freight-rate-request' },
  { name: 'Charter Party Request', icon: FaFileAlt, path: '/regulator-dashboard/charter-party-request' },
  { name: 'Demurrage Request', icon: FaGlobe, path: '/regulator-dashboard/demurrage-request' },
];

export const regulatorAccountLinks = [
  { name: 'My Profile', icon: FaUser, path: '/regulator-dashboard/profile' },
  { name: 'Settings', icon: FaSlidersH, path: '/regulator-dashboard/settings' },
];

export const links = [
    { name: "Home", link: "home" },
    {
      name: "Stakeholders",
      link: "stakeholders",
      dropdown: [
        { name: "The Nigerian Port Authority", link: "stakeholders/npa" },
        { name: "Seaport Terminal Operators", link: "stakeholders/seaport" },
        { name: "Shipping Companies & Terminals", link: "stakeholders/shipping" },
        { name: "Off Docks Terminal Operators", link: "stakeholders/off-docks" },
        { name: "Cargo Consolidators", link: "stakeholders/consolidators" },
        { name: "Logistics Service Providers", link: "stakeholders/logistics" },
        { name: "Freight Forwarders/Clearing Agents", link: "stakeholders/forwarders" },
        { name: "Inland Container Depot Operators", link: "stakeholders/icd" },
        { name: "Stevedoring Companies", link: "stakeholders/stevedoring" },
        { name: "Inland Dry Port", link: "stakeholders/dry-port" },
        { name: "Nigerian Railway Corporation", link: "stakeholders/railway" },
        { name: "Airfreight", link: "stakeholders/airfreight" },
      ],
    },
    {
      name: "Tanker Freight",
      link: "tanker-freight",
    },
    {
      name: "Tools",
      link: "tools",
      dropdown: [
        {
          name: "TRMS",
          link: "tools/trms",
          dropdown: [
            {
              name: "CRD Portal",
              link: "tools/trms/crd",
            },
            {
              name: "Bill of Laden",
              link: "tools/trms/bill-of-laden",
            },
          ],
        },
        {
          name: "DTRMS",
          link: "tools/dtrms",
          dropdown: [
            { name: "Tariff Calculator", link: "tools/dtrms/calculator" },
            { name: "Industry Tariff Booklet", link: "tools/dtrms/booklet" },
          ],
        },
        {
          name: "National Single Window",
          link: "tools/nsw",
          dropdown: [
            { name: "Cargo Manifest", link: "tools/nsw/manifest" },
          ],
        },
        { name: "B'Odogwu", link: "tools/bodogwu" },
        { name: "Eto Call-Up System", link: "tools/eto" },
        { name: "PIMS", link: "tools/pims" },
        { name: "C4I", link: "tools/nimasa" },
        { name: "PSSP", link: "tools/pssp" },
      ],
    },
    {
      name: "Cargo Statistics",
      link: "cargo-statistics",
    },
    {
      name: "Publications",
      link: "publications",
    },
  ];
  