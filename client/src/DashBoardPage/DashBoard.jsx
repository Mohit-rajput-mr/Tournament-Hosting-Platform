import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Dashboard</h2>
     
      </aside>
      <main className="main-content">
        <header className="header">
          <h1>Welcome Back, User!</h1>
          <p>Here is a quick overview of your activity.</p>
        </header>
        <section className="stats">
          <div className="card">Total Users: 500</div>
          <div className="card">Total Sales: $3,200</div>
          <div className="card">Total Visits: 10,000</div>
        </section>
        <section className="activity">
          <h2>Recent Activities</h2>
          <div className="activity-item">User1 purchased item A</div>
          <div className="activity-item">User2 updated their profile</div>
          <div className="activity-item">User3 left a review</div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
