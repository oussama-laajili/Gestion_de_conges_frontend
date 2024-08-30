// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import Particles from 'react-particles';
// import { loadSlim } from 'tsparticles-slim';
// import './Login.css';

// const Login = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [error, setError] = useState('');
//     const [loginStatus, setLoginStatus] = useState('');

//     const particlesInit = async (engine) => {
//         console.log('Particles engine initialized:', engine);
//         await loadSlim(engine);
//     };

//     const particlesLoaded = async (container) => {
//         console.log('Particles container loaded:', container);
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleEmailChange = (e) => setEmail(e.target.value);
//     const handlePasswordChange = (e) => setPassword(e.target.value);

//     const handleLogin = async () => {
//         setError('');
//         try {
//             const response = await axios.post('http://localhost:5000/auth/login', {
//                 email,
//                 password
//             });
//             console.log('Login Response:', response.data); // Check response structure
    
//             const { access_token } = response.data;
    
//             // Store the token in local storage
//             localStorage.setItem('token', access_token);
    
//             // Navigate to /special route
//             setLoginStatus('ok'); // Update login status
//             console.log('Navigation to /special');
//             navigate('/special');
//         } catch (error) {
//             setError('wrong password.');
//             console.error('Login error:', error);
//         }
//     };
    
//     return (
//         <div className="login-container">
//             <Particles
//                 id="particles-js"
//                 init={particlesInit}
//                 loaded={particlesLoaded}
//                 style={{ position: "absolute", zIndex: -1, left: 0, top: 0, width: "100%", height: "100%" }}
//                 options={{
//                     background: {
//                         image: "url(https://i.postimg.cc/6p0W5Dkp/Gradient-BG.png)",
//                         repeat: "no-repeat",
//                         size: "cover"
//                     },
//                     fullScreen: true,
//                     fpsLimit: 60,
//                     interactivity: {
//                         detectsOn: "window",
//                         events: {
//                             onHover: {
//                                 enable: true,
//                                 mode: "repulse"
//                             },
//                             onClick: {
//                                 enable: true,
//                                 mode: "push"
//                             },
//                             resize: true
//                         },
//                         modes: {
//                             grab: {
//                                 distance: 400,
//                                 lineLinked: {
//                                     opacity: 1
//                                 }
//                             },
//                             bubble: {
//                                 distance: 400,
//                                 size: 40,
//                                 duration: 2,
//                                 opacity: 8,
//                                 speed: 3
//                             },
//                             repulse: {
//                                 distance: 200,
//                                 duration: 0.4
//                             },
//                             push: {
//                                 particles_nb: 4
//                             },
//                             remove: {
//                                 particles_nb: 2
//                             }
//                         }
//                     },
//                     particles: {
//                         number: {
//                             value: 25,
//                             density: {
//                                 enable: false,
//                                 value_area: 1104.8088779284833
//                             }
//                         },
//                         color: {
//                             value: "#ea9d39"
//                         },
//                         shape: {
//                             type: "circle",
//                             stroke: {
//                                 width: 0,
//                                 color: "#000000"
//                             },
//                             polygon: {
//                                 nb_sides: 3
//                             },
//                             image: {
//                                 src: "img/github.svg",
//                                 width: 100,
//                                 height: 100
//                             }
//                         },
//                         opacity: {
//                             value: 0.809720656394839,
//                             random: false,
//                             anim: {
//                                 enable: false,
//                                 speed: 1,
//                                 opacity_min: 0.1,
//                                 sync: false
//                             }
//                         },
//                         size: {
//                             value: 80,
//                             random: true,
//                             anim: {
//                                 enable: false,
//                                 speed: 40,
//                                 size_min: 0.1,
//                                 sync: false
//                             }
//                         },
//                         line_linked: {
//                             enable: false,
//                             distance: 150,
//                             color: "#ffffff",
//                             opacity: 0.4,
//                             width: 1
//                         },
//                         move: {
//                             enable: true,
//                             speed: 4,
//                             direction: "none",
//                             random: false,
//                             straight: false,
//                             out_mode: "out",
//                             bounce: false,
//                             attract: {
//                                 enable: false,
//                                 rotateX: 600,
//                                 rotateY: 1200
//                             }
//                         }
//                     },
//                     retina_detect: true
//                 }}
//             />
//             <section className="login-section">
//                 <div className="card">
//                     <div className="container">
//                         <h1>Welcome Back</h1>
//                         {error && <p className="error-message">{error}</p>}
//                         {loginStatus === 'ok' && <p className="login-message">Login successful!</p>}
//                         <ul className="email-input-list">
//                             <li className="label">Email</li>
//                             <li>
//                                 <input
//                                     className="email-input"
//                                     placeholder="name@email.com"
//                                     value={email}
//                                     onChange={handleEmailChange}
//                                 />
//                             </li>
//                         </ul>
//                         <ul>
//                             <li className="label">Password</li>
//                             <li className="password-input-container">
//                                 <input
//                                     type={showPassword ? 'text' : 'password'}
//                                     className="email-input password-input"
//                                     placeholder="******"
//                                     value={password}
//                                     onChange={handlePasswordChange}
//                                 />
//                                 <span className="toggle-password" onClick={togglePasswordVisibility}>
//                                     <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//                                 </span>
//                             </li>
//                         </ul>
//                         <button className="login-btn" onClick={handleLogin}>Login</button>
//                         <p className="forgot-password">Forgot your password?</p>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default Login;







// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';
// import { UserContext } from '../Navbaradmin/UserProvider ';
// import './Login4.css';

// const Login = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [error, setError] = useState('');
//     const [loginStatus, setLoginStatus] = useState('');
//     const [showCheckboxes, setShowCheckboxes] = useState(false);

//     const [isAdmin, setIsAdmin] = useState(false);
//     const [isEmployee, setIsEmployee] = useState(true);

//     const { user, setUser } = useContext(UserContext);

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleEmailChange = (e) => setEmail(e.target.value);
//     const handlePasswordChange = (e) => setPassword(e.target.value);

//     const handleLogin = async () => {
//         setError('');
//         try {
//             const response = await axios.post('http://localhost:5000/auth/login', {
//                 email,
//                 password
//             });

//             const { access_token, jobtitle, fullname } = response.data;

//             localStorage.setItem('token', access_token);
//             localStorage.setItem('jobtitle', jobtitle);
//             localStorage.setItem('fullname', fullname);

//             alert(`Email: ${email}\nFullname: ${fullname}\nJob Title: ${jobtitle}`);

//             if (jobtitle === 'administrateur') {
//                 setShowCheckboxes(true);
//             } else {
//                 navigate('/special');
//             }

//             setUser({
//                 email,
//                 fullname,
//                 jobtitle,
//                 isLoggedIn: true
//             });

//             setLoginStatus('ok');
//         } catch (error) {
//             setError('wrong password.');
//             console.error('Login error:', error);
//         }
//     };

//     const handleAdminChange = (e) => {
//         setIsAdmin(e.target.checked);
//         if (e.target.checked) {
//             setIsEmployee(false);
//         }
//     };

//     const handleEmployeeChange = (e) => {
//         setIsEmployee(e.target.checked);
//         if (e.target.checked) {
//             setIsAdmin(false);
//         }
//     };

//     const handleNavigation = () => {
//         if (isAdmin) {
//             navigate('/administrateur');
//         } else {
//             navigate('/special');
//         }
//     };

//     return (
//         <div className="Loginbg">
//             <div className="wrapper">
//                 <div className="form">
//                     <h1 className="title">Start</h1>
//                     {error && <p className="error-message">{error}</p>}
//                     {loginStatus === 'ok' && <p className="login-message">Login successful! Your job title is {user.jobtitle}</p>}
//                     <div className="inp">
//                         <input
//                             className="input"
//                             placeholder="name@email.com"
//                             value={email}
//                             onChange={handleEmailChange}
//                         />
//                         <i className="fa-solid fa-user"><FontAwesomeIcon icon={faUser} /></i>
//                     </div>
//                     <div className="inp">
//                         <input
//                             type={showPassword ? 'text' : 'password'}
//                             className="input"
//                             placeholder="******"
//                             value={password}
//                             onChange={handlePasswordChange}
//                         />
//                         <span className="toggle-password" onClick={togglePasswordVisibility}>
//                             <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//                         </span>
//                     </div>
//                     <button type="submit" className="submit" onClick={handleLogin}>Login</button>
//                     {showCheckboxes && (
//                         <div className="checkbox-group">
//                             <label>
//                                 <input
//                                     type="checkbox"
//                                     checked={isAdmin}
//                                     onChange={handleAdminChange}
//                                 />
//                                 Login as an administrateur
//                             </label>
//                             <br />
//                             <label>
//                                 <input
//                                     type="checkbox"
//                                     checked={isEmployee}
//                                     onChange={handleEmployeeChange}
//                                 />
//                                 Login as an employee
//                             </label>
//                             <button type="button" className="submit" onClick={handleNavigation}>Proceed</button>
//                         </div>
//                     )}
//                     <p className="footer">
//                         Forget your password? <a href="#" className="link">please, click here</a>
//                     </p>
//                 </div>
//                 <div></div>
//                 <div className="banner">
//                     <h1 className="wel_text">Welcome@</h1><br />
//                     <p className="para">your VISTO platform</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;











import React, { useState, useContext } from 'react';
import './Login5.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../Navbaradmin/logo.png';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Navbaradmin/UserProvider ';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [phone, setPhone] = useState('');
    const [resetKey, setResetKey] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1); // 1: Request Password Reset, 2: Enter Key and New Password

    const { setUser } = useContext(UserContext);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handlePhoneChange = (e) => setPhone(e.target.value);
    const handleResetKeyChange = (e) => setResetKey(e.target.value);
    const handleNewPasswordChange = (e) => setNewPassword(e.target.value);

    const handleLogin = async () => {
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                email,
                password
            });

            const { access_token, jobtitle, fullname, avatar } = response.data;

            localStorage.setItem('token', access_token);
            localStorage.setItem('jobtitle', jobtitle);
            localStorage.setItem('fullname', fullname);

            if (jobtitle === 'administrateur') {
                navigate('/administrateur');
            } else if (jobtitle === 'Team Leader') {
                navigate('/teamleader');
            } else if (jobtitle === 'RH') {
                navigate('/rh');
            } else {
                navigate('/employee');
            }

            setUser({
                email,
                fullname,
                jobtitle,
                avatar,
                isLoggedIn: true
            });

            setLoginStatus('ok');
        } catch (error) {
            setError('wrong password.');
            console.error('Login error:', error);
        }
    };

    const handleRequestPasswordReset = async () => {
        try {
            await axios.post('http://localhost:5000/auth/request-password-reset', { email });
            setStep(2);
        } catch (error) {
            setError('Error sending password reset request.');
            console.error('Password reset request error:', error);
        }
    };

    const handleResetPassword = async () => {
        try {
            await axios.post('http://localhost:5000/auth/reset-password', {
                token: resetKey,
                newPassword
            });
            setStep(1);
            setIsForgotPassword(false);
        } catch (error) {
            setError('Error resetting password.');
            console.error('Password reset error:', error);
        }
    };

    return (
        <div className="login-container">
            <img src={Logo} alt="Logo4" className="logo4" />
            <div className="login-form-container">
                <div className="login-form">
                    <h2>Welcome Back !</h2>
                    <p>Sign in to continue to Visto platform.</p>
                    {!isForgotPassword ? (
                        <form>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    className="input"
                                    placeholder="name@email.com"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div className="form-group password-group">
                                <label htmlFor="password">Password</label>
                                <div className='input-with-icon'>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="input password-input"
                                        placeholder="******"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    <span className="toggle-password" onClick={togglePasswordVisibility}>
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </span>
                                </div>
                            </div>
                            <button type="button" className="btn" onClick={handleLogin}>Sign In</button>
                        </form>
                    ) : (
                        <form>
                            {step === 1 && (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            className="input"
                                            placeholder="name@email.com"
                                            value={email}
                                            onChange={handleEmailChange}
                                        />
                                    </div>
                                    <button type="button" className="btn" onClick={handleRequestPasswordReset}>Send Key</button>
                                </>
                            )}
                            {step === 2 && (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="resetKey">Key</label>
                                        <input
                                            className="input"
                                            placeholder="Enter your key"
                                            value={resetKey}
                                            onChange={handleResetKeyChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="newPassword">New Password</label>
                                        <input
                                            type="password"
                                            className="input"
                                            placeholder="Enter new password"
                                            value={newPassword}
                                            onChange={handleNewPasswordChange}
                                        />
                                    </div>
                                    <button type="button" className="btn" onClick={handleResetPassword}>Restart Password</button>
                                </>
                            )}
                        </form>
                    )}
                    <div className="form-group remember-me">
                        <p className="footer">
                            {isForgotPassword ? (
                                <a href="#" className="link" onClick={() => { setStep(1); setIsForgotPassword(false); }}>Back to login</a>
                            ) : (
                                <a href="#" className="link" onClick={() => setIsForgotPassword(true)}>Forget your password? please, click here</a>
                            )}
                        </p>
                    </div>
                </div>
                <div className="login-image">
                    <div className="login-image-content">
                        {/* Additional Content */}
                    </div>
                </div>
            </div>
            <footer>
                <p>© 2024 Visto. Crafted with <span>❤️</span> by Laajili Oussama</p>
            </footer>
        </div>
    );
};

export default Login;



