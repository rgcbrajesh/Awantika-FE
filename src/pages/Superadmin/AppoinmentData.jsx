import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SuperadminComponents.module.css';

export default function AppoinmentData() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [notes, setNotes] = useState('');

  // Fetch appointments data
  const fetchAppointments = async (page = 1, status = '', date = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10'
      });
      
      if (status) params.append('status', status);
      if (date) params.append('date', date);
      
      const response = await axios.get(`http://localhost:4010/api/appointments?${params}`);
      
      if (response.data.success) {
        setAppointments(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setCurrentPage(response.data.pagination.currentPage);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError('Failed to load appointment data');
    } finally {
      setLoading(false);
    }
  };

  // Update appointment status
  const updateAppointmentStatus = async (appointmentId, newStatus, appointmentNotes = '') => {
    try {
      const response = await axios.put(`http://localhost:4010/api/appointments/${appointmentId}/status`, {
        status: newStatus,
        notes: appointmentNotes
      });
      
      if (response.data.success) {
        fetchAppointments(currentPage, statusFilter, dateFilter);
        setSelectedAppointment(null);
        setNotes('');
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
      setError('Failed to update appointment status');
    }
  };

  // Delete appointment
  const deleteAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        const response = await axios.delete(`http://localhost:4010/api/appointments/${appointmentId}`);
        
        if (response.data.success) {
          fetchAppointments(currentPage, statusFilter, dateFilter);
        }
      } catch (error) {
        console.error('Error deleting appointment:', error);
        setError('Failed to delete appointment');
      }
    }
  };

  useEffect(() => {
    fetchAppointments(currentPage, statusFilter, dateFilter);
  }, [currentPage, statusFilter, dateFilter]);

  const handleStatusChange = (appointmentId, newStatus) => {
    updateAppointmentStatus(appointmentId, newStatus);
  };

  const handleStatusWithNotes = (appointmentId, newStatus, appointmentNotes) => {
    updateAppointmentStatus(appointmentId, newStatus, appointmentNotes);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleDateFilter = (date) => {
    setDateFilter(date);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'badge bg-warning text-dark',
      confirmed: 'badge bg-success',
      completed: 'badge bg-primary',
      cancelled: 'badge bg-danger'
    };
    return statusClasses[status] || 'badge bg-secondary';
  };

  const getGenderIcon = (gender) => {
    return gender === 'male' ? '👨' : '👩';
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

      {/* Filter Controls */}
      <div className={`row mb-3 ${styles.filterContainer}`}>
        <div className="col-md-6">
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn btn-sm ${statusFilter === '' ? `btn-primary ${styles.filterButton} ${styles.active}` : `btn-outline-primary ${styles.filterButton}`}`}
              onClick={() => handleStatusFilter('')}
            >
              All Status
            </button>
            <button
              type="button"
              className={`btn btn-sm ${statusFilter === 'pending' ? `btn-primary ${styles.filterButton} ${styles.active}` : `btn-outline-primary ${styles.filterButton}`}`}
              onClick={() => handleStatusFilter('pending')}
            >
              Pending
            </button>
            <button
              type="button"
              className={`btn btn-sm ${statusFilter === 'confirmed' ? `btn-primary ${styles.filterButton} ${styles.active}` : `btn-outline-primary ${styles.filterButton}`}`}
              onClick={() => handleStatusFilter('confirmed')}
            >
              Confirmed
            </button>
            <button
              type="button"
              className={`btn btn-sm ${statusFilter === 'completed' ? `btn-primary ${styles.filterButton} ${styles.active}` : `btn-outline-primary ${styles.filterButton}`}`}
              onClick={() => handleStatusFilter('completed')}
            >
              Completed
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <input
            type="date"
            className={`form-control form-control-sm ${styles.filterSelect}`}
            value={dateFilter}
            onChange={(e) => handleDateFilter(e.target.value)}
            placeholder="Filter by date"
          />
        </div>
      </div>

      {/* Appointment Table */}
      <div className={`table-responsive ${styles.tableContainer}`}>
        <table className="table table-bordered table-hover">
          <thead className={styles.tableHeader}>
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Contact</th>
              <th scope="col">Gender</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Reason</th>
              <th scope="col">Status</th>
              <th scope="col">Created</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <tr key={appointment._id} className={`text-center ${styles.tableRow}`}>
                  <th scope="row">{(currentPage - 1) * 10 + index + 1}</th>
                  <td>{appointment.name}</td>
                  <td>
                    <div>{appointment.email}</div>
                    <small className="text-muted">{appointment.mobile}</small>
                  </td>
                  <td>{getGenderIcon(appointment.gender)} {appointment.gender}</td>
                  <td>{formatDate(appointment.appointmentDate)}</td>
                  <td>{appointment.appointmentTime}</td>
                  <td className="text-truncate" style={{ maxWidth: '150px' }}>
                    {appointment.reason}
                  </td>
                  <td>
                    <span className={`${getStatusBadge(appointment.status)} ${styles.statusBadge}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </td>
                  <td>{formatDateTime(appointment.createdAt)}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <select
                        className={`form-select form-select-sm ${styles.filterSelect}`}
                        value={appointment.status}
                        onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button
                        className={`btn btn-sm btn-outline-info ${styles.actionButton}`}
                        onClick={() => setSelectedAppointment(appointment)}
                        data-bs-toggle="modal"
                        data-bs-target="#appointmentModal"
                        title="View Details"
                      >
                        👁️
                      </button>
                      <button
                        className={`btn btn-sm btn-outline-danger ${styles.actionButton}`}
                        onClick={() => deleteAppointment(appointment._id)}
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
                <td colSpan="10" className="text-center py-4">
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Appointment pagination" className={styles.paginationContainer}>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className={`page-link ${styles.paginationButton}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button
                  className={`page-link ${styles.paginationButton} ${currentPage === i + 1 ? styles.active : ''}`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className={`page-link ${styles.paginationButton}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}

      {/* Appointment Details Modal */}
      <div className="modal fade" id="appointmentModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className={`modal-content ${styles.modalContent}`}>
            <div className={`modal-header ${styles.modalHeader}`}>
              <h5 className={`modal-title ${styles.modalTitle}`}>Appointment Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className={`modal-body ${styles.modalBody}`}>
              {selectedAppointment && (
                <div>
                  <div className="row">
                    <div className="col-md-6">
                      <h6>Personal Information</h6>
                      <p><strong>Name:</strong> {selectedAppointment.name}</p>
                      <p><strong>Email:</strong> {selectedAppointment.email}</p>
                      <p><strong>Mobile:</strong> {selectedAppointment.mobile}</p>
                      <p><strong>Gender:</strong> {getGenderIcon(selectedAppointment.gender)} {selectedAppointment.gender}</p>
                    </div>
                    <div className="col-md-6">
                      <h6>Appointment Information</h6>
                      <p><strong>Date:</strong> {formatDate(selectedAppointment.appointmentDate)}</p>
                      <p><strong>Time:</strong> {selectedAppointment.appointmentTime}</p>
                      <p><strong>Preferred Contact:</strong> {selectedAppointment.wayToReach}</p>
                      <p><strong>Status:</strong> 
                        <span className={`ms-2 ${getStatusBadge(selectedAppointment.status)} ${styles.statusBadge}`}>
                          {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="row mt-3">
                    <div className="col-12">
                      <h6>Address</h6>
                      <p className="bg-light p-2 rounded">{selectedAppointment.address}</p>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-12">
                      <h6>Reason for Appointment</h6>
                      <p className="bg-light p-2 rounded">{selectedAppointment.reason}</p>
                    </div>
                  </div>
                  
                  {selectedAppointment.notes && (
                    <div className="row">
                      <div className="col-12">
                        <h6>Admin Notes</h6>
                        <p className="bg-info bg-opacity-10 p-2 rounded">{selectedAppointment.notes}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Add Notes</label>
                    <textarea
                      className={`form-control ${styles.formControl}`}
                      rows="3"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add notes about this appointment..."
                    ></textarea>
                  </div>
                  
                  <div className="row mt-3">
                    <div className="col-12">
                      <h6>Update Status</h6>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-warning"
                          onClick={() => handleStatusWithNotes(selectedAppointment._id, 'pending', notes)}
                          data-bs-dismiss="modal"
                        >
                          Mark Pending
                        </button>
                        <button
                          className="btn btn-success"
                          onClick={() => handleStatusWithNotes(selectedAppointment._id, 'confirmed', notes)}
                          data-bs-dismiss="modal"
                        >
                          Confirm
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleStatusWithNotes(selectedAppointment._id, 'completed', notes)}
                          data-bs-dismiss="modal"
                        >
                          Complete
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleStatusWithNotes(selectedAppointment._id, 'cancelled', notes)}
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={`modal-footer ${styles.modalFooter}`}>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
