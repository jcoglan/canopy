jake_helper :license do
  "/**\n" +
  File.read('LICENSE').strip.split(/\n/).map { |line|
    " * " + line
  } * "\n" +
  "\n **/"
end

jake_hook :build_complete do
  FileUtils.cp 'node_modules/jsclass/min/core.js', 'bin/js.class.js'
end
