document.addEventListener('DOMContentLoaded', () => {
  const siteUrlElement = document.getElementById('siteUrl');
  const siteUrlStatusElement = document.getElementById('siteUrlStatus');
  const siteStatusElement = document.getElementById('siteStatus');
  const extensionStatusElement = document.getElementById('extensionStatus');
  const toggleExtensionElement = document.getElementById('toggleExtension');
  const closeModalButton = document.getElementById('closeModal');

  let powerIconColor = 'red'; // Default color

  // Set the current URL in the popup
  const currentUrl = window.location.href;
  siteUrlElement.textContent = `BLOCKED URL: ${currentUrl}`;
  siteUrlStatusElement.textContent = currentUrl;

  // Check the extension's enabled/disabled state and update the UI accordingly
  chrome.storage.local.get("isExtensionEnabled", (result) => {
      const isEnabled = result.isExtensionEnabled;
      powerIconColor = isEnabled ? 'green' : 'red';
      toggleExtensionElement.querySelector('svg').setAttribute('stroke', powerIconColor);
      extensionStatusElement.textContent = `PHISNET CURRENTLY ${isEnabled ? 'ENABLED' : 'DISABLED'}`;
  });

  // Toggle the extension's enabled/disabled state
  toggleExtensionElement.addEventListener('click', () => {
      chrome.storage.local.get("isExtensionEnabled", (result) => {
          const newStatus = !result.isExtensionEnabled;
          chrome.storage.local.set({ isExtensionEnabled: newStatus }, () => {
              powerIconColor = newStatus ? 'green' : 'red';
              toggleExtensionElement.querySelector('svg').setAttribute('stroke', powerIconColor);
              extensionStatusElement.textContent = `PHISNET CURRENTLY ${newStatus ? 'ENABLED' : 'DISABLED'}`;
              location.reload();  // Refresh the page to reflect changes
          });
      });
  });

  // Close the modal
  closeModalButton.addEventListener('click', () => {
      window.close(); // Close the current tab
  });
});
