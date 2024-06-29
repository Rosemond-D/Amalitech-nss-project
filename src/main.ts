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
