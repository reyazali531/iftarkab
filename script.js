// Ramadan Calendar Data (Srinagar times)
const srinagarRamadanData = [
    { day: 1, date: "02 March 2025", sehr: "05:37 AM", iftar: "06:31 PM" },
    { day: 2, date: "03 March 2025", sehr: "05:36 AM", iftar: "06:32 PM" },
    { day: 3, date: "04 March 2025", sehr: "05:34 AM", iftar: "06:33 PM" },
    { day: 4, date: "05 March 2025", sehr: "05:33 AM", iftar: "06:33 PM" },
    { day: 5, date: "06 March 2025", sehr: "05:31 AM", iftar: "06:34 PM" },
    { day: 6, date: "07 March 2025", sehr: "05:30 AM", iftar: "06:34 PM" },
    { day: 7, date: "08 March 2025", sehr: "05:28 AM", iftar: "06:35 PM" },
    { day: 8, date: "09 March 2025", sehr: "05:27 AM", iftar: "06:36 PM" },
    { day: 9, date: "10 March 2025", sehr: "05:26 AM", iftar: "06:37 PM" },
    { day: 10, date: "11 March 2025", sehr: "05:25 AM", iftar: "06:38 PM" },
    { day: 11, date: "12 March 2025", sehr: "05:24 AM", iftar: "06:38 PM" },
    { day: 12, date: "13 March 2025", sehr: "05:23 AM", iftar: "06:39 PM" },
    { day: 13, date: "14 March 2025", sehr: "05:20 AM", iftar: "06:40 PM" },
    { day: 14, date: "15 March 2025", sehr: "05:19 AM", iftar: "06:41 PM" },
    { day: 15, date: "16 March 2025", sehr: "05:18 AM", iftar: "06:42 PM" },
    { day: 16, date: "17 March 2025", sehr: "05:16 AM", iftar: "06:42 PM" },
    { day: 17, date: "18 March 2025", sehr: "05:15 AM", iftar: "06:43 PM" },
    { day: 18, date: "19 March 2025", sehr: "05:14 AM", iftar: "06:44 PM" },
    { day: 19, date: "20 March 2025", sehr: "05:12 AM", iftar: "06:45 PM" },
    { day: 20, date: "21 March 2025", sehr: "05:11 AM", iftar: "06:46 PM" },
    { day: 21, date: "22 March 2025", sehr: "05:10 AM", iftar: "06:47 PM" },
    { day: 22, date: "23 March 2025", sehr: "05:08 AM", iftar: "06:48 PM" },
    { day: 23, date: "24 March 2025", sehr: "05:06 AM", iftar: "06:48 PM" },
    { day: 24, date: "25 March 2025", sehr: "05:05 AM", iftar: "06:49 PM" },
    { day: 25, date: "26 March 2025", sehr: "05:04 AM", iftar: "06:50 PM" },
    { day: 26, date: "27 March 2025", sehr: "05:02 AM", iftar: "06:50 PM" },
    { day: 27, date: "28 March 2025", sehr: "05:00 AM", iftar: "06:51 PM" },
    { day: 28, date: "29 March 2025", sehr: "04:58 AM", iftar: "06:52 PM" },
    { day: 29, date: "30 March 2025", sehr: "04:56 AM", iftar: "06:53 PM" },
    { day: 30, date: "31 March 2025", sehr: "04:56 AM", iftar: "06:54 PM" }
    
];

// Convert 12-hour time format to Date object
function parseTimeStringToDate(timeStr, dateStr) {
    const [timePart, period] = timeStr.split(' ');
    const [hours, minutes] = timePart.split(':').map(Number);
    
    // Convert to 24-hour format
    let hour24 = hours;
    if (period === 'PM' && hours !== 12) hour24 += 12;
    if (period === 'AM' && hours === 12) hour24 = 0;
    
    // Parse the date string
    const [day, month, year] = dateStr.split(' ');
    const monthMap = {
        'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
        'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    
    // Create date object
    const date = new Date(parseInt(year), monthMap[month], parseInt(day));
    date.setHours(hour24, minutes, 0, 0);
    
    return date;
}

// Add minutes to a time string (12-hour format: "05:34 AM")
function addMinutesToTimeString(timeStr, minutesToAdd) {
    const [timePart, period] = timeStr.split(' ');
    const [hours, minutes] = timePart.split(':').map(Number);
    
    // Convert to 24-hour format for calculations
    let hour24 = hours;
    if (period === 'PM' && hours !== 12) hour24 += 12;
    if (period === 'AM' && hours === 12) hour24 = 0;
    
    // Create a date object to handle time arithmetic
    const date = new Date();
    date.setHours(hour24, minutes, 0, 0);
    
    // Add the minutes
    date.setMinutes(date.getMinutes() + minutesToAdd);
    
    // Convert back to 12-hour format
    let newHour = date.getHours();
    const newPeriod = newHour >= 12 ? 'PM' : 'AM';
    newHour = newHour % 12 || 12; // Convert 0 to 12
    const newMinutes = date.getMinutes();
    
    return `${newHour}:${newMinutes.toString().padStart(2, '0')} ${newPeriod}`;
}

// Calculate Baramulla timings by adding 1 minute to Srinagar timings
function calculateBaramullaTimings(sehrTime, iftarTime) {
    return {
        sehr: addMinutesToTimeString(sehrTime, 1),
        iftar: addMinutesToTimeString(iftarTime, 1)
    };
}

// Format a date object as "DD Month YYYY" (e.g., "02 March 2025")
function formatDateString(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
}

// Get current Ramadan day based on current date
function getCurrentRamadanDay() {
    const today = new Date();
    const ramadanStart = new Date(2025, 2, 2); // March 2, 2025 (months are 0-indexed)
    
    // Calculate days since Ramadan start
    const timeDiff = today - ramadanStart;
    let dayNumber = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
    
    // Ensure day is within Ramadan (1-30)
    if (dayNumber < 1) dayNumber = 1;
    if (dayNumber > 30) dayNumber = 30;
    
    return dayNumber;
}

// Calculate time remaining and update the countdown display
function updateCountdown(elementId, targetTime) {
    const now = new Date();
    const timeRemaining = targetTime - now;
    
    if (timeRemaining <= 0) {
        // If the target time has passed today, set it for tomorrow
        targetTime.setDate(targetTime.getDate() + 1);
        updateCountdown(elementId, targetTime); // Recursive call with updated target
        return;
    }
    
    // Calculate hours, minutes, seconds
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    // Update the display
    document.getElementById(`${elementId}-hours`).textContent = hours.toString().padStart(2, '0');
    document.getElementById(`${elementId}-minutes`).textContent = minutes.toString().padStart(2, '0');
    document.getElementById(`${elementId}-seconds`).textContent = seconds.toString().padStart(2, '0');
}

// Populate the calendar table with Baramulla timings
function populateCalendarTable() {
    const calendarBody = document.getElementById('calendar-body');
    calendarBody.innerHTML = ''; // Clear existing content
    
    const currentDay = getCurrentRamadanDay();
    
    srinagarRamadanData.forEach(dayData => {
        // Calculate Baramulla timings
        const baramullaTimings = calculateBaramullaTimings(dayData.sehr, dayData.iftar);
        
        // Create a new row
        const row = document.createElement('tr');
        if (dayData.day === currentDay) {
            row.classList.add('current-day');
        }
        
        // Populate the row
        row.innerHTML = `
            <td>${dayData.day}</td>
            <td>${dayData.date}</td>
            <td>${baramullaTimings.sehr}</td>
            <td>${baramullaTimings.iftar}</td>
        `;
        
        calendarBody.appendChild(row);
    });
}

// Initialize the page with current data
function initializePage() {
    // Get current Ramadan day
    const currentDay = getCurrentRamadanDay();
    
    // Find current day's data
    const todayData = srinagarRamadanData.find(data => data.day === currentDay);
    if (!todayData) {
        console.error("Could not find data for current Ramadan day:", currentDay);
        return;
    }
    
    // Calculate Baramulla timings
    const baramullaTimings = calculateBaramullaTimings(todayData.sehr, todayData.iftar);
    
    // Update display with current date info
    const now = new Date();
    document.getElementById('gregorian-date').textContent = now.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    document.getElementById('islamic-date').textContent = `${currentDay} Ramadan 1446`;
    document.getElementById('day-number').textContent = `Day ${currentDay} of Ramadan`;
    
    // Update times display
    document.getElementById('sehri-time').textContent = baramullaTimings.sehr;
    document.getElementById('iftar-time').textContent = baramullaTimings.iftar;
    
    // Set up countdown timers
    const today = formatDateString(now);
    const sehriDate = parseTimeStringToDate(baramullaTimings.sehr, today);
    const iftarDate = parseTimeStringToDate(baramullaTimings.iftar, today);
    
    // Initial countdown update
    updateCountdown('sehri', sehriDate);
    updateCountdown('iftar', iftarDate);
    
    // Set interval for countdown updates
    setInterval(() => {
        updateCountdown('sehri', sehriDate);
        updateCountdown('iftar', iftarDate);
    }, 1000);
    
    // Populate calendar
    populateCalendarTable();
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePage);
