#! /usr/local/bin/bash

# Construct archive
npm run doc
cd docs/Line2LineCloud/0.0.1
zip -r docarchive *
cd ../../../
mv docs/Line2LineCloud/0.0.1/docarchive.zip  docarchive.zip
# ssh casuman07@107.180.27.180 "cd public_html/cloud/; find * -not -name 'cgi-bin' -delete; exit"
# rm archive.zip
