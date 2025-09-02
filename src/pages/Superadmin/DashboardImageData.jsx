import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SuperadminComponents.module.css';

export default function DashboardImageData() {
  const [dashboardImages, setDashboardImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    imageAlt: '',
    order: 0,
    isActive: true,
    metadata: {
      section: '',
      category: '',
      tags: []
    }
  });

  // Fetch dashboard images data
  const fetchDashboardImages = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/content/types/dashboard_image?page=${page}&limit=10`);
      
      if (response.data.success) {
        setDashboardImages(response.data.data);
        // setTotalPages(Math.ceil(response.data.total / 10));
        setCurrentPage(page);
      }
    } catch (error) {
      console.error('Error fetching dashboard images:', error);
      setError('Failed to load dashboard image data');
    } finally {
      setLoading(false);
    }
  };

  // Create or update dashboard image
  const saveDashboardImage = async () => {
    try {
      const imageData = {
        ...formData,
        type: 'dashboard_image'
      };

      let response;
      if (editingImage) {
        response = await axios.put(`${process.env.REACT_APP_API_URL}/api/content/${editingImage._id}`, imageData);
      } else {
        response = await axios.post(`${process.env.REACT_APP_API_URL}/api/content`, imageData);
      }
      
      if (response.data.success) {
        fetchDashboardImages(currentPage);
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving dashboard image:', error);
      setError('Failed to save dashboard image');
    }
  };

  // Delete dashboard image
  const deleteDashboardImage = async (imageId) => {
    if (window.confirm('Are you sure you want to delete this dashboard image?')) {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/content/${imageId}`);
        
        if (response.data.success) {
          fetchDashboardImages(currentPage);
        }
      } catch (error) {
        console.error('Error deleting dashboard image:', error);
        setError('Failed to delete dashboard image');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      imageAlt: '',
      order: 0,
      isActive: true,
      metadata: {
        section: '',
        category: '',
        tags: []
      }
    });
    setEditingImage(null);
  };

  const handleEdit = (image) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      description: image.description || '',
      imageUrl: image.imageUrl || '',
      imageAlt: image.imageAlt || '',
      order: image.order,
      isActive: image.isActive,
      metadata: {
        section: image.metadata?.section || '',
        category: image.metadata?.category || '',
        tags: image.metadata?.tags || []
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
    fetchDashboardImages();
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
        <h4 className={styles.componentTitle}>Dashboard Images Management</h4>
        <button
          className={styles.addButton}
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <i className="bi bi-plus-circle"></i>Add Dashboard Image
        </button>
      </div>

      {/* Dashboard Images Grid */}
      <div className="row">
        {dashboardImages.length > 0 ? (
          dashboardImages.map((image, index) => (
            <div key={image._id} className="col-md-6 col-lg-4 mb-4">
              <div className={`card h-100 ${styles.componentContainer}`}>
                <div className="position-relative">
                  {image.imageUrl ? (
                    <img
                      src={image.imageUrl}
                      alt={image.imageAlt || image.title}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                      <i className="bi bi-image text-muted" style={{ fontSize: '3rem' }}></i>
                    </div>
                  )}
                  <div className="position-absolute top-0 end-0 p-2">
                    <span className={`badge ${image.isActive ? 'bg-success' : 'bg-secondary'} ${styles.statusBadge}`}>
                      {image.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{image.title}</h5>
                  <p className="card-text text-muted small">
                    {image.description || 'No description available'}
                  </p>
                  {image.metadata?.section && (
                    <div className="mb-2">
                      <span className={`badge bg-info me-1 ${styles.statusBadge}`}>
                        {image.metadata.section}
                      </span>
                      {image.metadata?.category && (
                        <span className={`badge bg-secondary ${styles.statusBadge}`}>
                          {image.metadata.category}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">Order: {image.order}</small>
                    <div className="btn-group" role="group">
                      <button
                        className={`btn btn-sm btn-outline-primary ${styles.actionButton}`}
                        onClick={() => handleEdit(image)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      
                      <button
                        className={`btn btn-sm btn-outline-danger ${styles.actionButton}`}
                        onClick={() => deleteDashboardImage(image._id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <small className="text-muted">
                    Created: {formatDate(image.createdAt)}
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="text-center py-5">
              <i className="bi bi-image text-muted" style={{ fontSize: '4rem' }}></i>
              <h5 className="mt-3 text-muted">No dashboard images found</h5>
              <p className="text-muted">Add your first dashboard image to get started.</p>
            </div>
          </div>
        )}
      </div>

      {/* Dashboard Image Modal */}
      {showModal && (
        <div className="show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className={`modal-content ${styles.modalContent}`}>
              <div className={`modal-header ${styles.modalHeader}`}>
                <h5 className={`modal-title ${styles.modalTitle}`}>
                  {editingImage ? 'Edit Dashboard Image' : 'Add New Dashboard Image'}
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
                    <label className={styles.formLabel}>Image *</label>
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
                          <label className={styles.formLabel}>Image URL *</label>
                          <input
                            type="url"
                            className={`form-control ${styles.formControl}`}
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                            required
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
                        <label className={styles.formLabel}>Section</label>
                        <select
                          className={`form-control ${styles.formControl}`}
                          name="metadata.section"
                          value={formData.metadata.section}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Section</option>
                          <option value="hero">Hero Section</option>
                          <option value="about">About Section</option>
                          <option value="services">Services Section</option>
                          <option value="testimonials">Testimonials Section</option>
                          <option value="gallery">Gallery Section</option>
                          <option value="banner">Banner</option>
                          <option value="background">Background</option>
                        </select>
                      </div>
                    </div>
                    <div className={`${styles.formCol} ${styles.half}`}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Category</label>
                        <input
                          type="text"
                          className={`form-control ${styles.formControl}`}
                          name="metadata.category"
                          value={formData.metadata.category}
                          onChange={handleInputChange}
                          placeholder="e.g., Main, Secondary, Promotional"
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
                  onClick={saveDashboardImage}
                >
                  {editingImage ? 'Update' : 'Create'} Dashboard Image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}