require 'cgi'
require 'statistics'
require 'bumpspark'

def collect (filename)
  stats = Array.new(18) do |index|
    s = Statistics::Window.new(nil)
    s.id = index + 1
    s
  end
  File.foreach(filename) do |line|
    md = line.match(/^\d{4}-\d{2}-\d{2}\s*:.*=\s*(.*)/)
    next unless md
    scores = md[1].split
    next unless scores.size == 18
    scores.each_index do |i|
      m = scores[i].match(/(\d+)/)
      stats[i].add(m[1].to_i) if m
    end
  end
  stats
end

class Statistics::Window
  attr_accessor :id

  def frequency_distribution (min, max)
    bins = Hash.new{0}
    data.each do |x|
      bins[x] += 1
    end
    (min..max).map{|i| bins[i]}
  end
end

class Array
  def normalize
    max = inject(0){|m, i| i > m ? i : m}
    map{|v| ((v/max.to_f)*100).to_i}
  end

  def within (center, radius)
    count = inject(0){|r, v| (center - v).abs < radius ? r+1 : r}
    count.to_f / size.to_f
  end
end

def mysparkline (vs)
  'data:image/bmp,' + CGI::escape(bumpspark(vs.normalize))
end
