# Hello Green
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


Hello Green is a prototype reporting and project management application.

[Example of hello green in action](https://fsf-hello-green.herokuapp.com/)


## Table of Contents
1. [Description](#description)
2. [Dependencies](#dependencies)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Testing](#testing)
7. [Contact](#questions)

## Description

Hello Green allows managers of report-based projects (i.e. written reports) to manage the contributions of team members and to arrange those contributions around a reporting structure that simultaneously defines their contributions and provides for a reporting framework that is both comprehensive (full report) and compartmentalised (project briefs).

The current presentation of Hello Green focuses on the latter: the creation, editing, and viewing of project briefs: the ‘parts’ that make up the ‘whole’.
Hello Green is an initial prototype of an online reporting framework. The aim is to provide basic functionality for the submission of ‘project briefs’, editing of these, and viewing of the users that create them. 
Whilst similar to a blog-post website, the Hello Green application constraints users to be invited only, and to provide an elementary capability for integration into a larger project reporting framework in the future. 
Hello Green was inspired by difficulties in integrating reporting needs within large teams, and to allow these reports to be well-structured whilst providing for meeting multiple objectives with single activities (i.e. similar to the DRY principle in coding)


Our User story is as follows:

```
As a viewer
I want to view basic descriptions of project briefs
SO that I select briefs to read more about
I want to view the authors of project briefs
SO that I can direct correspondence toward them

As an author
I want to be able to login
SO that I can view my dashboard
I want to view my current posts 
SO that I can choose which of those to edit
I want to view my bio
SO that I can update details!
```


## Dependencies

 * "bcryptjs": "2.4.3",
 * "connect-session-sequelize": "7.1.1",
 * "dotenv": "^10.0.0",
 * "express": "4.17.1",
 * "express-handlebars": "5.3.2",
 * "express-session": "1.17.2",
 * "mysql2": "^2.2.5",
 * "sequelize": "6.6.2"


## Installation

1. git clone the repo.
2. rename  `.env.example` to `.env`
3. setup `.env` with your DB connection details. 
4. setup a database
5. `npm run seed`


## Usage

`npm start` will run the applications

`npm run watch` to run the application in watch mode


## Testing

Testing is done manually.


## Questions

Created by 

* [daniel-gregg](spaniel.boone@gmail.com)

* [macoovacany](macoovacany@hotmail.com)

