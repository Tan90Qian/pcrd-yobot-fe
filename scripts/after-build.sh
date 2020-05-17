fileCss=`find dist -name "app.*.css"`
cp $fileCss 'dist/css/app.css'

fileCss=`find dist -name "chunk-vendors.*.css"`
cp $fileCss 'dist/css/chunk-vendors.css'

file2=`find dist -name "app.*.js"`
cp $file2 'dist/js/app.js'

fileMain=`find dist -name "chunk-vendors.*.js"`
cp $fileMain 'dist/js/chunk-vendors.js'