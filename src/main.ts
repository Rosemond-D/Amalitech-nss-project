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
