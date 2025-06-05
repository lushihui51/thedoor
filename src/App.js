import './App.css';
import { useState } from 'react';
import AddNewContactForm from './AddNewContactForm';
import AddNewMeetingForm from './AddNewMeetingForm';
import SearchProfile from './SearchProfile';

export default function App() {
  const [functionality, setFunctionality] = useState('');

  const handleSelectFunctionality = (functionality) => {
    setFunctionality(functionality);
  }

  return (
    <>
      <button type='button' onClick={() => handleSelectFunctionality('AddNewContactForm')}>AddNewContactForm</button>
      <button type='button' onClick={() => handleSelectFunctionality('AddNewMeetingForm')}>AddNewMeetingForm</button>
      <button type='button' onClick={() => handleSelectFunctionality('SearchProfile')}>SearchProfile</button>

      {functionality === 'AddNewContactForm' && <AddNewContactForm />}
      {functionality === 'AddNewMeetingForm' && <AddNewMeetingForm />}
      {functionality === 'SearchProfile' && <SearchProfile />}
    </>

  )
}