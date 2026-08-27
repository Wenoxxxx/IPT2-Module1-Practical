function isReadableText(value) {
	return /[A-Za-z]/.test(value);
}

const subjectForm = document.getElementById('subjectForm');

if (subjectForm) {
	subjectForm.addEventListener('submit', function (event) {
		event.preventDefault();

		const subjectCode = document.getElementById('subjectCode').value.trim();
		const subjectName = document.getElementById('subjectName').value.trim();
		const units = Number(document.getElementById('units').value);
		const subjectError = document.getElementById('subjectError');

		if (!isReadableText(subjectCode) || !isReadableText(subjectName) || !Number.isInteger(units) || units < 1 || units > 5) {
			subjectError.textContent = 'Enter readable subject code and name values, and the maximum number of units is 5.';
			return;
		}

		subjectError.textContent = '';
		const row = document.getElementById('table-content').insertRow();
		row.insertCell().textContent = subjectCode;
		row.insertCell().textContent = subjectName;
		row.insertCell().textContent = units;
		subjectForm.reset();
	});
}

const studentForm = document.getElementById('studentForm');
const addStudentButton = document.getElementById('addStudentButton');

if (studentForm && addStudentButton) {
	const idNumberInput = document.getElementById('idNumber');
	const firstNameInput = document.getElementById('firstName');
	const middleNameInput = document.getElementById('middleName');
	const lastNameInput = document.getElementById('lastName');
	const studentError = document.createElement('div');
	const verifyLetters = /^[A-Za-z ]+$/;

	studentError.id = 'studentError';
	studentError.className = 'text-danger mt-2';
	studentError.setAttribute('role', 'alert');
	studentForm.appendChild(studentError);

	idNumberInput.addEventListener('input', function () {
		idNumberInput.value = idNumberInput.value.replace(/[^0-9]/g, '');
	});

	[firstNameInput, middleNameInput, lastNameInput].forEach(function (input) {
		input.addEventListener('input', function () {
			input.value = input.value.replace(/[^A-Za-z ]/g, '');
		});
	});

	addStudentButton.addEventListener('click', function () {
		const idNumber = idNumberInput.value.trim();
		const firstName = firstNameInput.value.trim();
		const middleName = middleNameInput.value.trim();
		const lastName = lastNameInput.value.trim();

		if (!idNumber || !firstName || !lastName) {
			studentError.textContent = 'ID number, first name, and last name are required.';
			return;
		}

		if (!/^\d+$/.test(idNumber) || !verifyLetters.test(firstName) ||
			(middleName && !verifyLetters.test(middleName)) || !verifyLetters.test(lastName)) {
			studentError.textContent = 'Enter a numeric ID number and names containing letters and spaces only.';
			return;
		}

		studentError.textContent = '';
		const row = document.getElementById('table-content').insertRow();
		row.insertCell().textContent = idNumber;
		row.insertCell().textContent = firstName;
		row.insertCell().textContent = middleName;
		row.insertCell().textContent = lastName;
		studentForm.reset();
	});
}
