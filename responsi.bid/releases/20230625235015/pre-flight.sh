#!/bin/bash
#
#This script runs after after deployment

#if we have a shared dir then symlink needed files
if [ -d ./shared ]
then
echo ">>>Linking Shared Files"

cp ./shared/env.js ./env.js

fi

