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
