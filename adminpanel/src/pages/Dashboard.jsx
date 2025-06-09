import React from 'react';
import '../Global.css'; // Import global styles

const Dashboard = () => {
  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>

      {/* Cards Row */}

      <div className="dashboard-cards">
        <div className=" row">
          <div className=" col-md-6 col-lg-6 ">
            <div className="dashboard-card glass-card">
              <h4>New Posts</h4>

              <p>See the latest travel stories and adventures.</p>
              <button className="dashboard-btn">View Posts</button>
            </div>
          </div>
          <div className=" col-md-6 col-lg-6 ">
            <div className="dashboard-card glass-card">
              <h4>Analytics</h4>
              <p>Track your blog's performance and audience growth.</p>
              <button className="dashboard-btn">View Analytics</button>
            </div>
          </div>
          <div className=" col-md-6 col-lg-6 ">
            <div className="dashboard-card glass-card">
              <h4>Comments</h4>
              <p>Manage and reply to recent comments on your posts.</p>
              <button className="dashboard-btn">Manage Comments</button>
            </div>
          </div>
          <div className=" col-md-6 col-lg-6 ">
            <div className="dashboard-card glass-card">
              <h4>Create Post</h4>
              <p>Share your latest travel experience with your audience.</p>
              <button className="dashboard-btn">Create New</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
