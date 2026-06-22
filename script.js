document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Mobile Menu Navigation Toggle
    // ==========================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Toggle hamburger icon between bars and X
            const icon = mobileToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });
    }

    // ==========================================
    // 2. Active Link Highlight on Scroll
    // ==========================================
    const sections = document.querySelectorAll('section');
    
    const navObserverOptions = {
        root: null,
        threshold: 0.25, // Trigger when 25% of the section is visible
        rootMargin: "-80px 0px 0px 0px" // Account for navbar height
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // ==========================================
    // 3. Navbar Shadow on Scroll
    // ==========================================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scroll-shadow');
        } else {
            navbar.classList.remove('scroll-shadow');
        }
    });

    // ==========================================
    // 4. Interactive Skills Radar Chart (Chart.js)
    // ==========================================
    const skillsCtx = document.getElementById('skillsRadarChart');
    if (skillsCtx) {
        new Chart(skillsCtx, {
            type: 'radar',
            data: {
                labels: ['SQL / PostgreSQL', 'MS Excel', 'Power BI', 'Python', 'Pandas & NumPy', 'Data Scraping', 'Prompt Engineering', 'GitHub'],
                datasets: [{
                    label: 'Proficiency Score (Out of 100)',
                    data: [85, 90, 80, 75, 70, 75, 80, 70],
                    backgroundColor: 'rgba(6, 182, 212, 0.2)', // Light Cyan
                    borderColor: 'rgba(6, 182, 212, 1)',      // Vibrant Cyan
                    pointBackgroundColor: 'rgba(2, 132, 199, 1)', // Dark Blue Accent
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(6, 182, 212, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}/100`;
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(148, 163, 184, 0.2)' // Slate 400
                        },
                        grid: {
                            color: 'rgba(148, 163, 184, 0.2)'
                        },
                        pointLabels: {
                            font: {
                                family: 'Plus Jakarta Sans',
                                size: 11,
                                weight: '600'
                            },
                            color: '#1e293b' // Slate 800
                        },
                        ticks: {
                            stepSize: 20,
                            display: false
                        },
                        suggestedMin: 30,
                        suggestedMax: 100
                    }
                }
            }
        });
    }

    // ==========================================
    // 5. Interactive Project Metrics Bar Chart (Chart.js)
    // ==========================================
    const metricsCtx = document.getElementById('projectMetricsChart');
    if (metricsCtx) {
        new Chart(metricsCtx, {
            type: 'bar',
            data: {
                labels: ['Records Analyzed', 'Accuracy Rate (%)', 'Dynamic Indicators / KPIs'],
                datasets: [
                    {
                        label: 'HR Analytics (Power BI)',
                        data: [1000, 100, 8],
                        backgroundColor: 'rgba(2, 132, 199, 0.85)', // Sky Blue
                        borderColor: 'rgba(2, 132, 199, 1)',
                        borderWidth: 1,
                        borderRadius: 4
                    },
                    {
                        label: 'Cricket Performance (Excel)',
                        data: [350, 98, 12],
                        backgroundColor: 'rgba(6, 182, 212, 0.85)', // Teal/Cyan
                        borderColor: 'rgba(6, 182, 212, 1)',
                        borderWidth: 1,
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                family: 'Plus Jakarta Sans',
                                size: 11,
                                weight: '600'
                            },
                            color: '#475569'
                        }
                    }
                },
                scales: {
                    y: {
                        type: 'logarithmic', // Use log scale since records is 1000 and metrics is 8
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)'
                        },
                        ticks: {
                            color: '#94a3b8',
                            callback: function(value) {
                                // Clean up logarithmic tick labels to look nice
                                if (value === 10 || value === 100 || value === 1000) {
                                    return value;
                                }
                                return null;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: 'Plus Jakarta Sans',
                                weight: '600'
                            },
                            color: '#1e293b'
                        }
                    }
                }
            }
        });
    }

    // ==========================================
    // 6. Projects Filtering Tab Controls
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to selected button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    // Subtle fade-in animation
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transition = 'opacity var(--transition-normal)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ==========================================
    // 7. Contact Form Simulation & Success Modal
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (contactForm && successModal && closeModalBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop page reload
            
            // Validate that values exist (basic browser check is active, but we ensure values are filled)
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            if (name && email) {
                // Show modal
                successModal.classList.add('active');
                
                // Reset form inputs
                contactForm.reset();
            }
        });

        // Close modal event
        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });

        // Close modal when clicking outside the box
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }
});
