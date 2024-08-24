// Initialize Firebase (if not already initialized in script.js)
if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyBLJO_gIWa8C01V0UJy8bfFXEXj1sdqEUg",
        authDomain: "ido-e-learning.firebaseapp.com",
        projectId: "ido-e-learning",
        storageBucket: "ido-e-learning.appspot.com",
        messagingSenderId: "509162903340",
        appId: "1:509162903340:web:bec2b4d1d4ae93701d3e89"
    });
}
const db = firebase.firestore();
const storage = firebase.storage();

window.addEventListener('load', () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
        db.collection('users').doc(userId).get()
            .then(doc => {
                if (doc.exists) {
                    const username = doc.data().username;
                    document.getElementById('username').textContent = username;

                    // Fetch and display subjects
                    fetchSubjects();
                } else {
                    console.error('No such document for user ID:', userId);
                }
            })
            .catch(error => {
                console.error('Error getting document for user ID:', userId, error);
            });
    } else {
        console.error('No user ID found in localStorage');
    }

    // Fetch subjects and add click event listener to each subject
    function fetchSubjects() {
        const subjectsContainer = document.getElementById('subjects-container');
        subjectsContainer.innerHTML = ''; // Clear existing subjects

        db.collection('subjects').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const subject = doc.data();
                    const subjectLink = document.createElement('a');
                    subjectLink.classList.add('subject-link');
                    subjectLink.href = '#';
                    subjectLink.textContent = subject.title;
                    subjectLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        fetchNotes(subject.title);
                    });
                    subjectsContainer.appendChild(subjectLink);
                });
            })
            .catch(error => {
                console.error('Error fetching subjects:', error);
            });
    }

    // Fetch or create notes for a specific subject
    function fetchNotes(subjectTitle) {
        const notesContainer = document.getElementById('notes-container');
        notesContainer.innerHTML = ''; // Clear existing notes

        const notesRef = db.collection('notes').doc(subjectTitle);
        notesRef.get()
            .then(doc => {
                if (doc.exists) {
                    const notes = doc.data().notes;
                    if (notes.length > 0) {
                        document.getElementById('notes-heading').textContent = `Notes for ${subjectTitle}`;
                        document.getElementById('notes-section').style.display = 'block';
                        document.getElementById('document-preview').style.display = 'none';
                        document.getElementById('no-notes-section').style.display = 'none';

                        notes.forEach(note => {
                            const noteDiv = document.createElement('div');
                            noteDiv.classList.add('thumbnail');
                            noteDiv.textContent = note;
                            noteDiv.addEventListener('click', () => {
                                showDocumentPreview(subjectTitle, note);
                            });
                            notesContainer.appendChild(noteDiv);
                        });
                    } else {
                        showNoNotesSection(subjectTitle);
                    }
                } else {
                    showNoNotesSection(subjectTitle);
                }
            })
            .catch(error => {
                console.error('Error getting notes:', error);
            });
    }

    // Function to display the no notes section and handle note uploads
    function showNoNotesSection(subjectTitle) {
        document.getElementById('notes-section').style.display = 'none';
        document.getElementById('document-preview').style.display = 'none';
        document.getElementById('no-notes-section').style.display = 'block';

        const uploadNoteBtn = document.getElementById('upload-note-file');
        uploadNoteBtn.addEventListener('click', () => {
            uploadNoteFile(subjectTitle);
        });
    }

    // Function to show document preview in right panel
    function showDocumentPreview(subjectTitle, documentName) {
        const documentViewer = document.getElementById('documentViewer');
        const backToNotesBtn = document.getElementById('back-to-notes');

        const storageRef = storage.ref(`notes/${subjectTitle}/${documentName}`);
        storageRef.getDownloadURL()
            .then(downloadURL => {
                documentViewer.src = downloadURL;
                document.getElementById('document-preview').style.display = 'flex'; // Display the preview section
                document.getElementById('notes-section').style.display = 'none'; // Hide the notes section
                document.getElementById('no-notes-section').style.display = 'none'; // Hide the no-notes section
            })
            .catch(error => {
                console.error('Error getting document URL:', error);
            });

        // Add event listener to back button
        backToNotesBtn.addEventListener('click', () => {
            document.getElementById('document-preview').style.display = 'none'; // Hide the preview section
            document.getElementById('notes-section').style.display = 'block'; // Display the notes section
            fetchNotes(subjectTitle); // Refresh notes display
        });
    }
    
});
