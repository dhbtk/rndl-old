class HomeController < ApplicationController
  skip_before_action :authenticate_user

  def show
    render file: Rails.public_path.join('index.html'), layout: false
  end
end
