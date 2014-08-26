# grunt-mandrill-template

> Publish email templates though mandrill as part of your build.

This is being hastily deployed for internal consumption. You probably shouldn't use this yet.

## Getting Started
This plugin requires Grunt

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-mandrill-template --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mandrill-template');
```

## Use case

We have a build pipeline that compiles jade and sass into inline-styled HTML pages for email msgs.  We then need to publish them

## mandrill task
_Run this task with the `grunt mandrilltemplate` command._

From https://mandrillapp.com/api/docs/templates.nodejs.html

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

#### key
Type: `String`

Your [Mandrill API key](https://mandrillapp.com/api/docs/)

#### from_email
Type: `String`

The 'from' address. Acceptable domains may be restricted by your mandrill account settings

#### from_name
Type: `String`

The 'from' display name.


#### subject
Type: `String`

The subject of your email.  Leave blank to load from the HTML <title> tag.

#### body
Type: `String`

If no files are specified in `src:`, the mandrill task will send a plaintext email
using `body` for the msg content.

#### text
Type: `String`

a default text part to be used when sending with this template

#### publish
Type: `Boolean`

set to false to add a draft template without publishing

#### labels
Type: `Array`

an optional array of up to 10 labels to use for filtering templates


## Usage

`src:` is one or more files to be used as an email body. A new email will be sent for each file.

```javascript
module.exports = function(grunt){

  grunt.initConfig({
    mandrilltemplate: {
      server: {
          src: ['output/*.html'],
          filter: 'isFile',
          options: {
              key: '',
              from_email: '',
              from_name: '',
              subject: '',
              text: '',
              publish: true,
              labels: ['autogen']
          }
      }
    })
  });

  grunt.loadNpmTasks('grunt-mandrill-template');
  });
```
