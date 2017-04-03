class VehiclesController < ApplicationController
  before_action :authenticate_user!
  def index
    render json: Vehicle.order(:name)
  end

  def show
    render json: Vehicle.find(params[:id])
  end
end
