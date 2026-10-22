const contactForm = document.getElementById("contactForm");
const status = document.getElementById("status");

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    status.innerText = "Sending message...";

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            status.innerText = "Message sent successfully!";
            contactForm.reset();
        } else {
            status.innerText = data.message || "Failed to send message.";
        }
    } catch (error) {
        status.innerText = "Could not connect to server. Check VS Code.";
        console.error("Contact form error:", error);
    }
});