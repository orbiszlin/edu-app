# EDU APP

The multi-platform application **EDU APP** is an interactive educational game that allows players (students) 
to compete for the largest number of game fields on a hexagonal game board. 
The game is no registration required, allowing for quick entry into the game. 
Players select squares and are tasked with answering the displayed questions as quickly as possible. 
Each correct answer allocates a player a box, and the player who owns the most boxes at the end of the time limit wins. 
Teachers or organizers can create questions at will, and the game is designed for 1 to N players. 
The app is designed as a fun way to review and practice topics already covered in any subject.

## Install

> Preparing your environment
>
> - (**Required**) Download and install [Node.js & npm](https://nodejs.org/en)
> - (**Required**) Installing the Ionic CLI `npm install -g @ionic/cli` - [Official Ionic documentation](https://ionicframework.com)
> - (_Recommended_) Installing Angular CLI `npm install -g @angular/cli` - [Official Angular Documentation](https://angular.dev)

1. Clone the repository
2. Install all repository packages via `npm i`
3. Start the server via `ionic serve` or `ng serve` or `npm run start`

## Contributing

- All pages will be stored in the [src/app/pages](src/app/pages) folder - always create via `ng g page pages/page-name`
- After creating the page, double check [app.routes.ts](src/app/app.routes.ts) that the correct path is set.
- In [app.component.ts](src/app/app.component.ts) add a new absolute path to the new page
- Make other changes in the page you created.
- Everything is suggested on iPad Pro 11 (in Google Chrome Dev Tools)
