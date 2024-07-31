import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ProductProvider} from "./components/hero/ProductContext";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ProductProvider>
            <App />
        </ProductProvider>
    </React.StrictMode>
);
