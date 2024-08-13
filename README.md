# ToDoApp
A simple ToDo App created to share understanding/learning on how to use Angular, Dotnet, MySQL and Dotnet ef core and identity frameworks to support database storage and login functionalities.

# App in action
https://github.com/user-attachments/assets/1a312ced-b2d3-4008-b5f6-7029d68fcc9f

# Prerequisites for the project
* Follow [Prerequisites](https://learn.microsoft.com/en-us/dotnet/core/tutorials/with-visual-studio-code?pivots=dotnet-8-0#prerequisites) section to install dotnet related dependencies and VS Code
* Install node by [following](https://nodejs.org/en/download/package-manager) if needed. It is required by angular local development.
* Install angular if needed by running  ```npm install -g @angular/cli``` in a terminal
* Install Mysql from official [source](https://dev.mysql.com/downloads/mysql/) and ensure it is started. Ask ChatGPT or Google how to start it after installation


# Steps to access the app using localhost
1. Git clone through VS Code terminal ```https://github.com/ashish0309/DotnetToDoWebApp.git```
2. Open the downloaded repository folder in the VS Code. Repository name would be: ```DotnetToDoWebApp```
3. Install tool for database migration if necessary through VS Code terminal: ```dotnet tool install --global dotnet-ef```
4. Run in the same terminal: ```dotnet ef database update``` to migrate database schema changes from the project to Mysql database
5. In a new VS Code terminal navigate to Angular folder: ```cd ClientApp```
6. In the same terminal install angular dependencies by running: ```npm install```
7. Same terminal run:```ng serve``` to start node server to listen to ```http://localhost:4200/```
8. In another terminal, ensure you are in the root project folder and run: ```dotnet run``` to build and run dotnet project locally
9. Visit  ```http://localhost:4200/``` to use the app. Keep in mind that password for a new user signup has constraints where it would require some combination of number, special characters and should be at least 8 length.


# Help
* Please open issue/pull request if something is not working or drop an email 




