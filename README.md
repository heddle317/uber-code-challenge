uber-code-challenge
===================

The code in this repository was written for an Uber Code Challenge:

https://github.com/uber/coding-challenge-tools

**A few notes about the code in this repo.
I have a set of initial commits for setting up a Django project. This includes a few utils files, a CustomModel object, and
some rendering shortcuts. You can ignore the code in the following directories.

/app/utils/enum.py
/app/models/utils.py


Additionally, the code challenge said to make something that you would be proud to ship in production. However, it recommended
that you only take 3-4 hours to do the code challenge. Other than bug fixes and testing, there is very little that I am
comfortable deploying to production after 4 hours of work. In other words, this mini application is NOT production ready.
Here are some things missing from my application to make it ready for production:

Tests
Checking the lat/lng search with Socrata's API
There is no UI feedback if the API call to Socrata is slow
There is definitely not enough error checking and handling in this app
There could be no bike parking in the range that I am searching.
The javascript is a bit messy.
It does not meet the requirement of giving directions to the nearest bike parking, but I opted out of that since I don't 
have anymore time.

