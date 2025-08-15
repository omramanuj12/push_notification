# Push Notification App

A React application that provides push notifications with timer functionality and sound alerts.

## Features

- **Instant Notification Button**: Click "Notify Me" to send immediate notifications
- **Timer with Reminder**: Set a custom timer and receive notifications when it completes
- **Notification Sound**: Audio alerts accompany all notifications
- **Modern UI**: Beautiful, responsive design with glassmorphism effects
- **Permission Management**: Automatic notification permission handling

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## How to Use

### Instant Notifications
- Click the "Notify Me" button to send an immediate notification
- The first time you click, the browser will ask for notification permission
- Grant permission to receive notifications

### Timer with Reminder
1. Enter the number of minutes in the input field
2. Click "Start Timer" to begin the countdown
3. The timer will display the remaining time
4. When the timer completes, you'll receive a notification with sound
5. Use "Stop Timer" to cancel the countdown

## Browser Compatibility

- Chrome 42+
- Firefox 41+
- Safari 16+
- Edge 17+

## Technical Details

- Built with React 18
- Uses the Web Notifications API
- Includes embedded audio for notification sounds
- Responsive design with CSS Grid and Flexbox
- Glassmorphism UI design

## Troubleshooting

- **Notifications not working**: Ensure you've granted notification permission in your browser
- **Sound not playing**: Some browsers require user interaction before playing audio
- **Timer not working**: Make sure to enter a valid number of minutes (1-1440)

## License

This project is open source and available under the MIT License.
