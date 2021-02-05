# Installation Instructions
## Step 1: Download and Install MAMP Pro
We use MAMP Pro to manage our local hosting for the website. MAMP Pro is also used to create local database password, which is used in the .env file for Craft 3
https://www.mamp.info/en/mamp-pro/

## Step 2: Use MAMP to set server ports
https://cl.ly/0K1Y2p0S2M0x
This button sets your ports for running local site

## Step 3: Set local database password
https://cl.ly/3k1f1k2Q3u06

Change root password to reflect in .env file

## Step 4: Install Composer
Use homebrew to install composer to manage PHP dependencies

### Run command in terminal to install homebrew
`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

### Run command in terminal to install composer
`brew install composer`

## Step 5: Install NPM and Node
We use NPM to manage our JavaScript packages
[npm](https://www.npmjs.com/get-npm)

## Step 6: Install Craft
Run `composer update` to install all the local dependencies you need. More information on craft installation can be found here:
[Installation Instructions | Craft 3 Documentation](https://docs.craftcms.com/v3/installation.html)

## Step 7: Merge Git repo
Once you have finished installing Craft and have it running locally. Merge the git repo from our GitHub repo into your local install. 

## Step 8: Upload Production Database
Using Sequel Pro import the latest production database to whatever name of the database you created during the craft install. Get the latest version of the Database from Alex.
[Sequel Pro](https://www.sequelpro.com/)

https://cl.ly/2d1k3C3B282y
https://cl.ly/440n0B0X2V1r


## FYI: Setting up remotes
You can find your GIT_URL here -> https://dashboard.fortrabbit.com/apps/copper-staging?new-craft3
Your REMOTE_NAME can be anything you want it to be 
git remote add REMOTE_NAME GIT_URL

Push to stage: 
git push REMOTE_NAME stage:master