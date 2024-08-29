// src/components/CourseForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card } from 'react-bootstrap';

const CourseForm = () => {
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCourse = { id: courseId, title, description };

    try {
      await axios.post('http://localhost:8181/courses', newCourse);
      setTitle('');
      setCourseId('');
      setDescription('');
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <Container className="my-4">
      <Card className="p-4 shadow-sm">
        <h2 className="mb-4">Create Course</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Course ID</Form.Label>
            <Form.Control
              type="number"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
              className="border-dark"
              style={{ width: '100%', height: '40px' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border-dark"
              style={{ width: '100%', height: '40px' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="border-dark"
              style={{ width: '100%', height: '120px' }}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Create Course
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default CourseForm;
