function isReadableText(value) {
	return /[A-Za-z]/.test(value);
}

function isValidSubjectCode(value) {
	return /[A-Za-z]/.test(value) && /[0-9]/.test(value);
}

const subjectForm = document.getElementById('subjectForm');

if (subjectForm) {
	subjectForm.addEventListener('submit', function (event) {
		event.preventDefault();

		const subjectCodeInput = document.getElementById('subjectCode');
		const subjectNameInput = document.getElementById('subjectName');
		const unitsInput = document.getElementById('units');
		const subjectCode = subjectCodeInput.value.trim();
		const subjectName = subjectNameInput.value.trim();
		const unitsValue = unitsInput.value.trim();
		const units = Number(unitsValue);
		const subjectError = document.getElementById('subjectError');
		const inputs = [subjectCodeInput, subjectNameInput, unitsInput];
		const errors = [
			document.getElementById('subjectCodeError'),
			document.getElementById('subjectNameError'),
			document.getElementById('unitsError')
		];

		inputs.forEach(function (input) {
			input.classList.remove('is-invalid');
		});
		errors.forEach(function (error) {
			error.textContent = '';
		});
		subjectError.textContent = '';

		const validationErrors = [];
		if (!subjectCode) {
			validationErrors.push([subjectCodeInput, errors[0], 'Subject code is required.']);
		} else if (!isValidSubjectCode(subjectCode)) {
			validationErrors.push([subjectCodeInput, errors[0], 'Subject code must contain both letters and numbers.']);
		}
		if (!subjectName) {
			validationErrors.push([subjectNameInput, errors[1], 'Subject name is required.']);
		} else if (!isReadableText(subjectName)) {
			validationErrors.push([subjectNameInput, errors[1], 'Subject name must contain letters and cannot be numbers only.']);
		}
		if (!unitsValue) {
			validationErrors.push([unitsInput, errors[2], 'Units are required.']);
		} else if (!Number.isInteger(units)) {
			validationErrors.push([unitsInput, errors[2], 'Units must be a whole number.']);
		} else if (units < 1 || units > 5) {
			validationErrors.push([unitsInput, errors[2], 'Units must be from 1 to 5.']);
		}

		if (validationErrors.length > 0) {
			validationErrors.forEach(function (validationError) {
				validationError[0].classList.add('is-invalid');
				validationError[1].textContent = validationError[2];
			});
			subjectError.textContent = 'Please correct the highlighted fields.';
			validationErrors[0][0].focus();
			return;
		}

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
	const studentError = document.getElementById('studentError');
	const inputs = [idNumberInput, firstNameInput, middleNameInput, lastNameInput];
	const errors = [
		document.getElementById('idNumberError'),
		document.getElementById('firstNameError'),
		document.getElementById('middleNameError'),
		document.getElementById('lastNameError')
	];

	idNumberInput.addEventListener('input', function () {
		idNumberInput.value = idNumberInput.value.replace(/[^0-9]/g, '');
	});

	[firstNameInput, middleNameInput, lastNameInput].forEach(function (input) {
		input.addEventListener('input', function () {
			input.value = input.value.replace(/[^A-Za-z ]/g, '');
		});
	});

	studentForm.addEventListener('submit', function (event) {
		event.preventDefault();

		const idNumber = idNumberInput.value.trim();
		const firstName = firstNameInput.value.trim();
		const middleName = middleNameInput.value.trim();
		const lastName = lastNameInput.value.trim();

		inputs.forEach(function (input) {
			input.classList.remove('is-invalid');
		});
		errors.forEach(function (error) {
			error.textContent = '';
		});
		studentError.textContent = '';

		const validationErrors = [];
		if (!idNumber) {
			validationErrors.push([idNumberInput, errors[0], 'ID number is required.']);
		} else if (!/^\d+$/.test(idNumber)) {
			validationErrors.push([idNumberInput, errors[0], 'ID number must contain numbers only.']);
		}
		if (!firstName) {
			validationErrors.push([firstNameInput, errors[1], 'First name is required.']);
		} else if (!isReadableText(firstName)) {
			validationErrors.push([firstNameInput, errors[1], 'First name must contain letters and cannot be numbers only.']);
		}
		if (middleName && !isReadableText(middleName)) {
			validationErrors.push([middleNameInput, errors[2], 'Middle name must contain letters and cannot be numbers only.']);
		}
		if (!lastName) {
			validationErrors.push([lastNameInput, errors[3], 'Last name is required.']);
		} else if (!isReadableText(lastName)) {
			validationErrors.push([lastNameInput, errors[3], 'Last name must contain letters and cannot be numbers only.']);
		}

		if (validationErrors.length > 0) {
			validationErrors.forEach(function (validationError) {
				validationError[0].classList.add('is-invalid');
				validationError[1].textContent = validationError[2];
			});
			studentError.textContent = 'Please correct the highlighted fields.';
			validationErrors[0][0].focus();
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
