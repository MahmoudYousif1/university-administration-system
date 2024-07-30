/* Imports */
import React, { useState } from 'react';
import NavbarHeader from './components/NavbarHeader.jsx';
import Degrees from './components/Degrees.jsx';
import Homepage from './components/Homepage.jsx';
import SingleDegree from './components/SingleDegree.jsx';
import CreateDegree from './components/CreateDegree.jsx';
import ViewCohorts from './components/ViewCohorts.jsx';
import SIngleCohort from './components/SIngleCohort.jsx';
import CreateCohort from './components/CreateCohort.jsx';
import ViewModules from './components/ViewModules.jsx';
import ModuleListForCohort from './components/ModuleListForCohort.jsx';
import CreateModules from './components/CreateModules.jsx';
import SingleModule from './components/SingleModule.jsx';
import ViewStudents from './components/ViewStudents.jsx';
import CreateStudent from './components/CreateStudent.jsx';
import SetGrades from './components/SetGrades.jsx';

/* Main function */
// App is the main component of the React application.
function App() {
  // useState is used to create state variables and setters for different pieces of states within the component.This is used to
  // manage the state of the current tab, degree code, selected cohort ID, module code, and current student ID.
  const [currentTab, setCurrentTab] = useState('Homepage');
  const [degreeCode, setDegreeCode] = useState(null);
  const [selectedCohortId, setSelectedCohortId] = useState(null);
  const [moduleCode, setModuleCode] = useState(null);
  const [currentStudentId, setCurrentStudentId] = useState(null);

  const handleSetCurrentTab = (tab) => {
    setCurrentTab(tab);
  };


  let Component;
  // this code is used for conditional rendering based on the currentTab state. The switch statement
  // is used to determine which component to render based on the currentTab state. This allows me to switch betweem different 
  // components based on the currentTab state where homepage is set as the default component to render making this a one page apllication.
  switch (currentTab) {
    case 'Degrees':
      Component = () => <Degrees setCurrentTab={handleSetCurrentTab} setDegreeCode={setDegreeCode} />;
      break;
    case 'Single Degree':
      Component = () => <SingleDegree degreeCode={degreeCode} setCurrentTab={handleSetCurrentTab} setDegreeCode={setDegreeCode} />;
      break;
    case 'CreateDegree':
      Component = () => <CreateDegree setCurrentTab={handleSetCurrentTab} />;
      break;
    case 'ViewCohorts':
      Component = () => <ViewCohorts setCurrentTab={handleSetCurrentTab} setSelectedCohortId={setSelectedCohortId} />;
      break;
    case 'SingleCohort':
      Component = () => <SIngleCohort cohortId={selectedCohortId} setCurrentTab={handleSetCurrentTab} setCurrentStudentId={setCurrentStudentId} />;
      break;
    case 'CreateCohort':
      Component = () => <CreateCohort setCurrentTab={handleSetCurrentTab} />;
      break;
    case 'ViewModules':
      Component = () => <ViewModules setCurrentTab={setCurrentTab} setModuleCode={setModuleCode} />;
      break;
    case 'SingleModule':
      Component = () => <SingleModule moduleCode={moduleCode} setCurrentTab={setCurrentTab} />;
      break;
    case 'ModuleListForCohort':
      Component = () => <ModuleListForCohort cohortId={selectedCohortId} setCurrentTab={handleSetCurrentTab} />;
      break;
    case 'CreateModules':
      Component = () => <CreateModules setCurrentTab={handleSetCurrentTab} />;
      break;
    case 'ViewStudents':
      Component = () => <ViewStudents studentId={currentStudentId} setCurrentTab={handleSetCurrentTab} />;
      break;
    case 'CreateStudent':
      Component = () => <CreateStudent setCurrentTab={handleSetCurrentTab} />;
      break;
    case 'SetGrades':
      Component = () => <SetGrades setCurrentTab={handleSetCurrentTab} />;
      break;
    default:
      Component = () => <Homepage setCurrentTab={handleSetCurrentTab} />;
  }

  return (
    <div>
      // NavbarHeader component is rendered at the top of the page so each component will have this navbar at the top. The currentTab state and handleSetCurrentTab function are passed as props to the NavbarHeader component.
      <NavbarHeader currentTab={currentTab} onChangeTab={handleSetCurrentTab} />
      <Component />
    </div>
  );
}

export default App;
