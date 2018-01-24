#! /usr/local/bin/bash

# Construct archive
npm run build
zip -r archive * -x exampleproj/**\* node_modules/**\* custom\ docdash/**\* docs/**\*
rm bundle.js
# ssh casuman07@107.180.27.180 "cd public_html/cloud/; find * -not -name 'cgi-bin' -delete; exit"
# rm archive.zip
