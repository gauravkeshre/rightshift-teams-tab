import './style/App.css';
import './style/Navbar.css';
import {inTeams}  from './Utility/TeamsUtils';

import { useState } from 'react';
import Main from './components/Main';


function App() {
  const [isInTeams, setIsInTeams] = useState(false);

  async function checkTeams() {
    let isInsideTeams = await inTeams();
    setIsInTeams(isInsideTeams);
  }

  checkTeams();

  return (
    <Main inTeams={isInTeams}></Main>
  );
}

export default App;
