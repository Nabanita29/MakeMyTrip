document.addEventListener('DOMContentLoaded', () => {
    // Handle form submission
    const form = document.getElementById('tripForm');
    const calendarView = document.getElementById('calendarView'); // Get the calendar view element

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const formData = new FormData(form);
        const data = {
            location: formData.get('location'),
            days: formData.get('days'),
            budget: formData.get('budget'),
            interests: Array.from(formData.getAll('interests')) // Get all selected interests
        };

        // Send the data to the server
        const response = await fetch('/plan-trip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log(result);

        // Show the calendar view
        calendarView.style.display = 'block'; // Display the calendar view
        // Populate the calendar with the number of days
        populateCalendar(data.days);
    });

    // Populate the calendar cells with day numbers
    function populateCalendar(days) {
        const calendarBody = document.querySelector('.calendar-body');
        calendarBody.innerHTML = ''; // Clear previous entries

        for (let i = 1; i <= days; i++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'day-cell';
            dayCell.textContent = `Day ${i}`; // Label the day cell
            calendarBody.appendChild(dayCell);
        }
    }

    // Example of setting up a calendar for drag-and-drop (placeholder code)
    const dayCells = document.querySelectorAll('.day-cell');
    let draggedItem = null;

    // Add event listeners for drag and drop
    dayCells.forEach(cell => {
        cell.addEventListener('dragstart', (e) => {
            draggedItem = cell;
            setTimeout(() => {
                cell.classList.add('dragging');
            }, 0);
        });

        cell.addEventListener('dragend', () => {
            draggedItem = null;
            setTimeout(() => {
                dayCells.forEach(item => item.classList.remove('dragging'));
            }, 0);
        });

        cell.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        cell.addEventListener('drop', () => {
            if (draggedItem) {
                const currentCell = draggedItem;
                const targetCell = cell;

                // Swap the contents if you decide to allow it
                const tempContent = currentCell.innerHTML;
                currentCell.innerHTML = targetCell.innerHTML;
                targetCell.innerHTML = tempContent;
            }
        });
    });
});
