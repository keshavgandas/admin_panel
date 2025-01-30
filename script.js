// Data Storage
let professors = [];
let difficulties = [];
let subjects = [];
let exams = [];

// Function to Show Only the Selected Section
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
    window.location.hash = sectionId; // Update URL
}

// Handle Sidebar Clicks
document.querySelectorAll('.tab-link').forEach(tab => {
    tab.addEventListener('click', (event) => {
        event.preventDefault();
        const targetSection = tab.getAttribute('data-target');
        showSection(targetSection);
    });
});

// Check URL Hash and Load Correct Section
window.addEventListener('load', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        showSection(hash);
    } else {
        showSection('professors'); // Default section
    }
});

// Open Form
function openForm(type) {
    const modal = document.getElementById('form-modal');
    document.querySelectorAll('.form').forEach(form => form.style.display = 'none');
    document.getElementById(`${type}-form`).style.display = 'block';
    modal.style.display = 'flex';
}

// Close Form
function closeForm() {
    document.getElementById('form-modal').style.display = 'none';
}

// Add Professor
document.getElementById('professor-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input');
    const professor = {
        sno: professors.length + 1,
        name: inputs[0].value,
        email: inputs[1].value,
        password: inputs[2].value,
        code: inputs[3].value
    };
    professors.push(professor);
    updateTable('professor');
    closeForm();
});

// Add Difficulty
document.getElementById('difficulty-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const difficulty = {
        id: difficulties.length + 1,
        level: input.value
    };
    difficulties.push(difficulty);
    updateTable('difficulty');
    closeForm();
});

// Add Subject
document.getElementById('subject-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const subject = {
        id: subjects.length + 1,
        name: input.value
    };
    subjects.push(subject);
    updateTable('subject');
    closeForm();
});

// Add Exam
document.getElementById('exam-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input');
    const exam = {
        sno: exams.length + 1,
        professorName: inputs[0].value,
        courseName: inputs[1].value,
        examName: inputs[2].value,
        duration: inputs[3].value,
        questions: inputs[4].value
    };
    exams.push(exam);
    updateTable('exam');
    closeForm();
});

// Update Table
function updateTable(type) {
    const tableBody = document.getElementById(`${type}-table-body`);
    tableBody.innerHTML = '';
    const data = type === 'professor' ? professors :
                 type === 'difficulty' ? difficulties :
                 type === 'subject' ? subjects : exams;

    data.forEach((item, index) => {
        const row = document.createElement('tr');
        for (const key in item) {
            const cell = document.createElement('td');
            cell.textContent = item[key];
            row.appendChild(cell);
        }
        if (type !== 'difficulty' && type !== 'subject') {
            const actionCell = document.createElement('td');
            actionCell.innerHTML = `
                <button class="edit-btn">✏️ Edit</button>
                <button class="delete-btn">🗑 Delete</button>
            `;
            row.appendChild(actionCell);
        }
        tableBody.appendChild(row);
    });
}

// Initialize Tables
updateTable('professor');
updateTable('difficulty');
updateTable('subject');
updateTable('exam');
