#!/bin/bash
#
#This script runs after after deployment

#source the nvm.sh script and make sure we are using the currently installed node
. ~/.nvm/nvm.sh
nvm use 7

#save current dir it will be our release dir
RELEASE=`pwd`

#step up two directories and look for our shared directory
cd ../../

#save this location its our base dir, where the shared folder should live
BASE_DIR=`pwd`

#move back into our Release dir
cd $RELEASE

#if we have a shared dir then symlink needed files
if [ -d $BASE_DIR/shared ]
then
echo ">>>Linking Shared Files"
#we need to remove the default environment file first then symlink it
rm $RELEASE/env.js

ln -s $BASE_DIR/shared/env.js $RELEASE/env.js

fi

cd $RELEASE

yarn
#/usr/bin/yarn run deploy
