// Ensure the DOM is fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Function to open the modal with the PDF
    function openModal(pdfPath) {
        const modal = document.getElementById("pdfModal");
        const iframe = document.getElementById("pdfIframe");
        iframe.src = pdfPath; // Set the src of the iframe to the PDF file path
        modal.style.display = "block"; // Show the modal
    }

    // Function to close the modal
    function closeModal() {
        const modal = document.getElementById("pdfModal");
        const iframe = document.getElementById("pdfIframe");
        iframe.src = ''; // Clear the iframe src when closing the modal
        modal.style.display = "none"; // Hide the modal
    }

    // Event listener to open the modal when the link box is clicked
    document.querySelectorAll('.link-content').forEach(function(linkContent) {
        linkContent.addEventListener('click', function() {
            const pdfPath = linkContent.getAttribute('data-pdf');
            openModal(pdfPath); // Open modal with the correct PDF
        });
    });

    // Event listener to close the modal when the close button is clicked
    document.querySelector('.close').addEventListener('click', function() {
        closeModal();
    });

    // Close the modal if the user clicks anywhere outside the modal content
    window.onclick = function(event) {
        const modal = document.getElementById("pdfModal");
        if (event.target == modal) {
            closeModal();
        }
    };
});
