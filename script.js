async function fetchStudents() {
  try {
  const response = await fetch('https://confused-jay-top-hat.cyclic.app/data/alldata');
  const data = await response.json();
  displayStudents(data); // Display fetched data in the table
  } catch (error) {
  console.error('Error fetching data:', error);
  }
  }
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // You can change this to 'auto' for instant scrolling
    });
  }
  
  
  // Function to display students in the table
  function displayStudents(students) {
  const tableBody = document.querySelector('#studentsTable');
  tableBody.innerHTML = ''; // Clear existing table rows
  
  students.forEach((student) => {
  const row = tableBody.insertRow();
  
  // Create cells for each student property
  const properties = ['firstname', 'lastname', 'phone_number', 'DOB', 'gender', 'address'];
  properties.forEach((property) => {
    const cell = row.insertCell();
    cell.textContent = student[property];
  });
  
  // Create cell for actions (Edit and Delete buttons)
  const actionsCell = row.insertCell();
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.style="margin-right:10px"
  editButton.onclick = () => editStudent(student._id); // Pass student ID to edit function
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => deleteStudent(student._id); // Pass student ID to delete function
  actionsCell.appendChild(editButton);
  actionsCell.appendChild(deleteButton);
  });
  }
  
  // Function to add a new student
  async function addStudent() {
    const form = document.getElementById('addStudentForm');
    const formData = new FormData(form);
    const studentData = {
      firstname: formData.get('firstName'), // Match the key with the backend
      lastname: formData.get('lastName'), // Match the key with the backend
      phone_number: formData.get('phone'), // Match the key with the backend
      DOB: formData.get('dob'), // Match the key with the backend
      gender: formData.get('gender'),
      address: formData.get('address'),
    };
  
    try {
      const response = await fetch('https://confused-jay-top-hat.cyclic.app/data/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      if (response.ok) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Student Added successfully"
        });
        fetchStudents(); // Refresh the table after adding a new student
        form.reset(); // Clear the form fields
      } else {
        console.error('Failed to add student');
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  }
  
  // Function to edit a student
  async function editStudent(studentId) {
    scrollToTop(); // Scroll to the top of the page
    // editStudent(student._id);
    try {
      const response = await fetch(`https://confused-jay-top-hat.cyclic.app/data/alldata/${studentId}`);
      if (response.ok) {
        const studentData = await response.json();
  
        // Populate form fields with existing data for editing
        document.getElementById('firstName').value = studentData.firstname;
        document.getElementById('lastName').value = studentData.lastname;
        document.getElementById('phone').value = studentData.phone_number;
        document.getElementById('dob').value = studentData.DOB;
        document.getElementById('gender').value = studentData.gender;
        document.getElementById('address').value = studentData.address;
  
        // Add an Update button in the form for confirmation
        const form = document.getElementById('addStudentForm');
        const addButton = form.querySelector('button');
        addButton.textContent = 'Update';
        addButton.onclick = async () => {
          try {
            const updatedData = {
              firstname: document.getElementById('firstName').value,
              lastname: document.getElementById('lastName').value,
              phone_number: document.getElementById('phone').value,
              DOB: document.getElementById('dob').value,
              gender: document.getElementById('gender').value,
              address: document.getElementById('address').value,
            };
  
            const updateResponse = await fetch(`https://confused-jay-top-hat.cyclic.app/data/update/${studentId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedData),
            });
  
            if (updateResponse.ok) {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Update successfully"
              });
              fetchStudents(); // Refresh the table after updating
              form.reset(); // Clear the form fields
              addButton.textContent = 'Add Student'; // Reset button text to 'Add Student'
              addButton.onclick = addStudent; // Reset button onclick function to addStudent
            } else {
              console.error('Failed to update student');
            }
          } catch (error) {
            console.error('Error updating student:', error);
          }
        };
      } else {
        console.error('Failed to fetch student data');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
    // document.body.appendChild(editButton);
  }
  
  
 
  
  // Function to delete a student
  async function deleteStudent(studentId) {
  try {
  const response = await fetch(`https://confused-jay-top-hat.cyclic.app/data/delete/${studentId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    fetchStudents(); // Refresh the table after deletion
  } else {
    console.error('Failed to delete student');
  }
  } catch (error) {
  console.error('Error deleting student:', error);
  }
  }
  const dobInput = document.getElementById('dob');


const currentDate = new Date().toISOString().split('T')[0];


dobInput.setAttribute('min', currentDate);
  // Fetch students when the page loads
  window.onload = fetchStudents;