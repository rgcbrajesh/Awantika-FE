import React, { useState } from 'react'
import AppoinmentData from './AppoinmentData';
import ContactUSData from './ContactUSData';
import FeedbackData from './FeedbackData';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('contact');

  return (
    <div className={`container ${styles.dashboardContainer}`}>
      <h2 className={styles.dashboardTitle}>Superadmin Dashboard</h2>
      <div className="row justify-content-center">
        {/* Sidebar */}
        <div className="col-12 col-md-4 col-lg-3 mb-3 mb-md-0">
          <div className={styles.sidebarCard}>
            <div className="card-body p-0">
              <div className={styles.sidebarNav}>
                <button
                  className={`${styles.sidebarBtn} ${activeTab === 'contact' ? 'active ' + styles.active : ''}`}
                  onClick={() => setActiveTab('contact')}
                >
                  <i className="bi bi-envelope me-2"></i> Contact Us
                </button>
                <button
                  className={`${styles.sidebarBtn} ${activeTab === 'feedback' ? 'active ' + styles.active : ''}`}
                  onClick={() => setActiveTab('feedback')}
                >
                  <i className="bi bi-chat-dots me-2"></i> Feedback Message
                </button>
                <button
                  className={`${styles.sidebarBtn} ${activeTab === 'appointments' ? 'active ' + styles.active : ''}`}
                  onClick={() => setActiveTab('appointments')}
                >
                  <i className="bi bi-calendar-check me-2"></i> Appointments
                </button>
                 <button
                  className={`${styles.sidebarBtn} ${activeTab === 'Achievement' ? 'active ' + styles.active : ''}`}
                  onClick={() => setActiveTab('Achievement')}
                >
                  <i className="bi bi-calendar-check me-2"></i> Achievement
                </button>
                 <button
                  className={`${styles.sidebarBtn} ${activeTab === 'Memory' ? 'active ' + styles.active : ''}`}
                  onClick={() => setActiveTab('Memory')}
                >
                  <i className="bi bi-calendar-check me-2"></i> Memory
                </button>
                  <button
                  className={`${styles.sidebarBtn} ${activeTab === 'Dashboard' ? 'active ' + styles.active : ''}`}
                  onClick={() => setActiveTab('Dashboard')}
                >
                  <i className="bi bi-calendar-check me-2"></i> Dashboard Image's
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="col-12 col-md-8 col-lg-9">
          <div className="card shadow-sm border-0" style={{ borderRadius: "16px", minHeight: "350px" }}>
            <div className="card-body">
              {activeTab === 'contact' && (
                <div>
                  <h3 className="mb-3 fw-bold">Contact Us</h3>
                  <ContactUSData />
                </div>
              )}
              {activeTab === 'feedback' && (
                <div>
                  <h3 className="mb-3 fw-bold">Feedback Message</h3>
                  <FeedbackData />
                </div>
              )}
              {activeTab === 'appointments' && (
                <div>
                  <h3 className="mb-3 fw-bold">Appointments</h3>
                  <AppoinmentData />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}