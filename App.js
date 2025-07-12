import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [tasks, setTasks] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [error, setError] = useState(null);

  // Load initial tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/tasks');
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError('Failed to load tasks');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    const userMessage = {
      sender: 'user',
      text: message,
      timestamp: new Date()
    };
    setChatHistory(prev => [...prev, userMessage]);

    try {
      const { data } = await axios.post('http://localhost:5000/ai-agent', { message });
      
      const aiMessage = {
        sender: 'ai',
        text: data,
        timestamp: new Date(),
        isCommand: true
      };
      setChatHistory(prev => [...prev, aiMessage]);

      await executeCommand(data);
    } catch (err) {
      console.error('API Error:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Request failed');
      
      const errorMessage = {
        sender: 'ai',
        text: err.response?.data?.error || 'Sorry, I encountered an error',
        isError: true,
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  };

  const executeCommand = async (command) => {
    try {
      let response;
      switch(command.action) {
        case 'createTask':
          response = await axios.post('http://localhost:5000/tasks', command.data);
          break;
        case 'listTasks':
          response = await axios.get('http://localhost:5000/tasks');
          setTasks(response.data);
          break;
        case 'updateTask':
          response = await axios.put(
            `http://localhost:5000/tasks/${command.data.id}`,
            command.data
          );
          break;
        case 'deleteTask':
          response = await axios.delete(
            `http://localhost:5000/tasks/${command.data.id}`
          );
          break;
        default:
          throw new Error('Unknown command');
      }
      await fetchTasks(); // Refresh task list
    } catch (err) {
      console.error('Command execution failed:', err);
      setError('Failed to execute command');
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>✨ TaskGenie</h1>
        <p>Your AI-powered task management assistant</p>
      </header>

      <div className="main-layout">
        <div className="navigation-tabs">
          <button
            className={`tab ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <i className="fas fa-comment-alt"></i> Chat
          </button>
          <button
            className={`tab ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            <i className="fas fa-tasks"></i> Tasks ({tasks.length})
          </button>
        </div>

        {error && (
          <motion.div
            className="error-message"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {activeTab === 'chat' ? (
            <motion.div
              className="chat-section"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="chat-container">
                <AnimatePresence>
                  {chatHistory.map((item, index) => (
                    <motion.div
                      key={index}
                      className={`message ${item.sender} ${item.isError ? 'error' : ''} ${item.isCommand ? 'command' : ''}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="message-header">
                        <span className="sender">
                          {item.sender === 'user' ? 'You' : 'TaskGenie'}
                        </span>
                        <span className="timestamp">
                          {formatTime(item.timestamp)}
                        </span>
                      </div>
                      <div className="message-content">
                        {typeof item.text === 'object'
                          ? JSON.stringify(item.text, null, 2)
                          : item.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    className="typing-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="dot-flashing"></div>
                    <span>TaskGenie is thinking...</span>
                  </motion.div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="message-form">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask TaskGenie to create, update, or list tasks..."
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !message.trim()}
                  aria-label="Send message"
                >
                  <i className={`fas ${isLoading ? 'fa-spinner fa-pulse' : 'fa-paper-plane'}`}></i>
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              className="tasks-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="tasks-header">
                <h2>Your Tasks</h2>
                <button
                  className="refresh-btn"
                  onClick={() => executeCommand({ action: 'listTasks' })}
                >
                  <i className="fas fa-sync-alt"></i> Refresh
                </button>
              </div>

              {tasks.length === 0 ? (
                <motion.div
                  className="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <i className="fas fa-clipboard-list"></i>
                  <p>No tasks yet. Ask TaskGenie to create one!</p>
                </motion.div>
              ) : (
                <div className="tasks-grid">
                  {tasks.map((task) => (
                    <motion.div
                      key={task.id}
                      className="task-card"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="task-header">
                        <h3>{task.title}</h3>
                        <span className={`status ${task.status?.toLowerCase().replace(' ', '-')}`}>
                          {task.status || 'Not started'}
                        </span>
                      </div>
                      {task.dueDate && (
                        <div className="due-date">
                          <i className="far fa-calendar-alt"></i>
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      )}
                      <div className="task-actions">
                        <button
                          className="action-btn complete"
                          onClick={() =>
                            executeCommand({
                              action: 'updateTask',
                              data: { id: task.id, status: 'Completed' }
                            })
                          }
                        >
                          <i className="fas fa-check"></i> Complete
                        </button>
                        <button
                          className="action-btn edit"
                          onClick={() => {
                            setActiveTab('chat');
                            setMessage(`Update task ${task.id} to...`);
                          }}
                        >
                          <i className="fas fa-edit"></i> Edit
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="debug-info">
          Backend: {process.env.REACT_APP_API_URL || 'http://localhost:5000'}
        </div>
      )}
    </div>
  );
}

export default App;