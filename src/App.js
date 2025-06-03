import './App.css';
import { useState } from 'react';
import AddNewContactForm from './AddNewContactForm';
import MeetingDemo from './AddNewMeetingForm';
import SearchContact from './SearchContact';

export default function App() {
  return (
    <>
      <AddNewContactForm />
      <MeetingDemo />
      <SearchContact />
    </>

  )
}