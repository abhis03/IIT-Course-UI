// src/components/CourseInstanceList.js
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Table, Container, Card } from 'react-bootstrap';

const CourseInstanceList = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [instances, setInstances] = useState([]);

  const fetchInstances = async () => {
    try {
      const response = await axios.get(`http://localhost:8181/instances/${year}/${semester}`);
      setInstances(response.data);
    } catch (error) {
      console.error('Error fetching instances:', error);
    }
  };

  const deleteInstance = async (courseId, year, semester) => {
    try {
      await axios.delete(`http://localhost:8181/instances/${year}/${semester}/${courseId}`);
      fetchInstances();
    } catch (error) {
      console.error('Error deleting instance:', error);
    }
  };

  return (
    <Container className="my-4">
      <Card className="p-4 shadow-sm">
        <h2 className="mb-4">Course Instances</h2>
        <Form className="mb-3">
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
          <Button variant="primary" onClick={fetchInstances} className="w-100">
            Fetch Instances
          </Button>
        </Form>
        {instances.length > 0 ? (
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Course Title</th>
                <th>Year</th>
                <th>Semester</th>
                <th>Course_Id</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {instances.map((instance) => (
                <tr key={instance.id}>
                  <td>{instance.course.title}</td>
                  <td>{instance.year}</td>
                  <td>{instance.semester}</td>
                  <td>{instance.course.id}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteInstance(instance.course.id, instance.year, instance.semester)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="mt-4">No instances found for the selected year and semester.</p>
        )}
      </Card>
    </Container>
  );
};

export default CourseInstanceList;
