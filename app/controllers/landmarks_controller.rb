class LandmarksController < ApplicationController
  before_action :set_landmark, only: [:show, :update, :destroy]

  # GET /landmarks
  def index
    @landmarks = Landmark.all

    render json: @landmarks
  end

  # GET /landmarks/1
  def show
    render json: @landmark
  end

  # POST /landmarks
  def create
    @landmark = Landmark.new(landmark_params)

    if @landmark.save
      render json: @landmark, status: :created, location: @landmark
    else
      render json: @landmark.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /landmarks/1
  def update
    if @landmark.update(landmark_params)
      render json: @landmark
    else
      render json: @landmark.errors, status: :unprocessable_entity
    end
  end

  # DELETE /landmarks/1
  def destroy
    @landmark.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_landmark
      @landmark = Landmark.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def landmark_params
      params.require(:landmark).permit(:name, :description, :notify, :location, :color)
    end
end
