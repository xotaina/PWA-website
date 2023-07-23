// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

// Check if CodeMirror is loaded
if (typeof CodeMirror === 'undefined') {
    throw new Error('CodeMirror is not loaded');
}

export default class Editor {
    constructor() {
        this.localData = localStorage.getItem('content');
        this.initializeEditor();
        this.loadData();
        this.editorEvents();
    }

    // Initialize the CodeMirror editor
    initializeEditor() {
        this.editor = CodeMirror(document.querySelector('#main'), {
            value: '',
            mode: 'javascript',
            theme: 'monokai',
            lineNumbers: true,
            lineWrapping: true,
            autofocus: true,
            indentUnit: 2,
            tabSize: 2,
        });
    }

    // Load data from IndexedDB or local storage
    loadData() {
        getDb().then((data) => {
            console.info('Loaded data from IndexedDB, injecting into editor');
            this.editor.setValue(data || this.localData || header);
        });
    }

    // Set event listeners for the editor
    editorEvents() {
        this.editor.on('change', () => {
            localStorage.setItem('content', this.editor.getValue());
        });

        this.editor.on('blur', () => {
            console.log('The editor has lost focus');
            putDb(localStorage.getItem('content'));
        });
    }
}
