class UploadTorqueEntry
  include Interactor::Organizer

  organize InsertEntry, SendRealTimeVehiclePosition
end
