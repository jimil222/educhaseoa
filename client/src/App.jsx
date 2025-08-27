import AddSchoolForm from "./components/AddSchoolForm";
import SchoolsList from "./components/SchoolsList";
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">School Locator</h1>
      <AddSchoolForm />
      <SchoolsList />
    </div>
  );
}

export default App;
