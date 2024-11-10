
const modal = document.getElementById("resumeModal") as HTMLDivElement;
const openModalButton = document.getElementById("openModal") as HTMLButtonElement;
const closeModalButton = document.getElementById("closeModal") as HTMLSpanElement;
const resumeForm = document.getElementById("resumeForm") as HTMLFormElement;
const resumeOutput = document.getElementById('resumeOutput') as HTMLDivElement;

// Open modal when button is clicked
openModalButton.onclick = function () {
    modal.style.display = 'block';
};

// Close modal when close button is clicked
closeModalButton.onclick = function () {
    modal.style.display = 'none';
};

// Close modal when clicking outside of the modal content
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Form Submission
resumeForm.onsubmit = function (event) {
    event.preventDefault();

    // Get form values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const cnic = (document.getElementById('cnic') as HTMLInputElement).value;
    const profilePictureInput = (document.getElementById('profilePhoto') as HTMLInputElement);
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;

    // profile picture
    const profilePictureFile = profilePictureInput.files?.[0]; // Get the first file if it exists
    const outputProfilePhoto = document.getElementById('outputProfilePhoto') as HTMLImageElement;

    if (profilePictureFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            outputProfilePhoto.src = e.target?.result as string;
            outputProfilePhoto.style.display = 'block';
        };
        reader.readAsDataURL(profilePictureFile);
    }

    // output
    document.getElementById('outputName')!.innerHTML = `<b>Name</b> : ${name}`;
    document.getElementById('outputEmail')!.innerHTML = `<b>Email</b> : ${email}`;
    document.getElementById('outputPhone')!.innerHTML = `<b>Phone</b> : ${phone}`;
    document.getElementById('outputCNIC')!.innerHTML = `<b>CNIC</b> : ${cnic}`;
    document.getElementById('outputEducation')!.innerHTML = `<b>Education</b> : ${education}`;
    document.getElementById('outputSkills')!.innerHTML = `<b>Skills</b> : ${skills}`;
    document.getElementById('outputExperience')!.innerHTML = `<b>Experience</b> : ${experience}`;


    // Show resume output and hide the modal
    resumeOutput.style.display = 'block';
    modal.style.display = 'none';


    document.getElementById('editResume')?.addEventListener('click', function () {
        document.getElementById('resumeModal')!.style.display = 'block';
    });

    function makeEditable() {
        const editableElements = document.querySelectorAll('.editResume');
        editableElements.forEach(element => {
            element.addEventListener('click', function () {
                const currentElement = element as HTMLElement;
                const currentValue = currentElement.textContent || "";

                // replace content
                if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                    const input = document.createElement('input')
                    input.type = 'text'
                    input.value = currentValue;
                    input.classList.add('editresume')

                    input.addEventListener('blur', function () {
                        currentElement.textContent = input.value;
                        currentElement.style.display = 'inline'
                        input.remove()
                    })

                    currentElement.style.display = 'none'
                    currentElement.parentNode?.insertBefore(input, currentElement);
                    input.focus()
                }
            })
        })
    }
};
