# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)
require 'csv'

CSV.foreach(File.join(Rails.root, "lakes.csv"), :headers => true, :converters => :numeric) do |lake|
  Lake.create(:name => lake["Name"], :loc => [lake["Lat"], lake["Lng"]], :state => lake["State"])
end
