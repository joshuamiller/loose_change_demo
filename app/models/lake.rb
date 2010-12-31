class Lake < LooseChange::Base

  use_database "lakes"
  
  property :name
  property :state
  geo_point :loc

end
