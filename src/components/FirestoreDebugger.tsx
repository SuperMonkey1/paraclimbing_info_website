import React, { useEffect, useState } from 'react';
import { subscribeToApprovedEvents, getAllEventsForAdmin } from '../firebase/events-service';

const FirestoreDebugger: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    console.log('🔧 FirestoreDebugger: Starting debug...');
    
    const testFirestore = async () => {
      try {
        setErrors([]);
        
        // Test 1: Get all events using our existing service
        console.log('🔧 Testing getAllEventsForAdmin...');
        const allEvents = await getAllEventsForAdmin();
        console.log('🔧 All events result:', allEvents);
        
        // Test 2: Test the real-time listener
        console.log('🔧 Testing subscribeToApprovedEvents...');
        const unsubscribe = subscribeToApprovedEvents((approvedEvents) => {
          console.log('🔧 Real-time approved events:', approvedEvents);
          
          setDebugInfo({
            totalEvents: allEvents.length,
            approvedEvents: approvedEvents.length,
            allEventsData: allEvents,
            approvedEventsData: approvedEvents,
            timestamp: new Date().toISOString()
          });
        });
        
        // Clean up listener after 5 seconds
        setTimeout(() => {
          unsubscribe();
        }, 5000);
        
      } catch (error: any) {
        console.error('🔧 Debug error:', error);
        setErrors(prev => [...prev, error.message || error.toString()]);
      }
    };
    
    testFirestore();
  }, []);

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg m-4">
      <h3 className="text-lg font-bold mb-4">🔧 Firestore Debug Information</h3>
      
      {errors.length > 0 && (
        <div className="bg-red-100 p-3 rounded mb-4">
          <strong>Errors:</strong>
          <ul className="list-disc ml-4">
            {errors.map((error, index) => (
              <li key={index} className="text-red-700">{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      {!debugInfo && errors.length === 0 && (
        <div className="bg-yellow-100 p-3 rounded">
          🔧 Running tests... Check console for detailed logs.
        </div>
      )}
      
      {debugInfo && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded">
              <strong>Total Events in DB:</strong> {debugInfo.totalEvents}
            </div>
            <div className="bg-white p-3 rounded">
              <strong>Approved Events:</strong> {debugInfo.approvedEvents}
            </div>
          </div>
          
          <div className="bg-white p-3 rounded">
            <strong>All Events in Database:</strong>
            <div className="text-xs mt-2 bg-gray-100 p-2 rounded overflow-auto max-h-40">
              {debugInfo.allEventsData.map((event: any, index: number) => (
                <div key={index} className="border-b pb-1 mb-1">
                  <strong>ID:</strong> {event.id} | 
                  <strong> Title:</strong> {event.title} | 
                  <strong> Status:</strong> <span className={event.status === 'a' ? 'text-green-600 font-bold' : 'text-orange-600'}>{event.status}</span> |
                  <strong> Date:</strong> {event.date}
                </div>
              ))}
            </div>
          </div>
          
          {debugInfo.approvedEvents > 0 && (
            <div className="bg-green-50 p-3 rounded">
              <strong>✅ Approved Events Found:</strong>
              <div className="text-xs mt-2">
                {debugInfo.approvedEventsData.map((event: any, index: number) => (
                  <div key={index} className="border-b pb-1 mb-1">
                    <strong>{event.title}</strong> - {event.date} - {event.location}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {debugInfo.approvedEvents === 0 && debugInfo.totalEvents > 0 && (
            <div className="bg-orange-100 p-3 rounded">
              <strong>⚠️ No approved events found!</strong> You have {debugInfo.totalEvents} events in the database, but none have status = "a"
            </div>
          )}
          
          <div className="text-xs text-gray-500">
            Last updated: {debugInfo.timestamp}
          </div>
        </div>
      )}
    </div>
  );
};

export default FirestoreDebugger;
