class EntriesController < ApplicationController
  def create
    result = UploadTorqueEntry.(params: params)
    render html: 'OK!' if result.success?
  end
end
