class VehiclesController < ApplicationController
  before_action :authenticate_user!
  def index
    @vehicles = Vehicle.order(:name)
  end

  def show
    @vehicle = Vehicle.find(params[:id])
  end
end
