# ABYSS
## Automated Application development

<h3>What is ABYSS?</h3>
<h5>Long story short, it's a common workflow powered by Gulp with a few goodies ready for you to start developing!</h5>
<p>When looking where to start a project, it's tempting to grab a tempting starter template of some kind. These starter packs have things that sound nice, but you always end up having to rip things out or work around someone else's workflow using <strong>ALL</strong> their tools. <strong>ABYSS</strong> is a different approach. Any proffesional development involves a Dev to Prod workflow, and ABYSS tries to replicate that. All work is done in the src folder located in the root of the directory structure. While you work, changes are pushed to dev folder, also located in the project root folder. Changes to JS, CSS, and HTML are all instantly viewable in the browser via the dev folder. This seperates your work environments nicely and lets you use the src folder to really play. SASS comes ready to go, so feel free to use it or just write plain CSS. Instead of relying on Bootstrap or Foundation for responsive design, SUZY is included and ready to go. This gives you the ability to design <strong>YOUR</strong> framework. Any extra vendor scripts can be added to your src index.html and will auto update into one single vendor file in the dev folder's index.html. All the work you do in src is pushed to dev. It's the dev folder that the browser is showing. The final step is pushing to prod. This will build out your dev folder with concat/uglified CSS/JS to a seperate prod file also located in the root directory. Fonts and images are optimized and carried along the way. The option to deploy your project to an actual webserver is also available via Github pages. I've got other things I'd like to add in. This is a good starting point.</p>
<br>
<h4>What's Included:</h4>
<ul>
<li>
  SASS
</li>
<li>
  SUZY
</li>
<li>
  BOWER
</li>
<li>
  BROWSER SYNC
</li>
<li>
  DEPLOY FINAL BUILD TO GH-PAGES
</li>
<li>
  IMAGE OPTIMIZATION
</li>
<li>
  AUTO CREATE CSS AND SCRIPTS SOURCES ON INDEX.HTML
</li>
<li>
  CONSOLE LIVE UPDATES WITH FILE SIZE CHANGES
</li>
<li>
  BUILT IN COMMON WORK FLOW
</li>
</ul>
<br>
<h4>Instructions:</h4>
<ol>
<li>
  Download this project.
</li>
<li>
  cd into the folder.
</li>
<li>
  Run npm install.
</li>
<li>
  Run gulp.
</li>
</ol>
<p>That's it. You're good to go.</p>
<br>
<h4>CLI Commands</h4>
<ul>
<li>
  gulp - This is the default gulp command. Builds a dev folder from src, copies fonts from src to dev, optimizes images from src to dev, opens web browser serving all assets from dev folder. All changes to CSS,JS,HTML are live.
</li>
<li>
  gulp bsDev - Runs Browser Sync from dev on port 8081.
</li>
<li>
  gulp bsProd - Runs Browser Sync from prod on port 8088.
</li>
<li>
  gulp styles - Compiles all SASS in src to CSS in dev showing file size changes in console. Alternatively, just write in plain CSS in src.
</li>
<li>
  gulp vscripts - Takes all vendor (3rd party) scripts, and puts them in one nice clean file. This new file is auto changed in the index.html within the dev folder for you. Also outputs file size changes to console.
</li>
<li>
  gulp scripts - Does the same as vscripts, except for your own custom JS files.
</li>
<li>
  gulp html - Builds HTML files to dev folder and auto fixes CSS and JS vendor/custom scripts paths.
</li>
<li>
  gulp images - Optimizes all image formats, even svg. Outputs file size changes to console and places new files in dev.
</li>
<li>
  gulp fonts - Copies all fonts from src to dev.
</li>
<li>
  gulp cleanDev - Completely deletes dev folder. The dev folder will be regenerated automatically for you by running any of the above scripts.
</li>
<li>
  gulp cleanProd - Same as cleanDev, except for the prod folder.
</li>
<li>
  gulp watch - Watches for changes in all HTML, JS, and CSS. On save, auto updates the dev folder and instantly refreshes the browser for you.
</li>
<li>
  gulp deploy - Builds a Github page for your project. You'll have to edit the repository field in the package.JSON and the homepage field to your own repo and gh-page.
</li>
</ul>
<br>
<h2>TODO</h2>
<li>
  Replicate build logic from dev to prod.
</li>
<li>
  Get live reload to working when images and fonts are added or deleted from src.
</li>
<li>
  Clean up gulp file.
</li>
<li>
  Clean up package.JSON
</li>
<li>
  Add ES6 support via Babel.
</li>
<li>
  Get minification and concat from dev to prod working.
</li>
<li>
  Setup base SUZY defaults.
</li>
<li>
  Make AngularJS version of ABYSS.
</li>
<li>
  Make ReactJS version of ABYSS.
</li>
<li>
  Add in CI/Testing between src => dev => prod on a seperate port running a Node based CI.
</li>
<li>
  Keep refining this project to be as minimal as possible in bloat, but rich with features.
</li>
