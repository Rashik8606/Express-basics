// Function to close the modal
function closeModal() {
    console.log("Closing modal..."); // Debugging log
    let modal = document.getElementById("videoModal");
    modal.style.display = "none";
}

// Function to open the modal (Optional, if needed)
function openModal() {
    let modal = document.getElementById("videoModal");
    modal.style.display = "flex";
}

// Close modal when clicking outside the modal content
window.onclick = function (event) {
    let modal = document.getElementById("videoModal");
    if (event.target === modal) {
        console.log("Clicked outside, closing modal."); // Debugging log
        closeModal();
    }
};
