const roleSkills = {

    "Full Stack Developer": [
        { name: "HTML & CSS", level: 7 },
        { name: "JavaScript", level: 6 },
        { name: "React.js", level: 4 },
        { name: "Node.js", level: 3 },
        { name: "Express.js", level: 3 },
        { name: "MongoDB", level: 3 },
        { name: "Git & GitHub", level: 5 },
        { name: "REST APIs", level: 3 },
        { name: "Docker", level: 1 },
        { name: "Cloud Basics", level: 2 }
    ],

    "Cloud Engineer": [
        { name: "Linux", level: 4 },
        { name: "Networking", level: 3 },
        { name: "Cloud Fundamentals", level: 3 },
        { name: "AWS / Azure", level: 2 },
        { name: "Docker", level: 2 },
        { name: "Kubernetes", level: 1 },
        { name: "Git", level: 5 },
        { name: "CI/CD", level: 2 },
        { name: "Terraform", level: 1 },
        { name: "Python", level: 4 }
    ],

    "Frontend Developer": [
        { name: "HTML & CSS", level: 7 },
        { name: "JavaScript", level: 6 },
        { name: "React.js", level: 4 },
        { name: "Responsive Design", level: 5 },
        { name: "Git & GitHub", level: 5 },
        { name: "TypeScript", level: 2 },
        { name: "Tailwind CSS", level: 3 },
        { name: "REST APIs", level: 3 },
        { name: "Testing", level: 1 },
        { name: "Performance Optimization", level: 2 }
    ],

    "Backend Developer": [
        { name: "JavaScript / Python", level: 5 },
        { name: "Node.js", level: 3 },
        { name: "Express.js", level: 3 },
        { name: "REST APIs", level: 3 },
        { name: "SQL", level: 2 },
        { name: "MongoDB", level: 3 },
        { name: "Authentication", level: 2 },
        { name: "Git & GitHub", level: 5 },
        { name: "Docker", level: 1 },
        { name: "System Design", level: 1 }
    ],

    "DevOps Engineer": [
        { name: "Linux", level: 4 },
        { name: "Git & GitHub", level: 5 },
        { name: "Docker", level: 2 },
        { name: "CI/CD", level: 2 },
        { name: "AWS / Azure", level: 2 },
        { name: "Kubernetes", level: 1 },
        { name: "Terraform", level: 1 },
        { name: "Networking", level: 3 },
        { name: "Python / Bash", level: 3 },
        { name: "Monitoring", level: 1 }
    ]
};

let selectedRole = "Full Stack Developer";

const roleButtons = document.querySelectorAll(".role-btn");
const skillsContainer = document.getElementById("skillsContainer");
const analyzeBtn = document.getElementById("analyzeBtn");
const resultsSection = document.getElementById("resultsSection");
const resetBtn = document.getElementById("resetBtn");


// Load skills
function loadSkills(role) {

    selectedRole = role;

    skillsContainer.innerHTML = "";

    roleSkills[role].forEach((skill, index) => {

        const skillHTML = `
            <div class="skill-item">

                <div class="skill-top">
                    <span class="skill-name">${skill.name}</span>

                    <span class="skill-level" id="level-${index}">
                        ${skill.level}/10
                    </span>
                </div>

                <input
                    type="range"
                    class="skill-slider"
                    min="0"
                    max="10"
                    value="${skill.level}"
                    data-index="${index}"
                >

                <div class="slider-labels">
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Advanced</span>
                </div>

            </div>
        `;

        skillsContainer.innerHTML += skillHTML;
    });

    document.querySelectorAll(".skill-slider").forEach(slider => {

        slider.addEventListener("input", function () {

            const index = this.dataset.index;

            document.getElementById(`level-${index}`).textContent =
                `${this.value}/10`;

        });

    });
}


// Role selection
roleButtons.forEach(button => {

    button.addEventListener("click", () => {

        roleButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        loadSkills(button.dataset.role);

        resultsSection.classList.add("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});


// Analyze
analyzeBtn.addEventListener("click", () => {

    const sliders = document.querySelectorAll(".skill-slider");

    const skills = roleSkills[selectedRole].map((skill, index) => {

        return {
            name: skill.name,
            level: Number(sliders[index].value)
        };

    });

    calculateResults(skills);

    resultsSection.classList.remove("hidden");

    resultsSection.scrollIntoView({
        behavior: "smooth"
    });
});


function calculateResults(skills) {

    let total = 0;

    let strong = 0;
    let improve = 0;
    let missing = 0;

    skills.forEach(skill => {

        total += skill.level;

        if (skill.level >= 7) {
            strong++;
        } else if (skill.level >= 4) {
            improve++;
        } else {
            missing++;
        }

    });

    const score = Math.round((total / (skills.length * 10)) * 100);

    document.getElementById("resultRole").textContent = selectedRole;
    document.getElementById("scoreValue").textContent = score;

    document.getElementById("strongCount").textContent = strong;
    document.getElementById("improveCount").textContent = improve;
    document.getElementById("missingCount").textContent = missing;

    updateScoreMessage(score);

    renderSkillResults(skills);

    renderRoadmap(skills);
}


// Score message
function updateScoreMessage(score) {

    const message = document.getElementById("scoreMessage");
    const description = document.getElementById("scoreDescription");

    if (score >= 80) {

        message.textContent = "You're almost job-ready!";
        description.textContent =
            "Your foundation is strong. Focus on your remaining gaps.";

    } else if (score >= 60) {

        message.textContent = "Good progress!";
        description.textContent =
            "You have a solid foundation. A few important skills need attention.";

    } else if (score >= 40) {

        message.textContent = "Keep building!";
        description.textContent =
            "You are on the right path, but several important skills need improvement.";

    } else {

        message.textContent = "Start building your foundation.";
        description.textContent =
            "Focus on the fundamentals first and gradually close your skill gaps.";

    }
}


// Skill results
function renderSkillResults(skills) {

    const container = document.getElementById("skillResults");

    container.innerHTML = "";

    skills.forEach(skill => {

        let status;
        let statusClass;

        if (skill.level >= 7) {

            status = "STRONG";
            statusClass = "strong";

        } else if (skill.level >= 4) {

            status = "IMPROVE";
            statusClass = "improve";

        } else {

            status = "GAP";
            statusClass = "missing";

        }

        const percentage = skill.level * 10;

        container.innerHTML += `

            <div class="result-skill">

                <div class="result-skill-top">

                    <span class="result-skill-name">
                        ${skill.name}
                    </span>

                    <span class="status ${statusClass}">
                        ${status} · ${skill.level}/10
                    </span>

                </div>

                <div class="progress-bg">

                    <div
                        class="progress-fill ${statusClass}"
                        style="width: ${percentage}%"
                    ></div>

                </div>

            </div>
        `;
    });
}


// Roadmap
function renderRoadmap(skills) {

    const roadmap = document.getElementById("roadmap");

    const gaps = skills
        .filter(skill => skill.level < 7)
        .sort((a, b) => a.level - b.level);

    if (gaps.length === 0) {

        roadmap.innerHTML = `
            <div class="empty-roadmap">
                Excellent! You have strong scores across all required skills.
            </div>
        `;

        return;
    }

    roadmap.innerHTML = "";

    gaps.slice(0, 5).forEach((skill, index) => {

        let description;

        if (skill.level <= 2) {

            description =
                `Start with the fundamentals of ${skill.name} and build one small practical project.`;

        } else if (skill.level <= 4) {

            description =
                `Strengthen your ${skill.name} knowledge through hands-on practice and projects.`;

        } else {

            description =
                `Polish your ${skill.name} skills by working on advanced concepts and real-world tasks.`;

        }

        roadmap.innerHTML += `

            <div class="roadmap-step">

                <div class="step-number">
                    ${index + 1}
                </div>

                <div>

                    <h3>${skill.name}</h3>

                    <p>${description}</p>

                </div>

            </div>
        `;
    });
}


// Reset
resetBtn.addEventListener("click", () => {

    resultsSection.classList.add("hidden");

    loadSkills(selectedRole);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// Initial load
loadSkills(selectedRole);