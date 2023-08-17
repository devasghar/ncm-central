import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {CredsContextProvider} from "./contex/CredsContext";
import {ClientsContextProvider} from "./contex/ClientsContext";
import {VisitorsContextProvider} from "./contex/VisitorsContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CredsContextProvider>
        <ClientsContextProvider>
           <VisitorsContextProvider>
               <App />
           </VisitorsContextProvider>
        </ClientsContextProvider>
    </CredsContextProvider>
  </React.StrictMode>
);