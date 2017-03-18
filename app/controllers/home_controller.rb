class HomeController < ApplicationController
  def show
    render file: Rails.public_path.join('index.html'), layout: false
  end
end
