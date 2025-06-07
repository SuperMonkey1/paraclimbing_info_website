import React, { useState, useEffect } from 'react';
import { subscribeToAllEventsForAdmin, updateEventStatus, deleteEvent, Event } from '../firebase/events-service';

const AdminEventsPanel: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingEventId, setProcessingEventId] = useState<string | null>(null);

  useEffect(() => {
    console.log('AdminEventsPanel: Setting up real-time events listener...');
    
    setLoading(true);
    
    // Set up real-time listener
    const unsubscribe = subscribeToAllEventsForAdmin((allEvents) => {
      console.log('AdminEventsPanel: Real-time update - events:', allEvents);
      setEvents(allEvents);
      setLoading(false);
    });

    // Cleanup function
    return () => {
      console.log('AdminEventsPanel: Cleaning up events listener...');
      unsubscribe();
    };
  }, []);

  // Remove the old fetchAllEvents function since we're using real-time listener
  // const fetchAllEvents = async () => { ... }

  const handleStatusUpdate = async (eventId: string, status: 'a' | 'r') => {
    try {
      setProcessingEventId(eventId);
      await updateEventStatus(eventId, status, 'admin@paraclimbing.info'); // Replace with actual admin email
      // No need to manually refresh - real-time listener will update automatically
      console.log('Event status updated, real-time listener will refresh the list');
    } catch (error) {
      console.error('Error updating event status:', error);
      alert('Failed to update event status');
    } finally {
      setProcessingEventId(null);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }
    
    try {
      setProcessingEventId(eventId);
      await deleteEvent(eventId);
      // No need to manually refresh - real-time listener will update automatically
      console.log('Event deleted, real-time listener will refresh the list');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event');
    } finally {
      setProcessingEventId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ur':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Under Review</span>;
      case 'a':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Approved</span>;
      case 'r':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">Rejected</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">Unknown</span>;
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-gray-600 mt-2">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Management</h1>
        <p className="text-gray-600">Review and manage user-submitted events</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-primary">{events.filter(e => e.status === 'ur').length}</div>
          <div className="text-gray-600">Pending Review</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-green-600">{events.filter(e => e.status === 'a').length}</div>
          <div className="text-gray-600">Approved</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-red-600">{events.filter(e => e.status === 'r').length}</div>
          <div className="text-gray-600">Rejected</div>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Events</h2>
        </div>
        
        {events.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No events found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organiser</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                        {event.subtitle && <div className="text-sm text-gray-500">{event.subtitle}</div>}
                        <div className="text-xs text-gray-400 mt-1">{event.type}</div>
                        <div className="text-xs text-gray-500 mt-2 max-w-xs truncate">{event.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{event.date}</div>
                      <div className="text-sm text-gray-500">{event.location}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{event.organiser}</div>
                      {event.submittedBy && (
                        <div className="text-xs text-gray-500">by {event.submittedBy}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(event.submittedAt)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(event.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {event.status === 'ur' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(event.id!, 'a')}
                              disabled={processingEventId === event.id}
                              className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 disabled:opacity-50"
                            >
                              {processingEventId === event.id ? 'Processing...' : 'Approve'}
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(event.id!, 'r')}
                              disabled={processingEventId === event.id}
                              className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 disabled:opacity-50"
                            >
                              {processingEventId === event.id ? 'Processing...' : 'Reject'}
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDeleteEvent(event.id!)}
                          disabled={processingEventId === event.id}
                          className="bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 disabled:opacity-50"
                        >
                          Delete
                        </button>
                        {event.externalUrl && (
                          <a
                            href={event.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                          >
                            View
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEventsPanel;
