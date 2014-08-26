var mandrill = require('mandrill-api'),
    _        = require('lodash');
    path     = require('path');
    cheerio  = require('cheerio');

module.exports = function(grunt){
  grunt.registerMultiTask('mandrilltemplate','Add email template to mandrill', function(){
    var done = this.async();
    var options = _.pick(this.data.options,['template_name', 'from_email', 'from_name', 'subject', 'code', 'text', 'publish', 'labels']);
    // Setup node-mandrill with the api
    mandrill_client = new mandrill.Mandrill(this.data.options.key);
    var to = [];

    if(this.filesSrc.length > 0){
      _.each(this.filesSrc,function(filepath){
        if(!options.template_name){
          basename = path.basename(filepath);
          extension = path.extname(filepath);
          template_name = basename.substr(0, basename.length - extension.length);
          //console.log(template_name);
        } else {
          template_name = options.template_name;
        }
        if(!options.code){
          code = grunt.file.read(filepath);
        } else {
          code = options.code;
        }
        if(!options.subject){
          //load subject line from <title> tag
          $ = cheerio.load(code);
          subject = $('title').text();
          //console.log(subject);
        } else {
          subject = options.subject;
        }
        mandrill_client.templates.add({"name": template_name, "from_email": options.from_email, "from_name": options.from_name, "subject": subject, "code": code, "text": options.text, "publish": options.publish, "labels": options.labels}, function(result) {
            grunt.log.writeln(result);
            console.log(result);
        }, function(e) {
            // Mandrill returns the error as an object with name and message keys
            if (e.message.indexOf("already exists")) {
               //expected
            } else {
               grunt.log.writeln('A mandrill error occurred: ' + e.name + ' - ' + e.message);
               console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
            }
        });
        //had some concurrecny problem, so always update
        mandrill_client.templates.update({"name": template_name, "from_email": options.from_email, "from_name": options.from_name, "subject": subject, "code": code, "text": options.text, "publish": options.publish, "labels": options.labels}, function(result) {
           grunt.log.writeln(result);
           console.log(result);
        }, function(e) {
           // Mandrill returns the error as an object with name and message keys
           grunt.log.writeln('A mandrill error occurred: ' + e.name + ' - ' + e.message);
           console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        });
      });
    }
  });
}
