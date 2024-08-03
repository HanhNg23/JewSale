import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Avatar, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';

const UserProfile = ({username }) => {
  const [user, setUser] = useState({});

  useEffect((username ) => {
    fetchUser(username );
  }, [username ]);

  const fetchUser = async (username ) => {
    try {
      const response = await axios.get(`http://localhost:8080/accounts`); 
      const users = response.data;
      const currentUser = users.find(user => user.username === username);
 if (currentUser) {
        setUser(currentUser);
      } else {
        message.error('User not found');
      }
    } catch (error) {
      message.error('Failed to fetch user');
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <div style={styles.header}>
          <Avatar size={100} icon={<UserOutlined />} />
          <h2 style={styles.title}>User Profile</h2>
        </div>
        <Descriptions bordered style={styles.descriptions}>
          <Descriptions.Item label="Username" span={3}>{user.username}</Descriptions.Item>
          <Descriptions.Item label="Role" span={3}>{user.role}</Descriptions.Item>
          <Descriptions.Item label="Full Name" span={3}>{user.fullname}</Descriptions.Item>
          <Descriptions.Item label="Phone Number" span={3}>{user.phonenumber}</Descriptions.Item>
          <Descriptions.Item label="Email" span={3}>{user.email}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
  },
  card: {
    width: '100%',
    maxWidth: '600px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    marginTop: '10px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  descriptions: {
    width: '100%',
  },
};

export default UserProfile;
