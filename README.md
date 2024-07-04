# Frontend Mentor - In-browser markdown editor solution

This is a solution to the [In-browser markdown editor challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/inbrowser-markdown-editor-r16TrrQX9). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

This challenge solution involves a web application that allows users to manage markdown documents efficiently. The application  provides simple CRUD (Create, Read, Update, Delete) functionalities along with several additional features to enhance user experience and accessibility.


### The challenge

Users should be able to:

- Create, Read, Update, and Delete markdown documents
- Name and save documents to be accessed as needed
- Edit the markdown of a document and see the formatted preview of the content
- View a full-page preview of the formatted content
- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- **Bonus**: If you're building a purely front-end project, use localStorage to save the current state in the browser that persists when the browser is refreshed


### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it. 

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.



### Links

- Solution URL: [Add solution URL here](Amalitech-nss-project/index.html)
- Live Site URL: [Add live site URL here](https://markdown-editor-ten-orcin.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Native CSS
- Flexbox
- CSS Grid
- Mobile-first workflow
- [Vite](Amalitech-nss-project/src/vite-env.d) 
- [Typescript](Amalitech-nss-project/src/typescript) - 
- [Styled Components](https://styled-components.com/) - For styles
- DOMPurify to sanitize the output of localstorage to save the current state in the browser that persists when the browser is refreshed
- Marked - Markdown compiler
- JSON to populate the initial welcome document



### What I learned

I have gained new knowledge on how to implement light and dark theme for browsers and also some optimezed codes for media queries for various devices

 see code snippets below:

//media query codes implemented//
```css
 @media screen and (max-width:60rem) {
    body {
      overflow-x: hidden;
    }
    
    #side-nav {
      position: absolute;
      left:0;
      top:0;
      z-index: 2;
      min-height: 100vh;
    }
    .btn-menu[aria-expanded="true"] {
      position:absolute;
      z-index: 3;
      top:0;
      left:11.125rem;
    }
    .btn-save#save-changes {
      width:2.5rem;
      min-width:2.5rem; /* fix for Safari */
    }
    .btn-save#save-changes svg {
      min-width:1.063rem;
      height:1.063rem;
    }

```
```ts

/*Working on this project helped me discover an optimized way of implementing dark and light themes*/


export const switchToDarkTheme = (): void => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleSwitch.checked = true;
    btnToggleText.innerText = "switch to light theme";
}

//This function switches the theme to light.//
export const switchToLightTheme = (): void => {
    localStorage.setItem('theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
    toggleSwitch.checked = false;
    btnToggleText.innerText = "switch to dark theme";
}
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

**Note: Delete this note and the content within this section and replace with your own learnings.**

### Continued development

I will definitely like to continue to expand my knowledge on typescript as it gives a flexible functionality towards static typing due to tooling limitations. 





### Useful resources





## Author

- GitHub - [ Rosemond-D](https://github.com/Rosemond-D)



## Acknowledgments

I will like to aknowledge and appreciate my friend Ayuba Isaac for his help in some project especially on the functionality using typescript.

Also like to acknowledge ChatGPT for various code syntax



