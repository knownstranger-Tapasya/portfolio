// Add more advanced JavaScript functionality here
// Example: Adding smooth scrolling for navigation links with offset
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        const offset = window.innerWidth <= 768 ? 60 : 100; // Adjust the offset for responsive design
        window.scrollTo({
            top: target.offsetTop - offset,
            behavior: 'smooth'
        });
    });
});
/*
// Example: Dynamic project loading from JSON data
const projectsContainer = document.getElementById('projects');
const projectsData = [{
        title: 'Project 1',
        description: 'Description of Project 1...',
        imageUrl: 'project1.jpg',
        link: '#'
    },
    {
        title: 'Project 2',
        description: 'Description of Project 2...',
        imageUrl: 'project2.jpg',
        link: '#'
    },
    // Add more project data entries as needed
];
const projectsPerPage = 4;
let projectsIndex = 0;

function createProjectElement(project) {
    const projectElement = document.createElement('div');
    projectElement.classList.add('project');
    projectElement.innerHTML = `
        <img src="${project.imageUrl}" alt="${project.title}">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank">Learn More</a>
    `;
    return projectElement;
}

function loadProjects() {
    const endIndex = Math.min(projectsIndex + projectsPerPage, projectsData.length);
    for (let i = projectsIndex; i < endIndex; i++) {
        const projectElement = createProjectElement(projectsData[i]);
        projectsContainer.appendChild(projectElement);
    }
    projectsIndex = endIndex;
    if (projectsIndex >= projectsData.length) {
        loadMoreButton.style.display = 'none';
    }
}

loadProjects();

loadMoreButton.addEventListener('click', loadProjects);
*/
// Toggle navigation menu for smaller screens
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static('public'));

// Handle form submission
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'YourEmailService',
        auth: {
            user: 'your-email@example.com',
            pass: 'your-password'
        }
    });

    // Email data
    const mailOptions = {
        from: 'your-email@example.com',
        to: 'recipient@example.com',
        subject: 'Portfolio Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});