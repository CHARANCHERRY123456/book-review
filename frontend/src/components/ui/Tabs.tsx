import React, { useState, createContext, useContext } from 'react';

interface TabsContextType {
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const Tabs: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};

export const TabList: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex border-b border-gray-200">
      {children}
    </div>
  );
};

export const Tab: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const context = useContext(TabsContext);
  
  if (!context) {
    throw new Error('Tab must be used within a Tabs component');
  }
  
  const { activeTab, setActiveTab } = context;
  const index = React.Children.toArray(
    React.Children.toArray(
      React.Children.toArray(children)[0]
    )[0]
  ).findIndex(() => true);

  return (
    <button
      className={`px-4 py-2 font-medium transition-colors ${
        activeTab === index
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-gray-500 hover:text-gray-700'
      }`}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
};

export const TabPanel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const context = useContext(TabsContext);
  
  if (!context) {
    throw new Error('TabPanel must be used within a Tabs component');
  }
  
  const { activeTab } = context;
  const index = React.Children.toArray(
    React.Children.toArray(
      React.Children.toArray(children)[0]
    )[0]
  ).findIndex(() => true);

  if (activeTab !== index) {
    return null;
  }

  return <div className="tab-panel">{children}</div>;
};