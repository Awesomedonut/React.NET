import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DynamicRouter from './DynamicRouter';
import WelcomeWidget from './components/WelcomeWidget';
import DashboardWidget from './components/DashboardWidget';
import UserProfileCard from './components/UserProfileCard';
import reportWebVitals from './reportWebVitals';

window.ReactComponents = {
  renderWelcomeWidget: function(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      const root = ReactDOM.createRoot(element);
      root.render(React.createElement(WelcomeWidget));
    }
  },
  renderComponent: function(elementId, componentName, props = {}, config = {}) {
    const element = document.getElementById(elementId);
    if (element) {
      const root = ReactDOM.createRoot(element);
      root.render(
        React.createElement(DynamicRouter, {
          componentName,
          props,
          config
        })
      );
    }
  },
  renderDashboard: function(elementId, props = {}, config = {}) {
    const element = document.getElementById(elementId);
    if (element) {
      const root = ReactDOM.createRoot(element);
      root.render(React.createElement(DashboardWidget, { ...props, config }));
    }
  },

  renderUserProfile: function(elementId, userData = {}, editable = false) {
    const element = document.getElementById(elementId);
    if (element) {
      const root = ReactDOM.createRoot(element);
      root.render(React.createElement(UserProfileCard, { userData, editable }));
    }
  },
  renderMultipleComponents: function(containerId, componentsConfig) {
    const container = document.getElementById(containerId);
    if (container && Array.isArray(componentsConfig)) {
      const root = ReactDOM.createRoot(container);
      const components = componentsConfig.map((config, index) => {
        const { elementId, componentName, props = {}, config: compConfig = {} } = config;
        return React.createElement(
          'div',
          { key: index, id: elementId, className: 'react-component-wrapper' },
          React.createElement(DynamicRouter, {
            componentName,
            props,
            config: compConfig
          })
        );
      });
      
      root.render(React.createElement('div', { className: 'multi-component-root' }, ...components));
    }
  }
};
document.addEventListener('DOMContentLoaded', function() {
  const reactElements = document.querySelectorAll('[data-react-component]');
  
  reactElements.forEach(element => {
    const componentName = element.getAttribute('data-react-component');
    const propsData = element.getAttribute('data-react-props');
    const configData = element.getAttribute('data-react-config');
    
    let props = {};
    let config = {};
    
    try {
      if (propsData) props = JSON.parse(propsData);
      if (configData) config = JSON.parse(configData);
    } catch (e) {
      console.warn('Failed to parse React component data:', e);
    }
    
    window.ReactComponents.renderComponent(element.id, componentName, props, config);
  });
  const welcomeElement = document.getElementById('react-welcome-widget');
  if (welcomeElement && !welcomeElement.hasAttribute('data-react-component')) {
    window.ReactComponents.renderWelcomeWidget('react-welcome-widget');
  }

  const dashboardElement = document.getElementById('react-dashboard');
  if (dashboardElement && !dashboardElement.hasAttribute('data-react-component')) {
    window.ReactComponents.renderDashboard('react-dashboard');
  }

  const profileElement = document.getElementById('react-profile');
  if (profileElement && !profileElement.hasAttribute('data-react-component')) {
    window.ReactComponents.renderUserProfile('react-profile');
  }
});
reportWebVitals();
