class LakesController < ApplicationController
  
  def index
    if params[:bbox].present?
      bbox = params[:bbox].split(',').map(&:to_f)
      @lakes = Lake.by_bounding_box(:loc, bbox[0], bbox[1], bbox[2], bbox[3])
    end
    
    respond_to do |format|
      format.json { render :json => @lakes }
      format.html
    end
  end
  
end
