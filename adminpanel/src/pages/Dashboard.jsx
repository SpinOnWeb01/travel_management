import React from 'react';
import '../Global.css'; // Import global styles
import toast from 'react-hot-toast';
import { Button, Spinner } from '@radix-ui/themes';

const Dashboard = () => {
  const handleLoading = () => {
    const toastId = toast.loading('Saving...');
    setTimeout(() => {
      toast.success('Saved!', { id: toastId });
    }, 2000);
  };
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
              <button className="dashboard-btn" onClick={handleLoading}>View Posts</button>
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
              {/* <button className="dashboard-btn">Manage Comments</button> */}
              <Button className="dashboard-btn" variant="solid" size="2" color="blue" >
	<Spinner >
		{/* <BookmarkIcon /> */}
	</Spinner>
	Manage Comments
</Button>
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
