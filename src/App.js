// src/App.js
import React from 'react';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import CourseInstanceForm from './components/CourseInstanceForm';
import CourseInstanceList from './components/CourseInstanceList';

const App = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Course Management System</h1>
      <CourseForm />
      <CourseList />
      <CourseInstanceForm />
      <CourseInstanceList />
    </div>
  );
};

export default App;
