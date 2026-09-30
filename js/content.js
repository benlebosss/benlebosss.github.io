/* =====================================================================
   CONTENT — every text, link and image of the portfolio lives here.

   Photos live in /assets (names used below). "cover" is the image of the
   tile in the grids; "media" are the images of the project window.
   If a file is missing, a drawn illustration is shown instead.
   ===================================================================== */
window.PORTFOLIO = {
  links: {
    linkedin: 'https://www.linkedin.com/in/benoit-quaranta/',
    github: 'https://github.com/benlebosss',
    email: 'mailto:benoit.quaranta@edu.ece.fr',
    phone: 'tel:+33640683260',
  },

  notes: {
    home: `
      <div class="label">Title</div>
      <h2>How to use this website ? 😊</h2>
      <p>Good morning everyone and Welcome to my portfolio 😊. This website is a 3D experience and experiment I developed with Three.js, a library that allows me to design 3D scenes and to make animation with it directly in my html page.</p>
      <p>This website is a great way to showcase my work but also to show you different projects I made in the last years and some personal information and experience I like to share.</p>
      <p>I hope you will enjoy your stay in this website. I won't keep you any longer so go have a look 👀</p>`,
    discover: `
      <div class="label">Title</div>
      <h2>🚀 Discover My Projects! 🎨💡</h2>
      <p>Throughout my studies, I've had the chance to work on amazing projects—some personal, others created thanks to my school. From Exchange student experience Vlog to video games, I love exploring new ideas and turning them into real solutions! 💡</p>
      <p>Most of my project are build using coding like C, python or HTML but also using my electronics knowledge like for the standing robot for example.</p>
      <p>I like to use my creativity and my soft skills to support my ideas. 🎨</p>
      <p>👉 Check out my projects and see what I've been working on!</p>`,
  },

  /* Order = order of the "My projects" grid */
  projects: {
    gyrobot: {
      tile: 'gyrobot',
      cover: 'assets/gyrobot-cover.webp',
      mediaTitle: 'GYROBOT',
      title: 'GYROBOT',
      tags: ['Arduino', 'C++', 'PID', 'IMU'],
      live: '',
      media: [
        { flex: 1, items: [{ art: 'gyrobotBlue', img: 'assets/gyrobot-1.png', clear: true }] },
        { flex: 2, items: [{ art: 'gyrobotVideo', img: 'assets/gyrobot-2.jpg' }] },
        { flex: 1, items: [{ art: 'gyrobotOrange', img: 'assets/gyrobot-3.png', clear: true }] },
      ],
      text: `
        <p>For our school project, we developed GYROBOT, a self-balancing robot designed to stay upright and navigate its environment using real-time sensor feedback, motor control, and AI-based stabilization.</p>
        <p><b>Technical Overview:</b></p>
        <p>Self-Balancing System ⚖️: Uses an IMU (Inertial Measurement Unit) to detect tilt and adjust motor speed for balance.<br>
        Arduino UNO 🔌: The core microcontroller that processes sensor data and controls motor output.<br>
        PID Control Algorithm 🧠: Implements a proportional-integral-derivative (PID) system to maintain stability dynamically.<br>
        Motor Control ⚙️: High-precision DC motors with encoders ensure smooth and responsive movements.</p>
        <p>This project provided hands-on experience with control systems, embedded programming, and sensor integration to develop an autonomous, self-balancing robot.<br>
        It was a rewarding challenge combining physics, electronics, and robotics.</p>`,
    },

    devapp: {
      tile: 'devapp',
      cover: 'assets/devapp-2.webp',
      mediaTitle: 'Personal development app',
      title: 'Personal Development App',
      tags: ['React Native', 'UX', 'Gamification', '2025'],
      live: 'https://travel-react-zeno.netlify.app/',
      media: [
        { flex: 1.35, items: [{ html: 'devappScreen', img: 'assets/devapp-1.png' }] },
        { flex: 1, items: [{ html: 'devappCover', img: 'assets/devapp-2.webp' }] },
      ],
      text: `
        <p>We are developing a personal development app designed to turn productivity into an engaging game.<br>
        The goal is simple: fight procrastination by completing tasks and progressing like in an RPG.<br>
        In the app, users select tasks from a mission bank, each with a different value based on its difficulty and impact.</p>
        <p>By completing them, they earn points that improve their stats and virtual character.<br>
        On the other hand, failing to complete tasks results in point loss, adding an extra challenge.<br>
        The app includes a competitive mode where users can add friends and compare their progress.<br>
        Those who consistently reach their goals earn bonuses and can unlock achievements, making the process both motivating and engaging.<br>
        This app combines productivity and gamification to turn time management into a game.</p>`,
    },

    world: {
      tile: 'world',
      cover: 'assets/world-1.webp',
      mediaTitle: 'ECE WORLD',
      title: 'My first project :ECE WORLD',
      tags: ['C', 'Allegro 4', 'Game dev', 'Team of 4'],
      live: '',
      media: [
        { flex: 2.15, items: [{ art: 'worldBig', img: 'assets/world-1.webp', label: 'ECE<br>WORLD', pixel: true }] },
        { flex: 1, items: [
          { art: 'pacman', href: 'pacman.html', play: 'Play Pac-Man' },
          { art: 'jackpot', img: 'assets/world-3.webp', href: 'slots.html', play: 'Play Jackpot' },
        ] },
      ],
      text: `
        <p>We built this video game 🎮 as a team of four using C language and Allegro 4. It's an arcade game inspired by the Pokémon Mystery Dungeon DS template.<br>
        Our goal was to create a game that reflects the ECE Campus in France. 🇫🇷<br>
        Over five weeks, we developed several mini-games and presented the project as our first-year C programming assignment.</p>
        <p><b>🕹️ Gameplay &amp; Features:</b></p>
        <p>A central plaza serves as the main menu, where players can access different mini-games.<br>
        Two-player mode: Compete to score the most points by playing turn-based mini-games on the same computer.<br>
        Various mini-games inspired by real-life events and activities at our school:<br>
        🏓 Pong: Inspired by the ping-pong tables on campus.<br>
        🔫 Shooter Game: Based on a Nerf battle event.<br>
        🎰 Jackpot: A nod to our school's poker club.<br>
        🐍 Snake, Sports Betting Game, and more, all referencing our academic year.<br>
        Everything was developed entirely in C with an Allegro 4 interface. It was our first-ever game, and despite the short timeframe and some technical problems, we're still proud of what we accomplished! 🚀🔥</p>
        <p>👾 Click the arcade screen or the casino above to play my Pac-Man and Jackpot remakes directly in your browser!</p>`,
    },

    hanoi: {
      tile: 'hanoi',
      cover: 'assets/hanoi-tile.webp',
      mediaTitle: 'University trip vlog',
      title: 'University Exchange &nbsp;Trip vlog',
      tags: ['HTML', 'CSS', 'JavaScript', 'Video'],
      live: '', // old site offline — put the link of the new site here
      centered: true,
      media: [
        { flex: 1, items: [{ art: 'knu', img: 'assets/vlog-1.webp', clear: true, grow: 3.2 }, { img: 'assets/vlog-logo.png', clear: true }] },
        { flex: 1.65, items: [{ art: 'vlogKorea', img: 'assets/vlog-2.webp' }] },
      ],
      text: `
        <p>I created this website using HTML, CSS, and JavaScript to share my exchange student experience! 🌟<br>
        The main menu features a background video and<br>lets you explore different destinations with arrows. 🗺️✨<br>
        You can also check out the vlogs I made during my trip!<br>
        One of my favorite parts of the site is the junkbook 📓✨<br>
        a digital scrapbook filled with little treasures I collected during my exchange.<br>
        From cute stickers and tickets 🎟️ to handwritten notes and small sketches ✏️,<br>
        this section is all about the tiny details that made my journey special.<br>
        👉 From Vietnam to China to korea obviously 🇰🇷, Take a look and dive into my adventure! 🚀</p>`,
    },

    trail: {
      tile: 'trail',
      cover: 'assets/trail-tile.webp',
      mediaTitle: 'Nine Peaks Trail',
      title: '🏔️ Nine Peaks Trail 🏃 🏔️ in 30 Days',
      tags: ['Trail', '40 km', '2,500 m D+', 'Daegu'],
      live: 'https://www.utnp.kr/index',
      textSize: 16,
      media: [
        { flex: 1.3, items: [
          { art: 'trail1', img: 'assets/trail-1.jpg', grow: 1.6 },
          { row: [{ art: 'trail2', img: 'assets/trail-2.jpg' }, { art: 'trail3', img: 'assets/trail-3.jpg' }] },
        ] },
        { flex: 1, items: [{ art: 'trail4', img: 'assets/trail-4.jpg' }] },
        { flex: 1, items: [{ art: 'trail5', img: 'assets/trail-5.jpg' }, { art: 'trail6', img: 'assets/trail-6.jpg' }] },
      ],
      text: `
        <p>During my exchange student experience in Daegu (Korea), I took on the challenge of the Nine Peaks Trail – Short 40, a 40 km race with over 2,500 meters of elevation gain, known for its extreme difficulty.<br>
        What makes this achievement even more special is that I became the youngest finisher ever in the history of the competition! 🙌🏅 The most incredible part? I trained for only one month before the race!</p>
        <p>With such a short preparation time, I had to push myself to the limit, focusing on both physical endurance and mental strength to tackle the steep climbs, technical descents, and overall intensity of the course.</p>
        <p>The race took place in South Korea, and after about 8 hours and 30 minutes of effort,<br>
        I finally crossed the finish line. Between breathtaking landscapes and moments of deep exhaustion,<br>
        this trail was an unforgettable experience, proving that with determination and hard work, anything is possible! 🚀🔥</p>`,
    },
  },

  /* Which projects appear on the Home window (2 on top, 2 below) */
  homeTiles: ['world', 'hanoi', 'gyrobot', 'devapp'],

  personal: {
    city: 'Paris',
    name: 'Benoit Quaranta',
    birth: '03/04/2005',
    photo: 'assets/personal.jpg',
    text: `👋 Hello everyone, my name is Benoit Quaranta! I'm a young and ambitious engineering student with a deep passion for sports ⚽, arts 🎨, and design 🏗️. I played football at the university level in South Korea 🇰🇷 and competed at a high level in freestyle scootering 🛴. Always looking for new challenges 💡, I love combining creativity and performance in everything I do! 🚀`,
  },

  career: {
    title: 'Qualifications and Career',
    role: 'Data & AI Engineer',
    intro: "Master's student in Data & AI Engineering at ECE Paris, backed by international R&D experience at Continental South Korea and an academic exchange at Kyungpook National University (KNU). Strong foundation in Machine Learning, Deep Learning (TensorFlow, PyTorch), Data Engineering and IT Project Management.",
    seeking: 'Looking for a 6-month Data & AI Engineering internship starting Jan 2027',
    cv: 'assets/cv-benoit-quaranta.pdf',
    education: [
      { date: '2025 – 2027', title: "Master's Degree in Data & AI Engineering", place: 'Paris - ECE Paris, Engineering School',
        details: ['Minors: Digital Product Design & Defense'] },
      { date: 'Sept 2024 – Dec 2024', title: 'Academic Exchange – Computer Science & AI', place: 'Daegu, South Korea - Kyungpook National University (KNU)',
        details: ['Computer Science & Artificial Intelligence semester abroad'] },
      { date: '2019 – 2022', title: 'French Baccalaureate – Highest Honors', place: "Saint-Germain-en-Laye - Lycée Jeanne d'Albret",
        details: ['Maths, Physics, Engineer Science'] },
    ],
    work: [
      { date: 'April 2026 – August 2026', title: 'Bid Manager Intern', place: 'France - SII Group',
        details: ['Coordinated technical proposals and budget estimates for RFPs in IT and high-tech engineering consulting.', 'Collaborated with technical leads to scope Data/IT engineering resources, pricing models, and project roadmaps.'] },
      { date: 'Sept 2025 – Present', title: 'Project & Sales Manager', place: 'Paris - JEECE (Junior-Enterprise)',
        details: ['Awarded Best Electronic Junior-Enterprise 2025 & Top 20 Overall in France.', 'Led commercial prospecting and technical scoping for engineering and IT client projects across France.', 'Supervised engineering consultants through requirements definition, sprint planning, and quality assurance deployment.'] },
      { date: 'June 2025 – Aug 2025', title: 'Night Manager', place: "Val d'Isère - Le Blizzard & La Mourra (5-Star Luxury Hotels)",
        details: ['Managed autonomous night operations and financial closures for 120+ international luxury hotel guests.'] },
      { date: 'Dec 2024 – Feb 2025', title: 'Engineering & HR Intern', place: 'Seohyeon, South Korea - Continental',
        details: ['Conducted a cross-cultural R&D organizational study on engineer morale ahead of a corporate spin-off; presented directly to the Executive Board and CEO.'] },
    ],
    skills: ['Python', 'C / C++', 'SQL', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'Pandas', 'NumPy', 'MLOps', 'Signal Processing', 'Power BI', 'Tableau', 'Docker', 'Git', 'Linux', 'CI/CD'],
    awards: ['🥈 2nd Place – EPIAGEN AI Hackathon', '🏔️ Youngest Finisher – Nine Peaks Trail Run', '🇬🇧 TOEIC C1 (975/990)', '🐍 Python for Data Scientists', '📊 Data Analysis Level 2 (Techaway)'],
  },

  contact: {
    title: 'Still have a question?',
    text: 'Feel free to reach out for any questions you might have!',
  },
};
