# Color Palettes Generator | RAINBOW'S B.F.F.
#### Created by Macit Ege ERCAN
 - [LINK TO **FRONT END REPO**](https://github.com/macitege/color-sets-client)
 - [LINK TO **DEPLOYED WEBSITE**](https://macitege.github.io/color-sets-client)
 - [LINK TO **BACK END / API REPO**](https://github.com/macitege/color-sets-api)
 - [LINK TO **DEPLOYED API**](https://color-sets-api.herokuapp.com)

## Features
- This is a full-stack web application project with API support for authentication,
and storage of desired color palettes generated.
- Rainbow's B.F.F. creates randomy generated color palettes consist of 5 colors.
- User can generate colors either using space bar or generate button.
- Each color shows their hex codes. Also, rgb codes can be reached at editor modal
for signed in user.
- Not signed in users can use Rainbow's B.F.F., however, when signed in, generated
colors can be saved in user's palette library. User can delete or update their saved
palettes.
- Editor modal provides range inputs for each color's Red, Green and Blue values,
user can edit the colors by the inputs and updated the color. Once color is updated,
it can be reached in users palettes side bar.

### Technologies Used
- For the front end of this website, `HTML5`, `SASS`, `jQuery`, `Handlebars`,and `Bootstrap` have been used.
- For color generator `JavaScript` has been used.

- For authentication and user features (saving and editing the colors), an API
has been built on Heroku using `Ruby on Rails`. This API stores user information
and color codes (hex, rgba) for saved palettes.

### Story of Creation
For this project, I inspired from a amazing color generator website named `coolors.co`.
Even though it seemed hard to built as a junior developer, when I started to planning,
it revaled its secrets.
- First thing I have done is to find an algorithm to generate a HEX code using
JavaScript.
- Second thing was to create an API to store color palettes that users will save,
and of course to store user information.
- Then I have done a brief research on how to create better colors. This was a
deep debate, there is always a better..
- Since this is a full-stack project and a very visual one, mostly, I have been
building front end and the code behind the scenes simultaneously.
- The hardest part of the project was probably creating the editor where I had to
convert and transfer color codes between places, and also keep the color palette
generated on the main page stable and available to save if it is not saved before
editing operations. That confused me a lot and I had to stop coding and start drawing
a scheme of the actions happening while editing and updating a color palette.
[The photo of what I draw while this process](https://i.imgur.com/BCXxGDJ.jpg)
- The fun part of the project was its entirety. And planning it.
- It took 4 days to build.



### Unsolved but should be Solved
- Editing should be more meaningful to somebody who doesn't know about RGB.
- User should be able to undo or redo between generated but not saved colors in
the main page.
- Freezing/locking some colors and generating the rest should be available.
- User should be able to extract a file containing the information about the
chosen palette from the library.

### Initial Project
#### Wire Frames:
- [FRONT END WIRE FRAME](https://i.imgur.com/XE8QGBP.jpg)
- [BACK END ENTITY RELATIONSHIP DIAGRAM](https://i.imgur.com/EKMieWw.jpg)
#### User Stories:
- As a user I want to genereate color schemes consist of 5 random colors.
- As a user I want to see 5 colors next to each other.
- As a user I want to see hex color codes of each color generated.
- As a user I want to create an account and save my color palettes.
- As a user I want to be able to change my accounts password.
- As a user I want to be able to use the generator, even if I am not signed in.
- As a user I want to be able to display my color palettes when I log in.
- As a user I want to be able to delete color palettes that are in my library.
- As a user I want to be able to change and update color palettes that are in my
library.
