class RefuelingsController < ApplicationController
  before_action :set_refueling, only: [:show, :update, :destroy]
  before_action :authenticate_user

  # GET /refuelings
  def index
    @refuelings = Refueling.by_vehicle_id(params[:vehicle_id], params[:page])

    render json: @refuelings
  end

  # GET /refuelings/1
  def show
    render json: @refueling
  end

  # POST /refuelings
  def create
    @refueling = Refueling.new(refueling_params)

    if @refueling.save
      render json: @refueling, status: :created, location: @refueling
    else
      render json: @refueling.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /refuelings/1
  def update
    if @refueling.update(refueling_params)
      render json: @refueling
    else
      render json: @refueling.errors, status: :unprocessable_entity
    end
  end

  # DELETE /refuelings/1
  def destroy
    @refueling.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_refueling
      @refueling = Refueling.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def refueling_params
      params.require(:refueling).permit(:vehicle_id, :date, :liter_price, :liters, :total_cost, :odometer)
    end
end
