import {marked} from 'marked';
import DOMPurify from 'dompurify';

/**
 * This function is an Immediately Invoked Function Expression (IIFE) that places the logo depending on the screen size.
 * It adds event listeners for 'resize' and 'load' events on the window object.
 */
((): void => {
    const logo: HTMLElement = document.getElementById('logo') as HTMLElement,
        mobileHolder: HTMLElement = document.getElementById('logo-mobilescreen') as HTMLElement,
        widescreenHolder: HTMLElement = document.getElementById('logo-widescreen') as HTMLElement;

    /**
     * This function displays the window size.
     * It checks the window's inner width and appends the logo to the appropriate holder.
     */
    const displayWindowSize = (): void => {
        let myWidth: number = window.innerWidth;
        if (myWidth >= 960) {
            if (widescreenHolder) {
                widescreenHolder.appendChild(logo);
            }
        } else {
            mobileHolder.appendChild(logo);
        }
    };
    window.addEventListener('resize', () => {
        displayWindowSize();
        
    });
    window.addEventListener('load', () => {
        displayWindowSize();
        
    });
})();

/**
 * This section of the code handles the theme switching functionality.
 * It adds an event listener for 'change' event on the toggleSwitch.
 */
const toggleSwitch: HTMLInputElement = document.querySelector('#theme-toggle-button') as HTMLInputElement;
const btnToggleText: HTMLSpanElement = document.querySelector('#toggle-announce') as HTMLSpanElement;

/**
 * This function switches the theme to dark.
 * It sets a localStorage variable to track the theme between page loads.
 */
export const switchToDarkTheme = (): void => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleSwitch.checked = true;
    btnToggleText.innerText = "switch to light theme";
}

/**
 * This function switches the theme to light.
 * It sets a localStorage variable to track the theme between page loads.
 */
export const switchToLightTheme = (): void => {
    localStorage.setItem('theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
    toggleSwitch.checked = false;
    btnToggleText.innerText = "switch to dark theme";
}

/**
 * This function switches the theme based on the checked state of the toggleSwitch.
 * @param {Event} e - The event object.
 */
const switchTheme = (e: Event): void => {
    if ((e.target as HTMLInputElement).checked) {
        switchToDarkTheme();
    } else {
        switchToLightTheme();
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);

const mediaQueryDarkMode: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
if (mediaQueryDarkMode && mediaQueryDarkMode.matches) {
    switchToDarkTheme();
}

/**
 * This section of the code handles the navigation functionality.
 * It adds an event listener for 'click' event on the menuIcon.
 */
const menuIcon: HTMLElement = document.querySelector('#menu-icon') as HTMLElement;
const menuMainContainer: HTMLElement = document.querySelector('#side-nav') as HTMLElement;
const menuUl: HTMLElement = document.querySelector('#nav-ul') as HTMLElement;
const btnAddNewDoc: HTMLElement = document.getElementById('add-new-document') as HTMLElement;

/**
 * This function closes the main menu.
 */
const closeMainMenu = (): void => {
    menuMainContainer.classList.remove('active-side-menu');
    menuIcon.setAttribute('aria-expanded', "false");
    menuIcon.focus();
}

/**
 * This function opens the main menu.
 */
const openMainMenu = (): void => {
    menuIcon.addEventListener('click', () => {
        if (menuIcon.getAttribute('aria-expanded') === 'false') {
            menuMainContainer.classList.add('active-side-menu');
            menuIcon.setAttribute('aria-expanded', "true");
            btnAddNewDoc.focus();
        } else {
            closeMainMenu();
        }
    });
}

openMainMenu();

/**
 * This section of the code handles the CRUD functionality with Local Storage.
 * It adds an event listener for 'input' event on the markdownContent.
 */
const markdownContent: HTMLTextAreaElement = document.getElementById('markdown-input') as HTMLTextAreaElement,
    htmlPreview: HTMLElement = document.getElementById('html-preview') as HTMLElement,
    labelDOcName: HTMLLabelElement = document.querySelector('label[for="doc-name"]') as HTMLLabelElement,
    docName: HTMLInputElement = document.getElementById('doc-name') as HTMLInputElement;

/**
 * This function shows the marked content.
 * It converts the markdown content to HTML, sanitizes it and displays it.
 */
const showMarkedContent = (): void => {
    const htmlContent: string | Promise<string> = marked.parse(markdownContent.value);
    if (typeof htmlContent === 'string') {
        htmlPreview.innerHTML = DOMPurify.sanitize(htmlContent,
            {USE_PROFILES: {html: true}});
    }
}

/**
 * This function resizes the textarea to fit its content.
 */
const resizeTextArea = (): void => {
    markdownContent.style.height = "";
    markdownContent.style.height = markdownContent.scrollHeight + 3 + "px";
}

markdownContent.addEventListener('input', function () {
    resizeTextArea();
    showMarkedContent();
});

/**
 * This section of the code handles the full screen preview functionality.
 * It adds an event listener for 'click' event on the 'preview-full-screen' button.
 */
document.getElementById('preview-full-screen')?.addEventListener('click', () => {
    const markdownSection: HTMLElement = document.getElementById('markdown-section') as HTMLElement,
        previewSection: HTMLElement = document.getElementById('preview-section') as HTMLElement,
        btnFullScreen: HTMLElement = document.querySelector('#preview-full-screen') as HTMLElement;

    if (previewSection.classList.contains('full-screen')) {
        previewSection.classList.remove('full-screen');
        markdownSection.classList.remove('hide');
        btnFullScreen.innerHTML = '<svg width="16" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M7.784.003c4.782-.144 7.597 4.31 8.109 5.198a.8.8 0 0 1 0 .8c-.688 1.2-3.255 5.086-7.677 5.198h-.2c-4.71 0-7.405-4.326-7.909-5.198a.8.8 0 0 1 0-.8C.803 4.001 3.362.115 7.784.003Zm.38 1.6h-.3c-3.199.08-5.286 2.71-6.086 3.998C2.482 6.73 4.73 9.68 8.176 9.6c3.199-.08 5.262-2.711 6.086-3.999-.712-1.127-2.967-4.086-6.398-3.998ZM8 2.803A2.799 2.799 0 1 1 8 8.4a2.799 2.799 0 0 1 0-5.598Zm0 1.599A1.2 1.2 0 1 0 8 6.8a1.2 1.2 0 0 0 0-2.4Z"/></svg>'
    } else {
        previewSection.classList.add('full-screen');
        markdownSection.classList.add('hide');
        btnFullScreen.innerHTML = '<svg width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M1.38.027a.795.795 0 0 1 .769.206L14.815 12.9a.792.792 0 0 1 0 1.124.792.792 0 0 1-1.124 0L9.234 9.567a2.77 2.77 0 0 1-3.753-3.753L1.024 1.357a.795.795 0 0 1 .357-1.33Zm.998 3.832 1.156 1.116a10.846 10.846 0 0 0-1.773 2.153c.696 1.117 2.929 4.038 6.333 3.959a6.127 6.127 0 0 0 1.346-.198l1.25 1.25a7.505 7.505 0 0 1-2.556.53h-.198c-4.663 0-7.331-4.282-7.83-5.145a.792.792 0 0 1 0-.792A12.58 12.58 0 0 1 2.378 3.86Zm5.328-2.272c4.726-.143 7.52 4.267 8.028 5.145.15.24.163.542.031.792a12.58 12.58 0 0 1-2.304 2.874l-1.195-1.116a10.846 10.846 0 0 0 1.813-2.154c-.705-1.116-2.937-4.045-6.333-3.958a6.127 6.127 0 0 0-1.346.198L5.149 2.117a7.505 7.505 0 0 1 2.557-.53Zm-.974 5.486v.055c0 .656.532 1.188 1.188 1.188l.047-.008-1.235-1.235Z"/></svg>'
    }
})

/**
 * This section of the code handles the CRUD functionality with Local Storage.
 * It fetches data from a JSON file and populates the existing documents.
 */
interface UserDoc {
    date: string;
    docName: string;
    content: string;
}

interface DocData {
    createdAt: string;
    name: string;
    content: string;
}

let allUserDocs: UserDoc[] = [];
let currentIndex: number = 0;

const localStorageKey: "allUserDocs" = 'allUserDocs';

/**
 * This function saves the documents to Local Storage.
 * @param {UserDoc[]} docs - The documents to be saved.
 */
const saveToLocalStorage = (docs: UserDoc[]): void => {
    localStorage.setItem(localStorageKey, JSON.stringify(docs));
};

/**
 * This function loads the documents from Local Storage.
 * @returns {UserDoc[]} The loaded documents.
 */
const loadFromLocalStorage = (): UserDoc[] => {
    return JSON.parse(localStorage.getItem(localStorageKey) || '[]');
};

/**
 * This function adds a welcome document.
 * @param {DocData[]} data - The data to be added.
 */
const addWelcomeDoc = (data: DocData[]) => {
    const welcomeDoc: UserDoc = {
        date: data[0].createdAt,
        docName: data[0].name,
        content: data[0].content,
    };
    allUserDocs.push(welcomeDoc);
    saveToLocalStorage(allUserDocs);
};