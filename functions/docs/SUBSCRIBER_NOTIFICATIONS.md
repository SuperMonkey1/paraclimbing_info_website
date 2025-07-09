# Subscriber Event Notifications

## Overview

When an admin approves an event (changes status to 'a'), all subscribers in the `contacts` collection will automatically receive an email notification about the new event.

## How it works

1. **Event Approval**: Admin approves an event by changing its status to 'a'
2. **Automatic Notification**: The `sendEventApprovalNotification` Cloud Function triggers
3. **Subscriber Emails**: All email addresses from the `contacts` collection receive the notification
4. **Google Calendar Integration**: Each email includes a button to add the event to Google Calendar

## Email Content

The notification email includes:
- Event title, date, time, location, and organizer
- Event description (if available)
- "Add to Google Calendar" button with pre-filled event details
- Link to the paraclimbing.info website
- Professional styling with the paraclimbing.info branding

## Technical Implementation

### Database Updates
When an event is approved, the following fields are added to the event document:
- `subscriberNotificationSent: true`
- `subscriberNotificationSentAt: timestamp`

### Email Template
The email template `newEventSubscriberNotificationEmail` is defined in `utils/email-templates.ts` and includes:
- Responsive HTML design
- Google Calendar integration URL
- Event details formatting
- Paraclimbing.info branding

### Error Handling
- Individual email failures don't stop the entire process
- Detailed logging for debugging
- Graceful handling of missing subscriber data

## Google Calendar Integration

The "Add to Google Calendar" button generates a URL with:
- Pre-filled event title and description
- Event location
- Event date (formatted for Google Calendar)
- Timezone set to Europe/Brussels
- Additional event details in the description

## Configuration

No additional configuration is needed. The system automatically:
- Fetches all subscribers from the `contacts` collection
- Filters valid email addresses
- Sends notifications using the existing email service
- Logs all operations for monitoring

## Monitoring

Check the Firebase Functions logs for:
- Number of subscribers notified
- Individual email send status
- Error messages if any issues occur

## Future Enhancements

Potential improvements could include:
- Unsubscribe functionality
- Event category filtering
- Personalized email content
- Batch email sending for performance
- Email delivery tracking
