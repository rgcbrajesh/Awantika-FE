import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SuperadminComponents.module.css';

export default function MemoryData() {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingMemory, setEditingMemory] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    imageUrl: '',
    imageAlt: '',
    order: 0,
    isActive: true,
    metadata: {
      date: '',
      location: '',
      category: '',
      tags: []
    }
  });

  // Fetch memories data
  const fetchMemories = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/content/types/memory?page=${page}&limit=10`);
      
      if (response.data.success) {
        setMemories(response.data.data);
        // setTotalPages(Math.ceil(response.data.total / 10));
        setCurrentPage(page);
      }
    } catch (error) {
      console.error('Error fetching memories:', error);
      setError('Failed to load memory data');
    } finally {
      setLoading(false);
    }
  };

  // Create or update memory
  const saveMemory = async () => {
    try {
      const memoryData = {
        ...formData,
        type: 'memory'
      };

      let response;
      if (editingMemory) {
        response = await axios.put(`${process.env.REACT_APP_API_URL}/api/content/${editingMemory._id}`, memoryData);
      } else {
        response = await axios.post(`${process.env.REACT_APP_API_URL}/api/content`, memoryData);
      }
      
      if (response.data.success) {
        fetchMemories(currentPage);
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving memory:', error);
      setError('Failed to save memory');
    }
  };

  // Delete memory
  const deleteMemory = async (memoryId) => {
    if (window.confirm('Are you sure you want to delete this memory?')) {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/content/${memoryId}`);
        
        if (response.data.success) {
          fetchMemories(currentPage);
        }
      } catch (error) {
        console.error('Error deleting memory:', error);
        setError('Failed to delete memory');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      imageUrl: '',
      imageAlt: '',
      order: 0,
      isActive: true,
      metadata: {
        date: '',
        location: '',
        category: '',
        tags: []
      }
    });
    setEditingMemory(null);
  };

  const handleEdit = (memory) => {
    setEditingMemory(memory);
    setFormData({
      title: memory.title,
      description: memory.description || '',
      content: memory.content || '',
      imageUrl: memory.imageUrl || '',
      imageAlt: memory.imageAlt || '',
      order: memory.order,
      isActive: memory.isActive,
      metadata: {
        date: memory.metadata?.date || '',
        location: memory.metadata?.location || '',
        category: memory.metadata?.category || '',
        tags: memory.metadata?.tags || []
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
    fetchMemories();
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
        <h4 className={styles.componentTitle}>Memories Management</h4>
        <button
          className={styles.addButton}
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <i className="bi bi-plus-circle"></i>Add Memory
        </button>
      </div>

      {/* Memories Table */}
      <div className={`table-responsive ${styles.tableContainer}`}>
        <table className="table table-bordered table-hover">
          <thead className={styles.tableHeader}>
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Location</th>
              <th scope="col">Date</th>
              <th scope="col">Order</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {memories.length > 0 ? (
              memories.map((memory, index) => (
                <tr key={memory._id} className={`text-center ${styles.tableRow}`}>
                  <th scope="row">{(currentPage - 1) * 10 + index + 1}</th>
                  <td>
                    {memory.imageUrl ? (
                      <img
                        src={memory.imageUrl}
                        alt={memory.imageAlt || memory.title}
                        className={styles.imagePreview}
                      />
                    ) : (
                      <div className={styles.imagePlaceholder}>
                        <i className="bi bi-image"></i>
                      </div>
                    )}
                  </td>
                  <td className="text-start">{memory.title}</td>
                  <td className="text-truncate" style={{ maxWidth: '200px' }}>
                    {memory.description}
                  </td>
                  <td>
                    <span className={`badge bg-info ${styles.statusBadge}`}>
                      {memory.metadata?.location || '-'}
                    </span>
                  </td>
                  <td>
                    {memory.metadata?.date ? formatDate(memory.metadata.date) : '-'}
                  </td>
                  <td>{memory.order}</td>
                  <td>
                    <span className={`badge ${memory.isActive ? 'bg-success' : 'bg-secondary'} ${styles.statusBadge}`}>
                      {memory.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        className={`btn btn-sm btn-outline-primary ${styles.actionButton}`}
                        onClick={() => handleEdit(memory)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      
                      <button
                        className={`btn btn-sm btn-outline-danger ${styles.actionButton}`}
                        onClick={() => deleteMemory(memory._id)}
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
                  No memories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Memory Modal */}
      {showModal && (
        <div className="show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className={`modal-content ${styles.modalContent}`}>
              <div className={`modal-header ${styles.modalHeader}`}>
                <h5 className={`modal-title ${styles.modalTitle}`}>
                  {editingMemory ? 'Edit Memory' : 'Add New Memory'}
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
                    <label className={styles.formLabel}>Content</label>
                    <textarea
                      className={`form-control ${styles.formControl}`}
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Detailed memory content..."
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
                        <label className={styles.formLabel}>Location</label>
                        <input
                          type="text"
                          className={`form-control ${styles.formControl}`}
                          name="metadata.location"
                          value={formData.metadata.location}
                          onChange={handleInputChange}
                          placeholder="e.g., Paris, France"
                        />
                      </div>
                    </div>
                    <div className={`${styles.formCol} ${styles.half}`}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Memory Date</label>
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
                    <label className={styles.formLabel}>Category</label>
                    <input
                      type="text"
                      className={`form-control ${styles.formControl}`}
                      name="metadata.category"
                      value={formData.metadata.category}
                      onChange={handleInputChange}
                      placeholder="e.g., Personal, Professional, Travel"
                    />
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
                  onClick={saveMemory}
                >
                  {editingMemory ? 'Update' : 'Create'} Memory
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}