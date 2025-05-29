import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>

      {/* Cards Row */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Users</h5>
              <p className="card-text">1,245</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Sales</h5>
              <p className="card-text">$25,000</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Orders</h5>
              <p className="card-text">123</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title">Tickets</h5>
              <p className="card-text">7 open</p>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder for charts or tables */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Analytics</h5>
          <p className="card-text">Chart or analytics data goes here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
