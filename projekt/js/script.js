console.clear();

const app = (() => {
  let body;
  let menu;
  let menuItems;

  const init = () => {
    body = document.querySelector('body');
    menu = document.querySelector('.menu-icon');
    menuItems = document.querySelectorAll('.nav__list-item');

    applyListeners();
  };

  const applyListeners = () => {
    menu.addEventListener('click', () => toggleClass(body, 'nav-active'));
  };

  const toggleClass = (element, stringClass) => {
    if (element.classList.contains(stringClass))
    element.classList.remove(stringClass);else

    element.classList.add(stringClass);
  };

  init();
})();

particlesJS("particles-js", {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 400 } },
    color: { value: ["#E1E1E1","#FFFFFF","#D6D6D6","#C0C0C0","#A1A1A1"]},
    shape: {
      type: "circle",
      stroke: { width: 1, color: "#411919" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 }
    },
    opacity: {
      value: 1.7575817359669818,
      random: true,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 3.51164387345227,
      random: true,
      anim: { enable: true, speed: 20, size_min: 0.1, sync: false }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: {value: ["#411919","#4C1717","#371A1A","#461818",]},
      opacity: 0.015,
      width: 3.687847739990702
    },
    move: {
      enable: true,
      speed: 1.603412060865523,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "bubble" },
      onclick: { enable: true, mode: "repulse" },
      resize: true
    },
    modes: {
      grab: { distance: 0, line_linked: { opacity: 0 } },
      bubble: {
        distance: 227.77222777222775,
        size: 5.984015984015985,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});

