# startup
This is my startup repository. 
This is where you will see the work for my startup project and my early coding projects.

My name is Cameron Woffinden. I'm a student at BYU from Holly Springs, NC.

My name is Cameron Woffinden. I served my mission in Pocatello, Idaho.

Through this first assignment I've learned the basics of GitHub, commits, pushing and pulling, and merging commits in both VS Code and GitHub.

![Startup](https://user-images.githubusercontent.com/123421685/215222030-b09f1490-9445-4bc5-9f15-cb6557bbe1c3.jpg)

Elevator Pitch:

Here's the idea: an app that lets users create music by letting them experiment with different instruments coming together, either by writing out the different parts or layering together recordings of their ideas. They can then upload finished songs for the community to listen to. They can also follow their friends and their favorite creators to get news about their latest uploads.

Simon-html notes:
One thing I learned through this experience was how specific you need to be with html. If you want a new line, row, element, etc., it will not give you one until you specify the old one has ended and then create a new one. I also learned the importance of including text inside the html paragraph, hypertext, etc. Several times the link to my GitHub wasn't showing up because I forgot to include the word GitHub in the anchor, something that could be easily overlooked but key to what you want to do.

For html: This is a style element that you should always include at the top of html files.
<meta
  name="viewport"
  content=
    "width=device-width, initial-scale=1"
/>

simon-css: Working with the css provided for simon has taught me a little bit more about what css will give you. Some of these elements included things like how stating the flex arrangement determines if elements will be arranged horizontally or vertically, as well as experimenting with different sizings and positionings. One trait that I also noticed was then when assigning classes to html elements, it gives you the freedom to make up labels based on what you want certain things to do, which can be helpful when you want different structural elements having a similar style. This flexibility isn't always desirable, though, as it can make it frustrating to decide how to accomplish your design.

Notes: 2/24
One thing I noticed is creating html for a design is a lot easier than creating css from scratch. With html, you know what you want the structure to look like, and can make the basic parts pretty easily. With css, you could cycle through several different options before deciding on a design you like, and it takes even more time to try and implement it in a way that fits your vision.

simon-javascript: Having this experience of working with the javascript has helped me understand a little more about its uses. A few things I noticed were; how JavaScript uses some of the values first created in HTML to passs values for other HTML or JavaScript files, how in JavaScript files you have the capability to write additional HTML code in real time, and the importance of the id keyword in html. in a way, the id keyword is creating a sort of global variable that both the CSS and JavaScript can manipulate. 

Notes 3/6:
Use CNAME as an alias to point your DNS to another DNS

@import statement loads google fonts in CSS

JSON is not JavaScript; you need to use quotes

<javascript> is not valid html

JavaScript objects require a colon

simon-server: One thing I find cool about the servers is the concept of creating objects that get stored in the router, and subsequently saved on more than just the computer, but the entire internet. I'm also impressed by how functions can be created that directly interact with these objects. It basically allows the server to extend the code processing to the whole internet whenever you feel it needs to, and this long-range interaction is key to making most things work online.

simon-db: One thing I learned was the idea of creating an object id in databases. This will be really helpful when trying to use specific instances of objects, as the object id is an easy way to connect related objects, more specifically objects that belong to the same person, and makes it easy to single out an object if you need to modify it.

simon-login: One interesting thing I found with this part of the code is the use of the email related to the authtoken, not just for login, but to also fetch the scores for the player. In doing this, it allows you to utilize the authtoken to get the user specific data that only the user should be able to see, making it all the more valuable. It is an extremely powerful tool that will be necessary to get anything belonging to the user in the database.
  
simon-websocket: One thing I found interesting was the idea that the WebSocket is keeping track of multiple connections simultaneously. Whenever one connection needs to take an action, it can pull that specific one out of the array, and work with it there. This is useful in allowing all people connected to the server to be able to see the dialogue and interactions.
