# clickanywhere
It's like Minesweeper, but not really. Click around the page to find the "right spot", and try to do it with the lowest number of clicks possible.

**Link to project:** https://clickanywhere.netlify.app/

![image](https://user-images.githubusercontent.com/9390013/171076354-23d15ed9-ff7f-4307-9273-18ea00e60737.png)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript

### HTML

The HTML is super simple, as you can probably tell. The entire page is composed of a grid of invisible `<sections>`. There is some starter text elements in the center of the page that tells the player what to do, as well as some text that indicates that your total number of mouse clicks will be tracked and displayed. There is also a hidden modal/dialog that only appears once the player selects the correct "solution" section. This modal is positioned on top of every other element on the page and uses the `<dialog>` tag, so clicks outside of the modal are intentionally non-functional once the game ends. 

### CSS

The CSS is fairly strightforward as well. Although, I did have to render the center text elements unclickable because if they were clickable, the JS logic becomes broken. Additionally, there is some _light_ responsiveness to the site via some media queries.

### JS

The real meat and potatoes of this project is the JS. The things I wanted the JS to achieve were the following:

1. Store the scores for each of your sessions. This is to be referenced when grabbing your best score.
    * This is achieved by checking your browser's local storage whenever your load the page. If this is your first time playing, a new empty array is stored to local storage. This array will be used to store your scores moving forward.
2. At the start of the game, a random section is chosen to be the solution section.
    * At page load, each section is assigned a numbered ID. A random number generator then generates a random number, with the idea being that this number represents the numbered ID of the solution section.
3. Each playable section should be able to listen for clicks, and the game will evaluate if you clicked the solution section.
    * At page load, `eventListeners` are added to each playable section. Upon clicks, the game checks the numbered ID of the section you clicked. If the section that you clicked on has the numbered ID that matches the random number that was generated, then you win!
4. Every time you click a playable section, the click counter text should be incremented by 1.
    * Well, this is pretty straightforward.
5. If you click a non-solution section, the center text is updated with new text telling you that you are wrong.
    * The `showWrongReply()` method for this functionality depends on an array of predetermined responses used when you click on a "wrong" section. When `showWrongReply()` is called, a random number is generated. That random number is used to represent the array index of the chosen response. This repsonse is then displayed in the DOM.
6. If you click the solution section, an end-game modal appears, containing your score for that current session, as well as your historical best score.
    * The end-game modal has a `hidden` class. This class is removed once you click the solution section. Additionally, once the game ends, your number of clicks this session is stored to local storage, and your best (lowest) score ever is displayed in this modal.
7. As a bonus, you should be able to press a predetermined key to show where the solution section is (mostly used for troubleshooting).
    * I just became tired of trying to find the solution section manually while troubleshooting, so I added a keypress listener. If I press a predetermined key, the solution section is visually highlighted.

## Lessons Learned:

This project contained a lot of firsts and early learnings for me. 

* I finally become more comfortable with git and Github while progressing through this project. Fun fact: I was uploading my files via Github's UI when I first started this project! 
* This was a good way to practice using and writing to local storage.
* I had originally written the JS with some messy and repetitive procedural code. I took some time to learn more about OOP and refactored a ton with the goal being that most of my game should be represented by an object. This really organized my game logic and made it easier for me to keep working on the code since I knew where to look for each piece of the logic.

## Opportunities

* Improve section and text sizing on mobile.
* Improve performance on mobile.
* Text should not overflow in the center section (this is most noticeable before your first click, with the text  `click the right spot`).
