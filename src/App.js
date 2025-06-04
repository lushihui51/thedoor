import './App.css';
import { useState } from 'react';
import AddNewContactForm from './AddNewContactForm';
import AddNewMeetingForm from './AddNewMeetingForm';
import SearchProfile from './SearchProfile';

export default function App() {
  return (
    <>
      <AddNewContactForm />
      <AddNewMeetingForm />
      <SearchProfile />
    </>

  )
}