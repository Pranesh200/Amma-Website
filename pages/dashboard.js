import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import Button from './components/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import Form from './components/Form';
import MenuForm from './components/MenuForm'
import DashboardForm from './components/DashboardForm'
const Home = () => {
    return (
        <div className="root">
            <div className="container">
                <div className="header">
                    <div className="header-title">
                        <h1>Welcome, Amma!</h1>
                    </div>
                    <div className="header-subtitle">
                        <h2>This is the Dashboard, where you can view daily orders!</h2>
                    </div>
                </div>
                <DashboardForm />
            </div>
        </div>
    );
};

export default Home;
