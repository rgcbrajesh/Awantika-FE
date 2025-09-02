import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SuperadminComponents.module.css';

export default function AchievementData() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    imageAlt: '',
    order: 0,
    isActive: true,
    metadata: {
      date: '',
      category: '',
      tags: []
    }
  });

  // Fetch achievements data
  const fetchAchievements = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/content/types/achievement?page=${page}&limit=10`);
      
      if (response.data.success) {
        setAchievements(response.data.data);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
      setError('Failed to load achievement data');
    } finally {
      setLoading(false);
    }
  };

  // Create or update achievement
  const saveAchievement = async () => {
    try {
      const achievementData = {
        ...formData,
        type: 'achievement'
      };

      let response;
      if (editingAchievement) {
        response = await axios.put(`${process.env.REACT_APP_API_URL}/api/content/${editingAchievement._id}`, achievementData);
      } else {
        response = await axios.post(`${process.env.REACT_APP_API_URL}/api/content`, achievementData);
      }
      
      if (response.data.success) {
        fetchAchievements(currentPage);
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving achievement:', error);
      setError('Failed to save achievement');
    }
  };

  // Delete achievement
  const deleteAchievement = async (achievementId) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/content/${achievementId}`);
        
        if (response.data.success) {
          fetchAchievements(currentPage);
        }
      } catch (error) {
        console.error('Error deleting achievement:', error);
        setError('Failed to delete achievement');
      }
    }
  };

  // Toggle achievement status
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      imageAlt: '',
      order: 0,
      isActive: true,
      metadata: {
        date: '',
        category: '',
        tags: []
      }
    });
    setEditingAchievement(null);
  };

  const handleEdit = (achievement) => {
    setEditingAchievement(achievement);
    setFormData({
      title: achievement.title,
      description: achievement.description || '',
      imageUrl: achievement.imageUrl || '',
      imageAlt: achievement.imageAlt || '',
      order: achievement.order,
      isActive: achievement.isActive,
      metadata: {
        date: achievement.metadata?.date || '',
        category: achievement.metadata?.category || '',
        tags: achievement.metadata?.tags || []
      }
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('metadata.')) {
      const metadataField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          [metadataField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      imageUrl: ''
    }));
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.componentContainer}>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Header with Add Button */}
      <div className={styles.componentHeader}>
        <h4 className={styles.componentTitle}>Achievements Management</h4>
        <button
          className={styles.addButton}
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <i className="bi bi-plus-circle"></i>Add Achievement
        </button>
      </div>

      {/* Achievements Table */}
      <div className={`table-responsive ${styles.tableContainer}`}>
        <table className="table table-bordered table-hover">
          <thead className={styles.tableHeader}>
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Date</th>
              <th scope="col">Order</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {achievements.length > 0 ? (
              achievements.map((achievement, index) => (
                <tr key={achievement._id} className={`text-center ${styles.tableRow}`}>
                  <th scope="row">{(currentPage - 1) * 10 + index + 1}</th>
                  <td>
                    {achievement.imageUrl ? (
                      <img
                        src={achievement.imageUrl}
                        alt={achievement.imageAlt || achievement.title}
                        className={styles.imagePreview}
                      />
                    ) : (
                      <div className={styles.imagePlaceholder}>
                        <i className="bi bi-image"></i>
                      </div>
                    )}
                  </td>
                  <td className="text-start">{achievement.title}</td>
                  <td className="text-truncate" style={{ maxWidth: '200px' }}>
                    {achievement.description}
                  </td>
                  <td>
                    <span className={`badge bg-info ${styles.statusBadge}`}>
                      {achievement.metadata?.category || 'General'}
                    </span>
                  </td>
                  <td>
                    {achievement.metadata?.date ? formatDate(achievement.metadata.date) : '-'}
                  </td>
                  <td>{achievement.order}</td>
                  <td>
                    <span className={`badge ${achievement.isActive ? 'bg-success' : 'bg-secondary'} ${styles.statusBadge}`}>
                      {achievement.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        className={`btn btn-sm btn-outline-primary ${styles.actionButton}`}
                        onClick={() => handleEdit(achievement)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      
                      <button
                        className={`btn btn-sm btn-outline-danger ${styles.actionButton}`}
                        onClick={() => deleteAchievement(achievement._id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No achievements found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Achievement Modal */}
      {showModal && (
        <div className="show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className={`modal-content ${styles.modalContent}`}>
              <div className={`modal-header ${styles.modalHeader}`}>
                <h5 className={`modal-title ${styles.modalTitle}`}>
                  {editingAchievement ? 'Edit Achievement' : 'Add New Achievement'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className={`modal-body ${styles.modalBody}`}>
                <form>
                  <div className={styles.formRow}>
                    <div className={`${styles.formCol} ${styles.half}`}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Title *</label>
                        <input
                          type="text"
                          className={`form-control ${styles.formControl}`}
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className={`${styles.formCol} ${styles.half}`}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Order</label>
                        <input
                          type="number"
                          className={`form-control ${styles.formControl}`}
                          name="order"
                          value={formData.order}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Description</label>
                    <textarea
                      className={`form-control ${styles.formControl}`}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                    ></textarea>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Image</label>
                    {formData.imageUrl ? (
                      <div className={styles.imagePreviewContainer}>
                        <img
                          src={formData.imageUrl}
                          alt="Preview"
                          className={styles.imagePreviewLarge}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <button
                          type="button"
                          className={styles.removeImageButton}
                          onClick={removeImage}
                          title="Remove Image"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className={styles.imageUploadContainer}>
                        <div className={styles.imageUploadIcon}>
                          <i className="bi bi-image"></i>
                        </div>
                        <p className={styles.imageUploadText}>No image selected</p>
                      </div>
                    )}
                    <div className={styles.formRow}>
                      <div className={`${styles.formCol} ${styles.half}`}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Image URL</label>
                          <input
                            type="url"
                            className={`form-control ${styles.formControl}`}
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      </div>
                      <div className={`${styles.formCol} ${styles.half}`}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Image Alt Text</label>
                          <input
                            type="text"
                            className={`form-control ${styles.formControl}`}
                            name="imageAlt"
                            value={formData.imageAlt}
                            onChange={handleInputChange}
                            placeholder="Describe the image"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={`${styles.formCol} ${styles.half}`}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Category</label>
                        <input
                          type="text"
                          className={`form-control ${styles.formControl}`}
                          name="metadata.category"
                          value={formData.metadata.category}
                          onChange={handleInputChange}
                          placeholder="e.g., Award, Recognition"
                        />
                      </div>
                    </div>
                    <div className={`${styles.formCol} ${styles.half}`}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Achievement Date</label>
                        <input
                          type="date"
                          className={`form-control ${styles.formControl}`}
                          name="metadata.date"
                          value={formData.metadata.date}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <div className={`form-check ${styles.formCheck}`}>
                      <input
                        className={`form-check-input ${styles.formCheckInput}`}
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                      />
                      <label className={`form-check-label ${styles.formCheckLabel}`}>
                        Active
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              <div className={`modal-footer ${styles.modalFooter}`}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveAchievement}
                >
                  {editingAchievement ? 'Update' : 'Create'} Achievement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}