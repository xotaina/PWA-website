const butInstall = document.getElementById('buttonInstall');
let deferredPrompt; // To store the deferred prompt

// Handle the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

// Handle click event on the install button
butInstall.addEventListener('click', handleInstallClick);

// Handle the 'appinstalled' event
window.addEventListener('appinstalled', handleAppInstalled);

function handleBeforeInstallPrompt(event) {
    // Prevent the default browser prompt
    event.preventDefault();

    // Store the event for later use
    deferredPrompt = event;

    // Show the install button
    butInstall.style.display = 'block';
}

async function handleInstallClick() {
    if (!deferredPrompt) {
        console.error('No deferred prompt found');
        return;
    }

    // Show the browser prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const result = await deferredPrompt.userChoice;

    // Reset the deferred prompt variable
    deferredPrompt = null;

    // Hide the install button
    butInstall.style.display = 'none';

    // Check the user's choice
    if (result.outcome === 'accepted') {
        console.log('PWA installation accepted');
    } else {
        console.log('PWA installation rejected');
    }
}

function handleAppInstalled(event) {
    console.log('PWA installed');
}
