import React, { useState, useEffect } from 'react';
import './DashboardWidget.css';

const DashboardWidget = ({ title = "Dashboard Overview", config = {} }) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeProjects: 0,
    completedTasks: 0,
    revenue: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      setTimeout(() => {
        setStats({
          totalUsers: Math.floor(Math.random() * 1000) + 100,
          activeProjects: Math.floor(Math.random() * 50) + 10,
          completedTasks: Math.floor(Math.random() * 200) + 50,
          revenue: (Math.random() * 50000 + 10000).toFixed(2)
        });
        setLoading(false);
      }, 1500);
    };

    loadData();
    const interval = setInterval(loadData, config.refreshInterval || 30000);
    
    return () => clearInterval(interval);
  }, [config.refreshInterval]);

  if (loading) {
    return (
      <div className="dashboard-widget loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-widget">
      <h3>{title}</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.totalUsers}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.activeProjects}</div>
          <div className="stat-label">Active Projects</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.completedTasks}</div>
          <div className="stat-label">Completed Tasks</div>
        </div>
        <div className="stat-card revenue">
          <div className="stat-number">${stats.revenue}</div>
          <div className="stat-label">Monthly Revenue</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidget;