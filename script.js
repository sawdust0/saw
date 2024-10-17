document.addEventListener('DOMContentLoaded', function() {
    // Chart.js implementation
    const ctx = document.getElementById('registrationsChart').getContext('2d');
    let chart;

    function updateChart() {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        const textColor = isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
        const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Registrations',
                    data: [650, 700, 750, 600, 250, 750, 600, 150, 550, 375, 750, 600],
                    backgroundColor: 'rgba(88, 101, 242, 0.8)',
                    borderColor: 'rgba(88, 101, 242, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: gridColor
                        },
                        ticks: {
                            color: textColor
                        }
                    },
                    x: {
                        grid: {
                            color: gridColor
                        },
                        ticks: {
                            color: textColor
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    updateChart();

    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;

    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
        updateChart();
    });

    // Check for saved theme preference or use default dark theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    darkModeToggle.checked = savedTheme === 'dark';
    updateChart();

    // Sidebar toggle functionality
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
    });

    // News slider functionality
    const newsSlider = document.querySelector('.news-slider');
    const prevBtn = newsSlider.querySelector('.prev-btn');
    const nextBtn = newsSlider.querySelector('.next-btn');
    const newsContent = newsSlider.querySelector('.news-content');
    let currentSlide = 0;
    const totalSlides = 3; // Varsayılan olarak 3 slayt

    const newsData = [
        {
            title: "Latest News & Updates",
            content: "Turpis interdum nunc varius ornare dignissim pretium. Massa ornare quis aliquet sed vitae. Sed velit nisi, fermentum erat. Fringilla purus, erat magna id tincidunt quisque non. Pellentesque in ut tellus.",
            image: "/news_1.jpg"
        },
        {
            title: "Upcoming Events",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.",
            image: "/news_1.jpg"
        },
        {
            title: "New Features Announcement",
            content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.",
            image: "/news_1.jpg"
        }
    ];

    function updateSlider() {
        const slide = newsData[currentSlide];
        newsContent.innerHTML = `
            <img src="${slide.image}" alt="News Image" class="news-image">
            <div class="news-text-container">
                <h3>${slide.title}</h3>
                <p class="news-text">${slide.content}</p>
                <div class="slider-indicators">
                    ${Array(totalSlides).fill().map((_, i) => 
                        `<div class="indicator ${i === currentSlide ? 'active' : ''}"></div>`
                    ).join('')}
                </div>
            </div>
        `;
        setupIndicators();
    }

    function setupIndicators() {
        const indicators = newsContent.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    });

    // Auto-slide functionality
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 5000);

    updateSlider(); // Initialize the slider

    // Modal functionality
    function openModal(eventName, eventDate, eventDescription, speakers, attendees) {
        const modal = document.getElementById('infoModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalDate = document.getElementById('modalDate');
        const modalDescription = document.getElementById('modalDescription');
        const modalSpeakers = document.getElementById('modalSpeakers');
        const modalAttendees = document.getElementById('modalAttendees');
        const speakerAvatars = document.querySelector('.speaker-avatars');

        modalTitle.textContent = eventName;
        modalDate.textContent = eventDate;
        modalDescription.textContent = eventDescription;
        
        // Konuşmacı avatarlarını oluştur
        speakerAvatars.innerHTML = speakers.map(() => 
            '<div class="speaker-avatar"></div>'
        ).join('');
        
        modalSpeakers.textContent = `${speakers.length} Guest Speakers: ${speakers.join(', ')}`;
        modalAttendees.textContent = `${attendees} Attendees`;

        modal.style.display = 'block';
    }

    // Event listener'ları güncelleyelim
    document.querySelectorAll('.events-table .event-name').forEach(eventName => {
      eventName.addEventListener('click', function() {
        const row = this.closest('tr');
        const eventName = this.textContent;
        const eventDate = row.cells[1].textContent;
        const eventSpeaker = row.cells[2].textContent;
        const eventStatus = row.cells[3].textContent;
        
        // Bu bilgileri gerçek verilerle değiştirin
        const eventDescription = "Event Description goes here.";
        const speakers = [eventSpeaker, "Speaker B", "Speaker C"];
        const attendees = 300;
        
        openModal(eventName, eventDate, eventDescription, speakers, attendees);
      });
    });

    // Modal kapatma işlevselliği
    const closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.onclick = function() {
        document.getElementById('infoModal').style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == document.getElementById('infoModal')) {
            document.getElementById('infoModal').style.display = 'none';
        }
    }

    // Mevcut icon-info event listener'ını güncelleyin
    document.querySelectorAll('.icon-info').forEach(icon => {
        icon.addEventListener('click', function(event) {
            event.stopPropagation(); // Tıklamanın üst elementlere yayılmasını engelle
            const statTitle = this.parentElement.textContent.trim();
            const statValue = this.parentElement.nextElementSibling.textContent;
            openModal(statTitle, `Current value: ${statValue}`);
        });
    });

    // Add functionality to filter and sort buttons
    document.querySelectorAll('.filter-buttons button, .sort-export button').forEach(button => {
        button.addEventListener('click', function() {
            alert(`${this.textContent.trim()} functionality to be implemented`);
        });
    });

    // Add functionality to search input
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', function() {
        console.log(`Searching for: ${this.value}`);
        // Implement search functionality here
    });

    // Add functionality to export button
    const exportBtn = document.querySelector('.export-btn');
    exportBtn.addEventListener('click', function() {
        alert('Export functionality to be implemented');
    });

    // Add click event listeners to table rows for modal
    document.querySelectorAll('.events-table tbody tr').forEach(row => {
        row.addEventListener('click', function() {
            const eventName = this.cells[0].textContent;
            const eventDate = this.cells[1].textContent;
            const eventSpeaker = this.cells[2].textContent;
            const eventStatus = this.cells[3].textContent;
            
            openModal(eventName, eventDate, eventDescription, speakers, attendees);
        });
    });

    // Sayfalama butonları için işlevsellik
    const pageButtons = document.querySelectorAll('.page-btn');
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled && !this.classList.contains('active')) {
                document.querySelector('.page-btn.active').classList.remove('active');
                this.classList.add('active');
                // Burada sayfa değiştirme mantığını uygulayabilirsiniz
                console.log('Sayfa değiştirildi:', this.textContent);
            }
        });
    });

    // Satır sayısı seçimi için işlevsellik
    const rowsPerPageSelect = document.getElementById('rowsPerPage');
    rowsPerPageSelect.addEventListener('change', function() {
        console.log('Sayfa başına satır sayısı deği��tirildi:', this.value);
        // Burada tabloyu güncelleme mantığını uygulayabilirsiniz
    });

    // Modal butonları için işlevsellik
    document.querySelector('.edit-btn').addEventListener('click', () => {
        console.log('Edit button clicked');
    });

    document.querySelector('.delete-btn').addEventListener('click', () => {
        console.log('Delete button clicked');
    });

    document.querySelector('.complete-btn').addEventListener('click', () => {
        console.log('Mark as completed button clicked');
    });
});
