import ComplaintForm from "../components/Complaint Form/ComplaintForm";
import Footer from '../components/Footer';

const LogComplaintPage = () => (
  <div className="flex flex-col min-h-screen bg-gray-50">
    {/* Main content grows and fills available vertical space */}
    <main className="flex-grow py-10 overflow-auto">
      <ComplaintForm />
    </main>
    <Footer />
  </div>
);

export default LogComplaintPage;