// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Particles from 'react-particles';
// import { loadSlim } from 'tsparticles-slim';
// import './Login.css';
// import Switch from './Switch';

// export default function Loginspec() {
//     const navigate = useNavigate();

//     const particlesInit = async (engine) => {
//         console.log('Particles engine initialized:', engine);
//         await loadSlim(engine);
//     };

//     const particlesLoaded = async (container) => {
//         console.log('Particles container loaded:', container);
//     };

//     const handleLogout = () => {
//         // Clear the token from local storage
//         localStorage.removeItem('token');
        
//         // Navigate to the root route
//         navigate('/');
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
//             <section className="login-section1">
//                 <div className="card1">
//                     <div className="container1">
//                         <h1>Login as a manager or as an employee</h1>
//                         <div className="options">
//                             <h1 className='op1'>Manager</h1>
//                             <h1 className='op2'>Employee</h1>
//                         </div>
//                         <div className="switch-container1">
//                             <Switch />
//                         </div>
//                         <button className="login-btn1" onClick={handleLogout}>Login</button>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }




import React from 'react';
import { useNavigate } from 'react-router-dom';

import Switch from './Switch';

export default function Loginspec() {
    const navigate = useNavigate();

   

    
    const handleLogout = () => {
        // Clear the token from local storage
        localStorage.removeItem('token');
        
        // Navigate to the root route
        navigate('/');
    };

    return (
        <div className="login-container">
           
            <section className="login-section1">
                <div className="card1">
                    <div className="container1">
                        
                        <button className="login-btn1" onClick={handleLogout}>Login</button>
                    </div>
                </div>
            </section>
        </div>
    );
}
