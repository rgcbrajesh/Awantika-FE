import React, { useState } from 'react'
import AppoinmentData from './AppoinmentData';
import ContactUSData from './ContactUSData';
import FeedbackData from './FeedbackData';
import AchievementData from './AchievementData';
import MemoryData from './MemoryData';
import DashboardImageData from './DashboardImageData';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('contact');

  return (
    <div className={`container-fluid ${styles.dashboardContainer}`}>
      <h2 className={styles.dashboardTitle}>Superadmin Dashboard</h2>
      <div className="row justify-content-center">
        {/* Sidebar */}
        <div className="col-12 col-md-4 col-lg-3 mb-4 mb-md-0">
          <div className={styles.sidebarCard}>
            <div className="card-body p-0">
              <div className={styles.sidebarNav}>
                <button
                  className={`${styles.sidebarBtn} ${activeTab === 'contact' ? styles.active : ''}`}
                  onClick={() => setActiveTab('contact')}
                >
                  <i className="bi bi-envelope"></i> Contact Us
                </button>
                <button
                  className={`${styles.sidebarBtn} ${activeTab === 'feedback' ? styles.active : ''}`}
                  onClick={() => setActiveTab('feedback')}
                >
                  <i className="bi bi-chat-dots"></i> Feedback Messages
                </button>
                <button
                  className={`${styles.sidebarBtn} ${activeTab === 'appointments' ? styles.active : ''}`}
                  onClick={() => setActiveTab('appointments')}
                >
                  <i className="bi bi-calendar-check"></i> Appointments
                </button>
                <button
                  className={`${styles.sidebarBtn} ${activeTab === 'achievements' ? styles.active : ''}`}
                  onClick={() => setActiveTab('achievements')}
                >
                  <i className="bi bi-trophy"></i> Achievements
                </button>
                <button
                  className={`${styles.sidebarBtn} ${activeTab === 'memories' ? styles.active : ''}`}
                  onClick={() => setActiveTab('memories')}
                >
                  <i className="bi bi-heart"></i> Memories
                </button>
                <button
                  className={`${styles.sidebarBtn} ${activeTab === 'dashboard-images' ? styles.active : ''}`}
                  onClick={() => setActiveTab('dashboard-images')}
                >
                  <i className="bi bi-images"></i> Dashboard Images
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="col-12 col-md-8 col-lg-9">
          <div className={styles.mainContentCard}>
            <div className="card-body p-4">
              {activeTab === 'contact' && (
                <div>
                  <h3 className={styles.mainContentTitle}>Contact Us Management</h3>
                  <ContactUSData />
                </div>
              )}
              {activeTab === 'feedback' && (
                <div>
                  <h3 className={styles.mainContentTitle}>Feedback Messages Management</h3>
                  <FeedbackData />
                </div>
              )}
              {activeTab === 'appointments' && (
                <div>
                  <h3 className={styles.mainContentTitle}>Appointments Management</h3>
                  <AppoinmentData />
                </div>
              )}
              {activeTab === 'achievements' && (
                <div>
                  <h3 className={styles.mainContentTitle}>Achievements Management</h3>
                  <AchievementData />
                </div>
              )}
              {activeTab === 'memories' && (
                <div>
                  <h3 className={styles.mainContentTitle}>Memories Management</h3>
                  <MemoryData />
                </div>
              )}
              {activeTab === 'dashboard-images' && (
                <div>
                  <h3 className={styles.mainContentTitle}>Dashboard Images Management</h3>
                  <DashboardImageData />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}