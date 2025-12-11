'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminSubmissions() {
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [tourBookings, setTourBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('contact');
  const router = useRouter();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/admin/submissions');
      const data = await response.json();

      if (data.success) {
        setContactSubmissions(data.contactSubmissions);
        setTourBookings(data.tourBookings);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Form Submissions</h1>
          <p className="mt-2 text-gray-600">View all contact forms and tour booking requests</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('contact')}
              className={`${
                activeTab === 'contact'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Contact Forms ({contactSubmissions.length})
            </button>
            <button
              onClick={() => setActiveTab('tours')}
              className={`${
                activeTab === 'tours'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Tour Bookings ({tourBookings.length})
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'contact' && (
          <div className="space-y-4">
            {contactSubmissions.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                No contact submissions yet
              </div>
            ) : (
              contactSubmissions.map((submission) => (
                <div key={submission.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{submission.name}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(submission.created_at).toLocaleString()}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                      {submission.inquiry}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-900">
                        <a href={`mailto:${submission.email}`} className="text-primary-600 hover:underline">
                          {submission.email}
                        </a>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-900">
                        {submission.phone ? (
                          <a href={`tel:${submission.phone}`} className="text-primary-600 hover:underline">
                            {submission.phone}
                          </a>
                        ) : (
                          'Not provided'
                        )}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Message</p>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">
                      {submission.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'tours' && (
          <div className="space-y-4">
            {tourBookings.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                No tour bookings yet
              </div>
            ) : (
              tourBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {booking.first_name} {booking.last_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Submitted: {new Date(booking.created_at).toLocaleString()}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Tour Booking
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-900">
                        <a href={`mailto:${booking.email}`} className="text-primary-600 hover:underline">
                          {booking.email}
                        </a>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-900">
                        <a href={`tel:${booking.phone}`} className="text-primary-600 hover:underline">
                          {booking.phone}
                        </a>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Preferred Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(booking.preferred_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Preferred Time</p>
                      <p className="text-sm font-medium text-gray-900">{booking.preferred_time}</p>
                    </div>
                  </div>
                  {booking.message && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Additional Message</p>
                      <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">
                        {booking.message}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => router.push('/')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
