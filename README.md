# Important note
## problem 1, can't use ai model on serve.
We have problem about upload .h5 model to use in node js, we try to use more method (use tensorflow/tfjs, pytouch, etc.), but we can't convert midel weight from .h5 model. 
So we use fix data that have done calculated to show in website to demonstate using.

## problem 2, serve crash from database connection.
we have vercel serve crash problem, when connect node js with mongoDB, It can run on personal serve correctly, but when we try to use Vercel, serve is crashed all the time.
So we dowload data from DB to json file and upload it on node js for temporary.

## problem 3, serve crash from api connection.
we have vercel serve crash problem, when i use chat api from upstage, I try to fix so long,  ut it not work. but It also can run on personal serve correctly,
So we use the personal serve to demonstate in video demo.


# The personal secretary

## Overview
Provide a brief description of your project. Explain what it does, its purpose, and the problems it solves.

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Installation
### Prerequisites
List any prerequisites needed to run the project. For example:
- Node.js
- npm
- Python

### Steps
Provide step-by-step instructions to set up the project locally. For example:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
