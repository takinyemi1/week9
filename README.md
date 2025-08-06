# Web Development Final Project - **Critic Eats**

Submitted by: Temidayo Akinyemi

This web app allows users to post about their favorite foods, either giving a simple description or a critique about said food. Users can also give a rating of 1-5 for the food that can
be displayed to other users.

Time spent: 13 hours in total

## Required Features

The following **required** functionality is completed:


- [x] **Web app includes a create form that allows the user to create posts**
  - Form requires users to add a post title
  - Forms should have the *option* for users to add: 
    - additional textual content
    - an image added as an external image URL
- [x] **Web app includes a home feed displaying previously created posts**
  - Web app must include home feed displaying previously created posts
  - By default, each post on the posts feed should show only the post's:
    - creation time
    - title 
    - upvotes count
  - Clicking on a post should direct the user to a new page for the selected post
- [x] **Users can view posts in different ways**
  - Users can sort posts by either:
    -  creation time
    -  upvotes count
  - Users can search for posts by title
- [x] **Users can interact with each post in different ways**
  - The app includes a separate post page for each created post when clicked, where any additional information is shown, including:
    - content
    - image
    - comments
  - Users can leave comments underneath a post on the post page
  - Each post includes an upvote button on the post page. 
    - Each click increases the post's upvotes count by one
    - Users can upvote any post any number of times

- [x] **A post that a user previously created can be edited or deleted from its post pages**
  - After a user creates a new post, they can go back and edit the post
  - A previously created post can be deleted from its post page

The following **additional** features are implemented:

- [x] Users can log in/sign up using Supabase's authentication feature.

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXgzZWZqbHE2enV3cmNkdGg5NXNndm9zamhoOGJmYXE1OGJ6bXR0dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/q3eCklrUxHqF23Mnuj/giphy.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with LICEcap.
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app.
- I had the most trouble implementing the login/sign up feature for the app (mainly because I didn't realize that the user had to verify their email), when I tried to test
it with a fake email.

## License

    Copyright [2025] Temidayo Akinyemi

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
