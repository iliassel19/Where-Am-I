# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Overview

### Screenshot

![](./screenshot.jpg)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Javascript

### What I learned

This project was the biggest one for me since I started my journey as a front-end developer. It was the challenge that made me exhibit my javascript knowledge. I've learned how to use ES6 classes and implement inheritence of functionality. In addition, I enhanced very much my capacities in making my code as DRY as possible and avoiding repetetive code. Furthermore, I think the most beneficial thing that I learnt is that I most from time to time leave the work and empty my mind to improve my thinking. For me, this helped me so much in figuring out solutions for problems that I faced. Also, I've learned that I must go for the simplest way always. For instance, I've searched inovative ways to implement the filter by region functionality, but when I took a sight at the restapi site, I founded simple way to implement this functionality. Instead of using:

 <script> 
  this.\_data.filter((data)=> {
    if(data.region === filter.textContent){
    createMarkup(data);
    }
  })
</script>

I used:

 <script> 
   this.fetchData(`/region/${filterBtnText.textContent.toLowerCase()}`);
</script>

### Continued development

I would love to focus more on implementing complex functionalities using ES6 classes and also improve furthermore my capacities in making my code DRY.

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@iliassel19](https://www.frontendmentor.io/profile/iliassel19)

## Acknowledgments

I would like to mention javascript code of Jonas Schmidtmann. The forkify project was big inspiration for me especialy in using ES6 classes effectivly.
