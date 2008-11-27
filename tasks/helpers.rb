def exit_msg msg, code=1 
  puts msg; exit code 
end

# exit on non-zero error code
def run! *command
  res = run(*command)
  if (s = $?.exitstatus) != 0
    exit_msg(res, s)
  else
    res
  end
end

# this is like backticks, but the command will be shell escaped
def run *command
  res = run_shell_escaped *command
  return <<-EOS if $?.exitstatus != 0

exit code: #{$?.exitstatus}
command result:
#{res}

failure on command:
#{command.join(' ')}
EOS

  res
end

def run_shell_escaped *command
  command = command.flatten.map do |str|
    str =~/^'.*'$/ ? str : str.split(/\s+/)
  end.flatten
  res = IO.popen('-') {|io| io ? io.read : exec(command.shift, *command)}
end

def out *command
  (puts (run! *command))
end

def cd_tmp
  Dir.mkdir 'tmp' unless File.directory? 'tmp'
  Dir.chdir('tmp') do |dir|
    yield dir
  end
  rm_rf 'tmp'
end

class IO
  def self.write( file, str )
    self.open( file, 'w' ) { |fh| fh.print str }
  end
  def self.read_write( file, write_file=file )
    self.write(write_file, (yield( self.read( file ))))
  end
end

Dir.glob('tasks/*.rake').sort.each {|fn| import fn}
