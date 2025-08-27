import React, { useEffect, useState } from 'react';
import WelcomeWidget from './components/WelcomeWidget';
import DashboardWidget from './components/DashboardWidget';
import UserProfileCard from './components/UserProfileCard';

const ComponentRegistry = {
  WelcomeWidget,
  DashboardWidget,
  UserProfileCard,
};

const DynamicRouter = ({ componentName, props = {}, config = {} }) => {
  const [componentToRender, setComponentToRender] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (componentName) {
      let component = null;

      try {
        switch (componentName) {
          case 'welcome':
          case 'welcome-widget':
            component = <WelcomeWidget {...props} />;
            break;
          case 'dashboard':
          case 'dashboard-widget':
            component = <DashboardWidget {...props} config={config} />;
            break;
          case 'profile':
          case 'user-profile':
            component = <UserProfileCard {...props} />;
            break;
          case 'multi-component':
            if (config.components && Array.isArray(config.components)) {
              component = (
                <div className="multi-component-container">
                  {config.components.map((compConfig, index) => {
                    const CompName = compConfig.name;
                    const RegisteredComponent = ComponentRegistry[CompName];
                    if (RegisteredComponent) {
                      return (
                        <div key={index} className="component-wrapper">
                          <RegisteredComponent {...(compConfig.props || {})} />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              );
            }
            break;
          default:
            const normalizedName = componentName.split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join('');
            
            const DynamicComponent = ComponentRegistry[normalizedName];
            if (DynamicComponent) {
              component = <DynamicComponent {...props} config={config} />;
            } else {
              component = (
                <div className="component-not-found">
                  <h3>Component Not Found</h3>
                  <p>The component "{componentName}" could not be found.</p>
                  <div className="available-components">
                    <strong>Available components:</strong>
                    <ul>
                      {Object.keys(ComponentRegistry).map(name => (
                        <li key={name}>{name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }
        }

        setComponentToRender(component);
        setError(null);
      } catch (err) {
        setError(err.message);
        setComponentToRender(
          <div className="component-error">
            <h3>Component Error</h3>
            <p>Error loading component "{componentName}": {err.message}</p>
          </div>
        );
      }
    }
  }, [componentName, props, config]);

  if (error) {
    return (
      <div className="dynamic-router-error">
        <h3>Router Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="dynamic-router">
      {componentToRender}
    </div>
  );
};

export default DynamicRouter;