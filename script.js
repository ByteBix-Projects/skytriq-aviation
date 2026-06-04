document.addEventListener('DOMContentLoaded', () => {

  // --- 1. HEADER SCROLL EFFECT ---
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- 2. MOBILE MENU TOGGLE ---
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      // Toggle animation of hamburger lines (can be styled via CSS if needed)
      const spans = menuToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // --- 3. ACTIVE NAVIGATION LINK ON SCROLL ---
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies the mid part of screen
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    if (section.getAttribute('id')) {
      observer.observe(section);
    }
  });

  // --- 4. DYNAMIC COURSE MODAL DATA ---
  const courseDetails = {
    pilot: {
      title: "Pilot Foundation / Ground School Preparation",
      badge: "Commercial & Private Pilot preparatory",
      desc: "Lay the solid foundation required to pass the Directorate General of Civil Aviation (DGCA) license theory exams. Our ground preparation provides premium, expert-led training in navigation, meteorology, air regulations, and aircraft technical general.",
      topics: [
        "Air Navigation: Maps, charts, plotting, flight instruments, and flight planning.",
        "Aviation Meteorology: Weather patterns, coding (METAR/TAF), pressure systems, and flight safety hazards.",
        "Air Regulations: Rules of the air, civil aviation requirements, airspace classes, and international conventions.",
        "Technical General & Specific: Engine mechanics, electrical systems, airframes, and instruments.",
        "Radio Telephony (RTR-A): Operational communications, phraseology, and WPC licensing guidelines."
      ],
      prerequisites: "10+2 passed (or appearing) with Physics and Mathematics. Minimum age: 16 years. Sound physical health."
    },
    cabin: {
      title: "Cabin Crew Training",
      badge: "Aviation hospitality & safety",
      desc: "Designed specifically to transform aspirants into polished, confident, and professional cabin crew members. We focus heavily on critical flight safety standards, passenger service excellence, grooming, and effective communication skills.",
      topics: [
        "Aviation Grooming & Etiquette: Skin care, hair styling, uniform standards, posture, and poise.",
        "Cabin Safety & Emergency Procedures: Evacuation protocols, decompression, ditching, and fire-fighting.",
        "First Aid & Flight Medical Emergencies: CPR, handling inflight illnesses, and first-aid kit operations.",
        "Food & Beverage Service: Premium service styles, galley management, and passenger hospitality.",
        "Inflight Communication: Announcements, passenger conflict resolution, and teamwork dynamics."
      ],
      prerequisites: "10+2 passed (any stream). Age: 18 - 26 years. Minimum height: Females 155 cm, Males 170 cm. Fluent in English and Hindi."
    },
    ground: {
      title: "Airport Ground Staff Training",
      badge: "Airport operations & customer relations",
      desc: "Airports are bustling hubs requiring exceptional organizational and customer service skills. This course equips students for diverse terminal and ramp roles, handling operations from check-in desks to baggage grids and safety cordons.",
      topics: [
        "Passenger Handling & Boarding Gate Operations: Ticketing checks, boarding procedures, and customer assistance.",
        "Familiarization with CRS (Computer Reservation Systems): Hands-on with industry ticketing interfaces.",
        "Ramp Operations & Safety Management: Aircraft marshalling, turnaround procedures, and ground equipment safety.",
        "Airport Security, Customs & Dangerous Goods Regulations (DGR): Compliance standards.",
        "Baggage Handling & Cargo Operations: Tagging systems, reconciliation, and load control basics."
      ],
      prerequisites: "10+2 passed or Graduation in any stream. Good communication and interpersonal skills."
    },
    interview: {
      title: "Aviation Interview Preparation",
      badge: "Intense placement training",
      desc: "Airlines have highly competitive selection boards. This short, intense preparation module is structured to help you face panels with poise, confidence, and highly developed answers that highlight your employability.",
      topics: [
        "Professional CV & Resume Writing: Tailoring applications for major domestic and international airlines.",
        "Personality Development & Body Language: Eye contact, hand gestures, and professional stance.",
        "Group Discussion (GD) Masterclass: Modern GD topics, strategies, and mock rounds with live feedback.",
        "Personal Interview (PI) Drills: Over 100+ standard HR and technical questions simulated.",
        "Stress Interview Mockups: Learning to stay calm under challenging panel queries."
      ],
      prerequisites: "Open to all aviation aspirants, students post 10+2, or graduates looking for active career placement."
    },
    counseling: {
      title: "Career Counseling & Admission Guidance",
      badge: "One-on-one strategic mapping",
      desc: "Aviation careers can be complex and expensive. We provide dedicated, transparent guidance sessions for students and parents to map out a reliable, cost-effective route to commercial flying, cabin crew contracts, or ground positions.",
      topics: [
        "Step-by-step Cadet Pilot Program guidance (evaluating Indigo, SpiceJet, Air India, and private cadet structures).",
        "Flight training options in India vs. Overseas (US, South Africa, New Zealand, Canada) and conversion processes.",
        "Detailed financial costing and budget mapping to avoid hidden fees or delayed licenses.",
        "Direct admission guidance for certified flight academy selections and preparation."
      ],
      prerequisites: "Highly recommended for 10th/12th students, graduates, and parents looking for genuine, expert guidance."
    }
  };

  const modal = document.getElementById('courseModal');
  const modalClose = document.getElementById('modalClose');
  const modalOverlay = document.getElementById('modalOverlay');

  if (modal && modalClose && modalOverlay) {
    // Open modal handlers
    document.querySelectorAll('.course-more-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.currentTarget.closest('.course-card');
        const courseId = card.getAttribute('data-course');
        const data = courseDetails[courseId];

        if (data) {
          // Inject content
          document.getElementById('modalBadge').textContent = data.badge;
          document.getElementById('modalTitle').textContent = data.title;
          document.getElementById('modalDesc').textContent = data.desc;
          
          // Inject topics list
          const list = document.getElementById('modalTopics');
          list.innerHTML = '';
          data.topics.forEach(topic => {
            const li = document.createElement('li');
            li.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              <span>${topic}</span>
            `;
            list.appendChild(li);
          });

          // Inject prerequisites
          document.getElementById('modalPrereqs').textContent = data.prerequisites;

          // Show modal
          modal.classList.add('active');
          document.body.style.overflow = 'hidden'; // Stop background scrolling
        }
      });
    });

    // Close modal function
    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto'; // Restore background scrolling
    };

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // --- 5. LEAD FORM CAPTURE & VALIDATION ---
  const leadForm = document.getElementById('leadForm');
  const formMessage = document.getElementById('formMessage');

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get values
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const course = document.getElementById('courseSelect').value;
      const qualification = document.getElementById('qualificationSelect').value;
      const message = document.getElementById('message').value.trim();

      // Simple Client Side Validation
      if (!name || !phone || !email || !course || !qualification) {
        showFeedback("Please fill in all required fields marked with *", "error");
        return;
      }

      // Validate phone number (simple 10-digit check for India format)
      const phoneClean = phone.replace(/[^0-9]/g, '');
      if (phoneClean.length < 10) {
        showFeedback("Please enter a valid 10-digit mobile number.", "error");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFeedback("Please enter a valid email address.", "error");
        return;
      }

      // Successful Lead Simulation
      // Log lead details (simulated API submit)
      console.log("--- New Lead Captured ---");
      console.log(`Name: ${name}`);
      console.log(`Phone: ${phone}`);
      console.log(`Email: ${email}`);
      console.log(`Course Interest: ${course}`);
      console.log(`Qualification: ${qualification}`);
      console.log(`Message: ${message}`);
      
      // Store in localStorage for demonstration
      const leads = JSON.parse(localStorage.getItem('skytriq_leads') || '[]');
      leads.push({ name, phone, email, course, qualification, message, date: new Date().toISOString() });
      localStorage.setItem('skytriq_leads', JSON.stringify(leads));

      // Show beautiful success
      showFeedback(`Thank you, ${name}! Your counseling booking has been received. Our admission counselors will contact you on ${phone} shortly.`, "success");
      
      // Reset form
      leadForm.reset();
    });
  }

  function showFeedback(text, type) {
    if (!formMessage) return;
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    
    // Auto-scroll to message slightly if form is long
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // For error messages, clear after 5 seconds. Success stays.
    if (type === 'error') {
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    }
  }

  // --- 6. CTA SMOOTH ANCHORING FOR MOBILES ---
  // Allow Book Counseling sticky action button to navigate directly to form
  const stickyCounselingBtn = document.getElementById('stickyCounselingBtn');
  if (stickyCounselingBtn) {
    stickyCounselingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('lead-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
