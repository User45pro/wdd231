const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false }
];

const container = document.querySelector("#course-cards");
const totalCredits = document.querySelector("#total-credits");
const filterButtons = document.querySelectorAll(".filters button");

function renderCourses(list) {
    container.textContent = "";
    let credits = 0;

    list.forEach(course => {
        const div = document.createElement("div");
        div.classList.add("course-box");
        if (course.completed) {
            div.classList.add("completed");
            div.textContent = `${course.subject} ${course.number} ✓`;
        } else {
            div.textContent = `${course.subject} ${course.number}`;
        }
        container.appendChild(div);
        credits += course.credits;
    });

    totalCredits.textContent = credits;
}

function setActiveButton(button) {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
}

document.querySelector("#all").addEventListener("click", (e) => {
    setActiveButton(e.target);
    renderCourses(courses);
});

document.querySelector("#cse").addEventListener("click", (e) => {
    setActiveButton(e.target);
    renderCourses(courses.filter(c => c.subject === "CSE"));
});

document.querySelector("#wdd").addEventListener("click", (e) => {
    setActiveButton(e.target);
    renderCourses(courses.filter(c => c.subject === "WDD"));
});

setActiveButton(document.querySelector("#all"));
renderCourses(courses);
