// src/components/CourseInstanceForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card } from 'react-bootstrap';

const CourseInstanceForm = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8181/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newInstance = { year, semester, course: { id: courseId } };

    try {
      await axios.post('http://localhost:8181/instances', newInstance);
      setYear('');
      setSemester('');
      setCourseId('');
    } catch (error) {
      console.error('Error creating course instance:', error);
    }
  };

  return (
    <Container className="my-4">
      <Card className="p-4 shadow-sm">
        <h2 className="mb-4">Create Course Instance</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              className="border-dark"
              style={{ width: '100%', height: '40px' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Semester</Form.Label>
            <Form.Control
              type="number"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
              className="border-dark"
              style={{ width: '100%', height: '40px' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Course</Form.Label>
            <Form.Select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
              className="border-dark"
              style={{ width: '100%', height: '40px' }}
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Create Instance
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default CourseInstanceForm;
