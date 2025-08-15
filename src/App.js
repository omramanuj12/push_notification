import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerInput, setTimerInput] = useState('');
  const [notificationPermission, setNotificationPermission] = useState('default');
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // Request notification permission on component mount
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        setNotificationPermission('granted');
      } else if (Notification.permission === 'denied') {
        setNotificationPermission('denied');
      }
    }

    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      return permission;
    }
    return 'denied';
  };

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    }
  };

  const showNotification = (title, options = {}) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options
      });

      // Play sound
      playNotificationSound();

      // Auto close notification after 5 seconds
      setTimeout(() => {
        notification.close();
      }, 5000);

      return notification;
    } else {
      alert('Notification permission not granted!');
    }
  };

  const handleNotifyMe = () => {
    if (notificationPermission !== 'granted') {
      requestNotificationPermission().then(permission => {
        if (permission === 'granted') {
          showNotification('Hello!', {
            body: 'This is your notification!',
            tag: 'greeting'
          });
        }
      });
    } else {
      showNotification('Hello!', {
        body: 'This is your notification!',
        tag: 'greeting'
      });
    }
  };

  const startTimer = () => {
    const minutes = parseInt(timerInput);
    if (isNaN(minutes) || minutes <= 0) {
      alert('Please enter a valid number of minutes!');
      return;
    }

    const seconds = minutes * 60;
    setTimeLeft(seconds);
    setIsTimerActive(true);

    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          setIsTimerActive(false);
          setTimeLeft(0);
          
          // Show notification when timer ends
          showNotification('Timer Complete!', {
            body: `Your ${minutes} minute timer has finished!`,
            tag: 'timer',
            requireInteraction: true
          });
          
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsTimerActive(false);
    setTimeLeft(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Push Notification App</h1>
        
        <div className="notification-section">
          <h2>Instant Notification</h2>
          <button 
            className="notify-btn"
            onClick={handleNotifyMe}
          >
            Notify Me
          </button>
          
          {notificationPermission === 'default' && (
            <p className="permission-info">
              Click "Notify Me" to request notification permission
            </p>
          )}
          
          {notificationPermission === 'denied' && (
            <p className="permission-error">
              Notification permission denied. Please enable it in your browser settings.
            </p>
          )}
        </div>

        <div className="timer-section">
          <h2>Timer with Reminder</h2>
          <div className="timer-input">
            <input
              type="number"
              placeholder="Enter minutes"
              value={timerInput}
              onChange={(e) => setTimerInput(e.target.value)}
              min="1"
              max="1440"
              disabled={isTimerActive}
            />
            <span>minutes</span>
          </div>
          
          <div className="timer-display">
            {isTimerActive && (
              <div className="time-left">
                Time remaining: <span className="time">{formatTime(timeLeft)}</span>
              </div>
            )}
          </div>
          
          <div className="timer-controls">
            {!isTimerActive ? (
              <button 
                className="start-btn"
                onClick={startTimer}
                disabled={!timerInput || timerInput <= 0}
              >
                Start Timer
              </button>
            ) : (
              <button 
                className="stop-btn"
                onClick={stopTimer}
              >
                Stop Timer
              </button>
            )}
          </div>
        </div>

        {/* Hidden audio element for notification sound */}
        <audio ref={audioRef} preload="auto">
          <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT" type="audio/wav" />
        </audio>
      </header>
    </div>
  );
}

export default App;
