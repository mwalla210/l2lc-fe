#! /usr/local/bin/bash

# Construct archive
npm run build
zip -r archive * -x \*coverage\* \*tests\* \*node_modules\* \*custom\ docdash\* \*doc\* \*build\* \*plugins\*
rm bundle.js
# ssh casuman07@107.180.27.180 "cd public_html/cloud/; find * -not -name 'cgi-bin' -delete; exit"
# rm archive.zip
