import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

// Main DOM element
const main = document.querySelector('#main');
main.innerHTML = '';

// Load spinner when editor is undefined
const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner" />
    </div>
  `;
  main.appendChild(spinner);
};

// Create Editor instance
const editor = new Editor();

// Load spinner if editor is undefined
if (!editor) {
  loadSpinner();
}

// Register service worker if supported
if ('serviceWorker' in navigator) {
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
